import { useState, useContext, FormEvent } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
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

const Title = styled.h2`
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FormGroup = styled.div`
    margin-bottom: 1rem;
    width: 100%;
`;

const Label = styled.label`
    margin-bottom: 0.5rem;
    color: #555;
    display: block;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 1rem;
`;

const Button = styled.button`
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

const Error = styled.div`
    margin-bottom: 1rem;
    color: red;
    text-align: center;
`;

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/job');
        } catch {
            setError('An error occurred during login');
        }
    }

    return (
        <Container>
            <Title>Login</Title>
            {error && <Error>{error}</Error>}
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Email:</Label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password:</Label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </FormGroup>
                <Button type="submit">Login</Button>
            </Form>
        </Container>
    );
}
