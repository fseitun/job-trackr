import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  Description,
  ButtonGroup,
  StyledLink,
  Button,
} from "./LandingPage.styles";

export function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/job");
    }
  }, [navigate]);

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