import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { client } from '../../../api/client';
import { Job } from '../../../types';
import {
    Container,
    Header,
    Form,
    ButtonGroup,
    SaveButton,
    CancelButton,
    ErrorMessage,
    LoadingIndicator,
} from './styles';

export function UpdateJobForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        async function fetchJob() {
            try {
                const data = await client.get<Job>(`/job/${id}`);
                setJob(data);
            } catch (err) {
                console.error('Error fetching job details:', err);
                setError('Failed to load job details.');
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchJob();
        }
    }, [id]);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        // Handle form submission
    }

    if (loading) {
        return <LoadingIndicator>Loading...</LoadingIndicator>;
    }

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    if (!job) {
        return <ErrorMessage>Job not found.</ErrorMessage>;
    }

    return (
        <Container>
            <Header>Edit Job Application</Header>
            <Form onSubmit={handleSubmit}>
                {/* Form Fields */}
                <ButtonGroup>
                    <SaveButton type="submit">Save</SaveButton>
                    <CancelButton onClick={() => navigate('/job')}>
                        Cancel
                    </CancelButton>
                </ButtonGroup>
            </Form>
        </Container>
    );
}
