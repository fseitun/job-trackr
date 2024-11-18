import styled from 'styled-components';
import { colors, fontSize, borderRadius, spacing } from './theme';

export const Button = styled.button<{ $variant?: string }>`
    padding: ${spacing.small} ${spacing.medium};
    border: none;
    border-radius: ${borderRadius.medium};
    background-color: ${({ $variant }) =>
        $variant === 'success' ? colors.success
        : $variant === 'danger' ? colors.danger
        : colors.primary};
    color: ${colors.white};
    cursor: pointer;
    font-size: ${fontSize.medium};
    transition: background-color 0.3s;

    &:hover {
        opacity: 0.8;
    }

    &:disabled {
        background-color: ${colors.lightGray};
        cursor: not-allowed;
    }
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const Row = styled.tr`
    border-bottom: ${borderRadius.small} solid ${colors.gray};
    background-color: ${colors.darkGray};
`;

export const Th = styled.th`
    text-align: left;
    padding: ${spacing.small};
    background-color: ${colors.gray};
    color: ${colors.white};
`;

export const Td = styled.td`
    padding: ${spacing.small};
    color: ${colors.white};
`;
