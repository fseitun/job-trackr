import { Button } from '@styles/Common.styles';
import {
    ButtonGroup,
    Container,
    Description,
    StyledLink,
    Title,
} from './LandingPage.styles';

export function LandingPage() {
    return (
        <Container>
            <Title>Welcome to Job Trackr</Title>
            <Description>
                Manage your job applications and interviews with ease.
            </Description>
            <ButtonGroup>
                <StyledLink to="/login">
                    <Button>Login</Button>
                </StyledLink>
                <StyledLink to="/register">
                    <Button>Register</Button>
                </StyledLink>
            </ButtonGroup>
        </Container>
    );
}
