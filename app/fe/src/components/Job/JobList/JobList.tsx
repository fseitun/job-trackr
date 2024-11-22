import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Job } from '../../../types';
import { client } from '../../../api/client';
import { formatDate } from '../../../../../utils';
import {
    AddButtonWrapper,
    Container,
    Error,
    Header,
    Loading,
    Row,
    Table,
    Td,
    Th,
    ViewButton,
} from './JobList.styles';
import { Button } from '../../../styles/Common.styles';

export function JobList() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        async function fetchJobs() {
            try {
                const jobs = await client.fetchAll<Job>('/job');
                setJobs(jobs);
            } catch (err) {
                console.error('Error fetching jobs:', err);
                setError('Failed to load jobs.');
            } finally {
                setLoading(false);
            }
        }

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
            new Date(a.lastInteraction).getTime(),
    );
    return (
        <Container>
            <Header>Job Applications</Header>
            <AddButtonWrapper to="/job/add">
                <Button>Add Job Application</Button>
            </AddButtonWrapper>
            {sortedJobs.length === 0 ?
                <p>No job applications found.</p>
            :   <Table>
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
                                <Td>
                                    {job.lastInteraction ?
                                        formatDate(job.lastInteraction)
                                    :   'N/A'}
                                </Td>
                                <Td>
                                    <Link to={`/job/${job.id}`}>
                                        <ViewButton>View Details</ViewButton>
                                    </Link>
                                </Td>
                            </Row>
                        ))}
                    </tbody>
                </Table>
            }
        </Container>
    );
}
