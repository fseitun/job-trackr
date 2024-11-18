import styled from 'styled-components';
import { darken } from 'polished';
import { Button } from '../../../styles/Common.styles';
import { colors } from '../../../styles/theme';

export const Container = styled.div`
    max-width: 800px;
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

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
`;

export const SaveButton = styled(Button)`
    background-color: ${colors.primary};
    color: ${colors.white};

    &:hover {
        background-color: ${darken(0.1, colors.primary)};
    }

    &:disabled {
        background-color: ${colors.lightGray};
        cursor: not-allowed;
    }
`;

export const CancelButton = styled(Button)`
    background-color: ${colors.danger};
    color: ${colors.white};

    &:hover {
        background-color: ${darken(0.1, colors.danger)};
    }

    &:disabled {
        background-color: ${colors.disabled};
        cursor: not-allowed;
    }
`;

export const Error = styled.div`
    text-align: center;
    padding: 1rem;
    color: ${colors.red};
    font-size: 1rem;
    margin-bottom: 1rem;
`;
