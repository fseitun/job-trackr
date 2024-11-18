import styled from 'styled-components';
import { Button } from '../../../styles/common.styles';

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const Row = styled.tr`
    border-bottom: 1px solid #dddddd;
`;

export const EditButton = styled(Button).attrs({
    variant: 'success',
})``;
