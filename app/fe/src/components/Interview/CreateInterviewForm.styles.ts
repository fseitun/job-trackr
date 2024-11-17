import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333333;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 1rem;
  color: red;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

export const SaveButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  border: none;
  background-color: #1a73e8;
  color: #ffffff;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${darken(0.1, "#1a73e8")};
  }

  &:disabled {
    background-color: #a0c4ff;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  border: none;
  background-color: #d93025;
  color: #ffffff;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${darken(0.1, "#d93025")};
  }

  &:disabled {
    background-color: #f4a3a3;
    cursor: not-allowed;
  }
`;

export const LoadingIndicator = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
`;
