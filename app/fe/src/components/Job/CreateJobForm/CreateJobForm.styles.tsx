import styled from 'styled-components';
import { darken } from 'polished';
import { Button } from '@styles/Common.styles';
import { colors, spacing, fontSize, borderRadius } from '@styles/theme';

export const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background-color: ${colors.black};
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    @media (min-width: 768px) {
        padding: ${spacing.large};
    }
`;

export const Header = styled.h2`
    text-align: center;
    margin-bottom: 1.5rem;
    color: ${colors.gray};
    font-size: 1.5rem;

    @media (min-width: 768px) {
        font-size: ${fontSize.large};
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;

    @media (min-width: 768px) {
        margin-top: 2rem;
    }
`;

export const SaveButton = styled(Button)`
    background-color: ${colors.primary};
    color: ${colors.white};
    padding: 0.75rem 1.5rem;
    border-radius: ${borderRadius.medium};
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${darken(0.1, colors.primary)};
    }

    &:disabled {
        background-color: ${colors.lightGray};
        cursor: not-allowed;
    }

    @media (min-width: 768px) {
        padding: 1rem 2rem;
        font-size: ${fontSize.medium};
    }
`;

export const CancelButton = styled(Button)`
    background-color: ${colors.danger};
    color: ${colors.white};
    padding: 0.75rem 1.5rem;
    border-radius: ${borderRadius.medium};
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${darken(0.1, colors.danger)};
    }

    &:disabled {
        background-color: ${colors.disabled};
        cursor: not-allowed;
    }

    @media (min-width: 768px) {
        padding: 1rem 2rem;
        font-size: ${fontSize.medium};
    }
`;

export const Error = styled.div`
    text-align: center;
    padding: 1rem;
    color: ${colors.red};
    font-size: 1rem;
    margin-bottom: 1rem;

    @media (min-width: 768px) {
        font-size: ${fontSize.medium};
    }
`;
