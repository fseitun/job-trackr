import styled from 'styled-components';
import { darken } from 'polished';
import { Button } from '../../../styles/Common.styles';
import { Link } from 'react-router-dom';
import { borderRadius, colors } from '../../../styles/theme';

export const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background-color: ${colors.black};
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const BackButton = styled(Button)`
    padding: 0.5rem 1rem;
    border-radius: 4px;
    background-color: ${colors.primary};
    color: ${colors.white};
    transition: background-color 0.3s;
    margin-bottom: 1rem;

    &:hover {
        background-color: ${darken(0.1, colors.primary)};
    }
`;

export const SubHeader = styled.h2`
    text-align: center;
    margin-bottom: 1rem;
    color: ${colors.gray};
`;

export const AddButton = styled.div`
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-end;
`;

export const EditButton = styled.div`
    margin-bottom: 1rem;
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
`;

export const EditBtn = styled(Button)`
    background-color: ${colors.primary};
    color: ${colors.white};

    &:hover {
        background-color: ${darken(0.1, colors.primary)};
    }
`;

export const Loading = styled.div`
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
`;

export const ErrorMessage = styled.div`
    text-align: center;
    padding: 2rem;
    color: ${colors.red};
    font-size: 1.2rem;
`;

export const ButtonLink = styled(Link)`
    padding: 0.5rem 1rem;
    border-radius: ${borderRadius};
    border: none;
    background-color: ${colors.primary};
    color: ${colors.white};
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    transition: background-color 0.3s;
    text-decoration: none;
    display: inline-block;

    &:hover {
        background-color: ${darken(0.1, colors.primary)};
    }

    &:disabled {
        background-color: ${colors.lightGray};
        cursor: not-allowed;
    }
`;
