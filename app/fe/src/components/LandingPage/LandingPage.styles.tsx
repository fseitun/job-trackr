import styled from 'styled-components';
import { Link } from 'react-router';
import { colors, spacing, fontSize } from '../../styles/theme';

export const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
    background-color: ${colors.black};
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media (min-width: 768px) {
        padding: ${spacing.large};
        max-width: 800px;
    }
`;

export const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 1rem;
    color: ${colors.gray};

    @media (min-width: 768px) {
        font-size: ${fontSize.large};
    }
`;

export const Description = styled.p`
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: ${colors.gray};

    @media (min-width: 768px) {
        font-size: ${fontSize.medium};
    }
`;

export const StyledLink = styled(Link)`
    text-decoration: none;

    @media (min-width: 768px) {
        margin: 0 1rem;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;

    @media (min-width: 768px) {
        gap: 2rem;
    }
`;
