import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '@context/AuthContext';
import { useNavigate } from 'react-router';
import { Button } from '@styles/Common.styles';
import {
    Container,
    Error,
    Form,
    FormGroup,
    Input,
    Label,
    Title,
} from './Login.styles';
import route from '@route';

export function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        try {
            await login(email, password);
            navigate(route.jobList);
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
