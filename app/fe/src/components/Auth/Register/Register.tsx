import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '@context/AuthContext';
import { useNavigate } from 'react-router';
import {
    Button,
    Container,
    Error,
    Form,
    FormGroup,
    Input,
    Label,
    Title,
} from './Register.styles';
import route from '@route';

export function Register() {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        register(email, password)
            .then(() => navigate(route.jobList))
            .catch(() => setError('An unexpected error occurred'));
    }

    return (
        <Container>
            <Title>Register</Title>
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
                <FormGroup>
                    <Label>Confirm Password:</Label>
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </FormGroup>
                <Button type="submit">Register</Button>
            </Form>
        </Container>
    );
}
