import { ChangeEvent, FormEvent, useState } from 'react';
import { client } from '@api/client';
import { useNavigate } from 'react-router';
import { CreateJobDto } from '@types';
import { JobFormFields } from '../JobFormFields/JobFormFields';
import {
    ButtonGroup,
    CancelButton,
    Container,
    Error,
    Form,
    Header,
    SaveButton,
} from './CreateJobForm.styles';
import route from '@route';

export function CreateJobForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<CreateJobDto>({
        hiringCompany: '',
        recruitingCompany: '',
        position: '',
        recruiterName: '',
        recruitmentChannel: '',
        monthlySalary: 0,
        vacationDays: 0,
        holidayDays: 0,
        jobDescription: '',
        directHire: false,
        timeZone: '',
    });

    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    function handleChange(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        const { name, value, type } = e.target as HTMLInputElement;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === 'checkbox' ? checked
                : type === 'number' ? +value
                : value,
        }));
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        try {
            await client.post<CreateJobDto>('/job', formData);
            navigate(route.jobList);
        } catch (err) {
            console.error('Error submitting the form:', err);
            setError('Failed to submit the form.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Container>
            <Header>Add Job Application</Header>
            {error && <Error>{error}</Error>}
            <Form onSubmit={handleSubmit}>
                <JobFormFields
                    formData={formData}
                    handleChange={handleChange}
                />
                <ButtonGroup>
                    <SaveButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Adding...' : 'Add'}
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
