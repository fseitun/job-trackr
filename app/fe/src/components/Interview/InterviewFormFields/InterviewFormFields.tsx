import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { CreateInterviewDto, UpdateInterviewDto } from '@/types';
import { ChangeEvent } from 'react';
import {
    FormGroup,
    Input,
    Label,
    Textarea,
} from './InterviewFormFields.styles';

interface InterviewFormFieldsProps {
    formData: CreateInterviewDto | UpdateInterviewDto;
    handleChange: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    handleDateChange: (date: Date | null) => void;
}

export function InterviewFormFields({
    formData,
    handleChange,
    handleDateChange,
}: InterviewFormFieldsProps) {
    const selectedDate =
        formData.interviewDate ? new Date(formData.interviewDate) : null;

    return (
        <>
            <FormGroup>
                <Label>Interviewer Name:</Label>
                <Input
                    type="text"
                    name="interviewerName"
                    value={formData.interviewerName || ''}
                    onChange={handleChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label>Interviewer Role:</Label>
                <Input
                    type="text"
                    name="interviewerRole"
                    value={formData.interviewerRole || ''}
                    onChange={handleChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label>Interview Date:</Label>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => handleDateChange(date)}
                    dateFormat="dd/MM/yyyy"
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label>Notes:</Label>
                <Textarea
                    name="notes"
                    value={formData.notes || ''}
                    onChange={handleChange}
                />
            </FormGroup>
        </>
    );
}
