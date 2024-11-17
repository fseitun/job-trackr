import { FormEvent, ChangeEvent, useState } from 'react';
import { client } from '../../api/client';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateInterviewDto } from '../../types';
import { InterviewFormFields } from './InterviewFormFields';
import { useHandleDateChange } from '../hooks/useHandleDateChange';
import {
    Container,
    Header,
    ErrorMessage,
    Form,
    ButtonGroup,
    SaveButton,
    CancelButton,
} from './CreateInterviewForm.styles.ts';

export function CreateInterviewForm() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { formData, setFormData, handleDateChange } =
        useHandleDateChange<CreateInterviewDto>({
            jobId: id ?? '',
            interviewerName: '',
            interviewerRole: '',
            interviewDate: new Date().toISOString().split('T')[0],
            notes: '',
        });

    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
                await client.post<CreateInterviewDto>('/interviews', formData);
                navigate(`/job/${id}`);
            } else {
                throw new Error('Invalid job ID.');
            }
        } catch (err) {
            console.error('Error submitting interview form:', err);
            setError('Failed to submit the form.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Container>
            <Header>Add Interview</Header>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form onSubmit={handleSubmit}>
                <InterviewFormFields
                    formData={formData}
                    handleChange={handleChange}
                    handleDateChange={handleDateChange}
                />
                <ButtonGroup>
                    <SaveButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Adding...' : 'Add Interview'}
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
