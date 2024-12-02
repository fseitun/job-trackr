import styled from 'styled-components';
import { Button } from '@/styles/Common.styles';
import { colors } from '@/styles/theme';

export const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background-color: ${colors.black};
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.h2`
    text-align: center;
    margin-bottom: 1.5rem;
    color: ${colors.gray};
`;

export const ErrorMessage = styled.div`
    text-align: center;
    padding: 1rem;
    color: ${colors.red};
    font-size: 1rem;
    margin-bottom: 1rem;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
`;

export const SaveButton = styled(Button).attrs({
    $variant: 'primary',
})`
    padding: 0.75rem 1.5rem;
    width: auto;
`;

export const CancelButton = styled(Button).attrs({
    $variant: 'danger',
})``;

export const LoadingIndicator = styled.div`
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
`;
