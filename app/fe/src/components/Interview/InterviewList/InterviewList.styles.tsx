import styled from 'styled-components';
import { Button, Row, Table, Td, Th } from '../../../styles/Common.styles';
import { colors } from '../../../styles/theme';

export { Table, Row, Th, Td };

export const EditButton = styled(Button).attrs({
    $variant: 'success',
})`
    background-color: ${colors.success};
    color: ${colors.white};

    &:hover {
        background-color: ${colors.success};
    }
`;
