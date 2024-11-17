import styled from 'styled-components';

export const FormGroup = styled.div`
    margin-bottom: 1rem;
`;

export const Label = styled.label`
    margin-bottom: 0.5rem;
    display: block;
    font-weight: 600;
    color: #555555;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    border-radius: 4px;
    border: 1px solid #cccccc;
    font-size: 1rem;
`;

export const Textarea = styled.textarea`
    width: 100%;
    padding: 0.75rem;
    border-radius: 4px;
    border: 1px solid #cccccc;
    min-height: 100px;
    font-size: 1rem;
    resize: vertical;
`;

export const Checkbox = styled.input`
    transform: scale(1.5);
    margin-left: 0.5rem;
`;
