import styled from 'styled-components';
import { Link } from 'react-router';
import { Button, Row, Table, Td, Th } from '@/styles/Common.styles';
import { colors, spacing, fontSize } from '@/styles/theme';

export { Table, Row, Th, Td };

export const Container = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;

    @media (min-width: 768px) {
        padding: ${spacing.large};
    }
`;

export const Header = styled.h1`
    text-align: center;
    margin-bottom: 1.5rem;
    color: ${colors.white};
    font-size: 2rem;

    @media (min-width: 768px) {
        font-size: ${fontSize.large};
    }
`;

export const AddButtonWrapper = styled(Link)`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    @media (min-width: 768px) {
        margin-bottom: 2rem;
    }
`;

export const ViewButton = styled(Button).attrs({
    $variant: 'success',
})`
    padding: 0.5rem 1rem;

    @media (min-width: 768px) {
        padding: 0.75rem 1.5rem;
    }
`;

export const Loading = styled.div`
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;

    @media (min-width: 768px) {
        font-size: ${fontSize.medium};
    }
`;

export const Error = styled.div`
    text-align: center;
    padding: 2rem;
    color: ${colors.red};
    font-size: 1.2rem;

    @media (min-width: 768px) {
        font-size: ${fontSize.medium};
    }
`;
