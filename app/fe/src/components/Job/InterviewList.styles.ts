import styled from 'styled-components';
import { darken } from 'polished';
import { Button } from '../../styles/common.styles';

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const Row = styled.tr`
    border-bottom: 1px solid #dddddd;
`;

export const EditButton = styled(Button)`
    background-color: #4caf50;
    color: #ffffff;

    &:hover {
        background-color: ${darken(0.1, '#4caf50')};
    }
`;
