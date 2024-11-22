import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { client } from '../../../api/client';
import { Job } from '../../../types';
import { InterviewList } from '../../Interview/InterviewList/InterviewList';
import {
    AddButton,
    BackButton,
    ButtonLink,
    Container,
    EditButton,
    ErrorMessage,
    Loading,
    SubHeader,
} from './JobDetail.styles';

export function JobDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        async function fetchJob() {
            try {
                const data = await client.get<Job>(`/job/${id}`);
                const interviews = data.interviews;
                const sortedInterviews = [...interviews].sort(
                    (a, b) =>
                        new Date(b.interviewDate).getTime() -
                        new Date(a.interviewDate).getTime(),
                );
                setJob({ ...data, interviews: sortedInterviews });
            } catch (err) {
                console.error('Error fetching job application details:', err);
                setError('Failed to load job application details.');
            } finally {
                setLoading(false);
            }
        }

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
            <BackButton onClick={() => navigate('/job')}>Back</BackButton>
            <SubHeader>Interviews</SubHeader>
            <AddButton>
                <ButtonLink to={`/job/${id}/add-interview`}>
                    Add Interview
                </ButtonLink>
            </AddButton>
            <EditButton>
                <ButtonLink to={`/job/${id}/edit`}>
                    Edit Job Application
                </ButtonLink>
            </EditButton>
            <InterviewList interviews={job.interviews} jobId={job.id} />
        </Container>
    );
}
