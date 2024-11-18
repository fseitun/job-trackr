import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Row, Table, Td, Th } from '../../../styles/Common.styles';
import { colors } from '../../../styles/theme';

export { Table, Row, Th, Td };

export const Container = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
`;

export const Header = styled.h1`
    text-align: center;
    margin-bottom: 1.5rem;
    color: ${colors.white};
`;

export const AddButtonWrapper = styled(Link)`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
`;

export const ViewButton = styled(Button).attrs({
    $variant: 'success',
})``;

export const Loading = styled.div`
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
`;

export const Error = styled.div`
    text-align: center;
    padding: 2rem;
    color: ${colors.red};
    font-size: 1.2rem;
`;
