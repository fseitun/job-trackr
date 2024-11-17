import styled from 'styled-components';
import { colors, borderRadius } from './theme';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export const Button = styled.button`
    padding: 0.5rem 1rem;
    border-radius: ${borderRadius};
    border: none;
    background-color: ${colors.primary};
    color: ${colors.white};
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${darken(0.1, colors.primary)};
    }

    &:disabled {
        background-color: #a0c4ff;
        cursor: not-allowed;
    }
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
`;
