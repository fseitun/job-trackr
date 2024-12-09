import { ChangeEvent, FormEvent, useState } from 'react';
import { client } from '@api/client.ts';
import { useNavigate, useParams } from 'react-router';
import { CreateInterviewDto } from '@types.ts';
import { InterviewFormFields } from '../InterviewFormFields/InterviewFormFields';
import { useHandleDateChange } from '@hooks/useHandleDateChange';
import {
    ButtonGroup,
    CancelButton,
    Container,
    ErrorMessage,
    Form,
    Header,
    SaveButton,
} from './CreateInterviewForm.styles';
import route from '@route';

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
                navigate(route.job);
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
