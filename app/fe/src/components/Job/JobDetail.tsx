import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../../api/client";
import { Job } from "../../types";
import { InterviewList } from "../Interview/InterviewList";
import {
  Container,
  BackButton,
  SubHeader,
  AddButtonWrapper,
  EditButtonWrapper,
  EditBtn,
  Loading,
  ErrorMessage,
} from "./JobDetail.styles";
import { Button, StyledLink } from "../../styles/common.styles";

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await client.get<Job>(`/job/${id}`);
        const interviews = data.interviews;
        const sortedInterviews = [...interviews].sort(
          (a, b) =>
            new Date(b.interviewDate).getTime() -
            new Date(a.interviewDate).getTime()
        );
        setJob({ ...data, interviews: sortedInterviews });
      } catch (err) {
        console.error("Error fetching job application details:", err);
        setError("Failed to load job application details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  if (loading) {
    return <Loading>Loading job...</Loading>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!job) {
    return <ErrorMessage>Job not found.</ErrorMessage>;
  }

  return (
    <Container>
      <BackButton onClick={() => navigate("/job")}>Back</BackButton>
      <SubHeader>Interviews</SubHeader>
      <AddButtonWrapper>
        <StyledLink to={`/job/${id}/add-interview`}>
          <Button>Add Interview</Button>
        </StyledLink>
      </AddButtonWrapper>
      <EditButtonWrapper>
        <StyledLink to={`/job/${id}/edit`}>
          <EditBtn>Edit Job Application</EditBtn>
        </StyledLink>
      </EditButtonWrapper>
      <InterviewList interviews={job.interviews} jobId={job.id} />
    </Container>
  );
}
