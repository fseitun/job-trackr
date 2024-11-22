import styled from 'styled-components';
import { colors } from '../../../styles/theme';

export const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${colors.white};
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
`;

export const Checkbox = styled.input`
    margin-right: 0.5rem;
`;

export const Button = styled.button`
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: ${colors.primary};
    color: ${colors.white};
    cursor: pointer;

    &:hover {
        background-color: ${colors.darkPrimary};
    }

    &:disabled {
        background-color: ${colors.lightGray};
        cursor: not-allowed;
    }
`;
