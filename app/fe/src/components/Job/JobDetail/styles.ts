import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.large};
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const BackButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: ${(props) => props.theme.borderRadius};
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.3s;
  margin-bottom: 1rem;

  &:hover {
    background-color: darken(${(props) => props.theme.colors.primary}, 10%);
  }
`;

export const SubHeader = styled.h2`
  margin-bottom: ${(props) => props.theme.spacing.medium};
  color: ${(props) => props.theme.colors.gray};
`;

export const AddButton = styled(Link)`
  display: inline-block;
  margin-bottom: ${(props) => props.theme.spacing.medium};
  text-decoration: none;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: ${(props) => props.theme.borderRadius};
  border: none;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: darken(${(props) => props.theme.colors.primary}, 10%);
  }
`;

export const EditButton = styled(Link)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${(props) => props.theme.spacing.medium};
  margin-top: ${(props) => props.theme.spacing.medium};
  text-decoration: none;
`;

export const EditBtn = styled(Button)`
  background-color: ${(props) => props.theme.colors.success};

  &:hover {
    background-color: darken(${(props) => props.theme.colors.success}, 10%);
  }
`;

export const Loading = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing.large};
  font-size: 1.2rem;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing.medium};
  color: ${(props) => props.theme.colors.danger};
  font-size: 1rem;
  margin-bottom: ${(props) => props.theme.spacing.medium};
`;
