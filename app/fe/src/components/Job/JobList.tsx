import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Job } from "../../types";
import { client } from "../../api/client";
import { formatDate } from "../../../../utils";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const AddButtonWrapper = styled(Link)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  background-color: #1a73e8;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1669c1;
  }
`;

const ViewButton = styled(Button)`
  background-color: #34a853;

  &:hover {
    background-color: #2c8e43;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Row = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.75rem;
  background-color: #f2f2f2;
`;

const Td = styled.td`
  padding: 0.75rem;
`;

const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
`;

const Error = styled.div`
  text-align: center;
  padding: 2rem;
  color: red;
  font-size: 1.2rem;
`;

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs = await client.fetchAll<Job>("/job");
        setJobs(jobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <Loading>Loading jobs...</Loading>;
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  const sortedJobs = [...jobs].sort(
    (a, b) =>
      new Date(b.lastInteraction).getTime() -
      new Date(a.lastInteraction).getTime()
  );
  return (
    <Container>
      <Header>Job Applications</Header>
      <AddButtonWrapper to="/job/add">
        <Button>Add Job Application</Button>
      </AddButtonWrapper>
      {sortedJobs.length === 0 ? (
        <p>No job applications found.</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Hiring Company</Th>
              <Th>Recruiting Company</Th>
              <Th>Position</Th>
              <Th>Last Interaction</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {sortedJobs.map((job) => (
              <Row key={job.id}>
                <Td>{job.hiringCompany}</Td>
                <Td>{job.recruitingCompany}</Td>
                <Td>{job.position}</Td>
                <Td>{job.lastInteraction ? formatDate(job.lastInteraction) : "N/A"}</Td>
                <Td>
                  <Link to={`/job/${job.id}`}>
                    <ViewButton>View Details</ViewButton>
                  </Link>
                </Td>
              </Row>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
