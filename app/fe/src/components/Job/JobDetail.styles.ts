import styled from 'styled-components';
import { darken } from 'polished';
import { Button } from '../../styles/common.styles';

export const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const BackButton = styled(Button)`
    padding: 0.5rem 1rem;
    border-radius: 4px;
    background-color: #1a73e8;
    color: #ffffff;
    transition: background-color 0.3s;
    margin-bottom: 1rem;

    &:hover {
        background-color: ${darken(0.1, '#1a73e8')};
    }
`;

export const SubHeader = styled.h2`
    text-align: center;
    margin-bottom: 1rem;
    color: #333333;
`;

export const AddButtonWrapper = styled.div`
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-end;
`;

export const EditButtonWrapper = styled.div`
    margin-bottom: 1rem;
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
`;

export const EditBtn = styled(Button)`
    background-color: #2196f3;
    color: #ffffff;

    &:hover {
        background-color: ${darken(0.1, '#2196f3')};
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
    color: red;
    font-size: 1.2rem;
`;
