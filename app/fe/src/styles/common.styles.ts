import styled from 'styled-components';

export const Button = styled.button<{ variant?: string }>`
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: ${({ variant }) =>
        variant === 'success' ? '#4caf50'
        : variant === 'danger' ? '#f44336'
        : '#2196f3'};
    color: white;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:hover {
        opacity: 0.8;
    }

    &:disabled {
        background-color: #a0c4ff;
        cursor: not-allowed;
    }
`;
