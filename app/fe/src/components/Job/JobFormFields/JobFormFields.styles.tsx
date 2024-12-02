import styled from 'styled-components';
import { colors } from '@/styles/theme';

export const FormGroup = styled.div`
    margin-bottom: 1rem;
`;

export const Label = styled.label`
    margin-bottom: 0.5rem;
    display: block;
    font-weight: 600;
    color: ${colors.gray};
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    border-radius: 4px;
    border: 1px solid ${colors.lightGray};
    font-size: 1rem;
`;

export const Textarea = styled.textarea`
    width: 100%;
    padding: 0.75rem;
    border-radius: 4px;
    border: 1px solid ${colors.lightGray};
    min-height: 100px;
    font-size: 1rem;
    resize: vertical;
`;

export const Checkbox = styled.input`
    transform: scale(1.5);
    margin-left: 0.5rem;
`;
