import styled from 'styled-components';
import { Button, Row, Table, Td, Th } from '@/styles/Common.styles';
import { colors, fontSize, borderRadius } from '@/styles/theme';

export { Table, Row, Th, Td };

export const EditButton = styled(Button).attrs({
    $variant: 'success',
})`
    background-color: ${colors.success};
    color: ${colors.white};
    padding: 0.5rem 1rem;
    border-radius: ${borderRadius.medium};
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${colors.success};
    }

    @media (min-width: 768px) {
        padding: 0.75rem 1.5rem;
        font-size: ${fontSize.medium};
    }
`;
