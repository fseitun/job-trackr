import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #333;
`;

export const Description = styled.p`
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: #555;
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
`;

export const Button = styled.button`
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    border: none;
    background-color: #1a73e8;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:hover {
        background-color: #1669c1;
    }
`;
