import styled from 'styled-components';
import { Button as CommonButton } from '@/styles/Common.styles';
import { colors, spacing, fontSize } from '@/styles/theme';

export const Container = styled.div`
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid ${colors.lightGray};
    border-radius: 8px;
    background-color: ${colors.black};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media (min-width: 768px) {
        padding: ${spacing.large};
        max-width: 500px;
    }
`;

export const Title = styled.h2`
    text-align: center;
    margin-bottom: 1.5rem;
    color: ${colors.darkGray};
    font-size: 1.5rem;

    @media (min-width: 768px) {
        font-size: ${fontSize.large};
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const FormGroup = styled.div`
    margin-bottom: 1rem;
    width: 100%;

    @media (min-width: 768px) {
        margin-bottom: 1.5rem;
    }
`;

export const Label = styled.label`
    margin-bottom: 0.5rem;
    color: ${colors.gray};
    display: block;
    font-size: 1rem;

    @media (min-width: 768px) {
        font-size: ${fontSize.medium};
    }
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    border-radius: 4px;
    border: 1px solid ${colors.lightGray};
    font-size: 1rem;

    @media (min-width: 768px) {
        padding: ${spacing.medium};
        font-size: ${fontSize.medium};
    }
`;

export const Button = styled(CommonButton)`
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;

    @media (min-width: 768px) {
        padding: ${spacing.medium};
        font-size: ${fontSize.medium};
    }
`;

export const Error = styled.div`
    margin-bottom: 1rem;
    color: ${colors.red};
    text-align: center;
    font-size: 1rem;

    @media (min-width: 768px) {
        font-size: ${fontSize.medium};
    }
`;
