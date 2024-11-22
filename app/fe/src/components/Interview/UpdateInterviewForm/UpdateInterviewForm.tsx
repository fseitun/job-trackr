import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { client } from '../../../api/client.ts';
import { useNavigate, useParams } from 'react-router';
import { CreateInterviewDto, UpdateInterviewDto } from '../../../types.ts';
import { InterviewFormFields } from '../InterviewFormFields/InterviewFormFields';
import { useHandleDateChange } from '../../hooks/useHandleDateChange.ts';
import {
    ButtonGroup,
    CancelButton,
    Container,
    ErrorMessage,
    Form,
    Header,
    LoadingIndicator,
    SaveButton,
} from './UpdateInterviewForm.styles';

export function UpdateInterviewForm() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { formData, setFormData, handleDateChange } =
        useHandleDateChange<UpdateInterviewDto>({
            jobId: '',
            interviewerName: '',
            interviewerRole: '',
            interviewDate: new Date().toISOString().split('T')[0],
            notes: '',
        });

    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (id) {
            client
                .get<CreateInterviewDto>(`/interviews/${id}`)
                .then((interview) => {
                    const formattedDate =
                        interview.interviewDate ?
                            new Date(interview.interviewDate)
                                .toISOString()
                                .split('T')[0]
                        :   '';
                    setFormData({
                        jobId: interview.jobId,
                        interviewerName: interview.interviewerName,
                        interviewerRole: interview.interviewerRole,
                        interviewDate: formattedDate,
                        notes: interview.notes ?? '',
                    });
                })
                .catch((err) => {
                    console.error('Error fetching interview details:', err);
                    setError('Failed to load interview details.');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [id, setFormData]);

    function handleChange(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        try {
            if (id) {
                await client.patch<UpdateInterviewDto>(
                    `/interviews/${id}`,
                    formData,
                );
                navigate(`/job/${formData.jobId}`);
            } else {
                setError('Invalid interview ID.');
            }
        } catch (err) {
            console.error('Error submitting interview form:', err);
            setError('Failed to submit the form.');
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isLoading) {
        return (
            <LoadingIndicator>Loading interview details...</LoadingIndicator>
        );
    }

    return (
        <Container>
            <Header>Edit Interview</Header>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form onSubmit={handleSubmit}>
                <InterviewFormFields
                    formData={formData}
                    handleChange={handleChange}
                    handleDateChange={handleDateChange}
                />
                <ButtonGroup>
                    <SaveButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Updating...' : 'Update Interview'}
                    </SaveButton>
                    <CancelButton
                        type="button"
                        onClick={() => navigate(-1)}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </CancelButton>
                </ButtonGroup>
            </Form>
        </Container>
    );
}
