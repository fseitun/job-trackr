import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '../../../styles/common.styles';

export const Container = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
`;

export const Header = styled.h1`
    text-align: center;
    margin-bottom: 1.5rem;
`;

export const AddButtonWrapper = styled(Link)`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
`;

export const ViewButton = styled(Button).attrs({
    variant: 'success',
})``;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const Row = styled.tr`
    border-bottom: 1px solid #ddd;
`;

export const Th = styled.th`
    text-align: left;
    padding: 0.75rem;
    background-color: #f2f2f2;
`;

export const Td = styled.td`
    padding: 0.75rem;
`;

export const Loading = styled.div`
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
`;

export const Error = styled.div`
    text-align: center;
    padding: 2rem;
    color: red;
    font-size: 1.2rem;
`;
