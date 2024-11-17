import styled from 'styled-components';

export const Container = styled.div`
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const Title = styled.h2`
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const FormGroup = styled.div`
    margin-bottom: 1rem;
`;

export const Label = styled.label`
    margin-bottom: 0.5rem;
    color: #555;
    display: block;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 1rem;
`;

export const Button = styled.button`
    padding: 0.75rem;
    border-radius: 4px;
    border: none;
    background-color: #1a73e8;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
    width: 100%;

    &:hover {
        background-color: #1669c1;
    }
`;

export const Error = styled.div`
    margin-bottom: 1rem;
    color: red;
    text-align: center;
`;
