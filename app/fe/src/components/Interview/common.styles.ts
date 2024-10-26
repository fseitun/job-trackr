import { colors, spacing, borderRadius } from "./theme";

export const containerStyle: React.CSSProperties = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: spacing.large,
  backgroundColor: colors.white,
  borderRadius: borderRadius,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

export const headerStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "1.5rem",
  color: "#333333",
};

export const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

export const buttonGroupStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "1.5rem",
};

export const buttonStyle: React.CSSProperties = {
  padding: "0.75rem 1.5rem",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "1rem",
  transition: "background-color 0.3s",
};

export const saveButtonStyle: React.CSSProperties = {
  backgroundColor: "#1a73e8",
  color: "#ffffff",
};

export const cancelButtonStyle: React.CSSProperties = {
  backgroundColor: "#d93025",
  color: "#ffffff",
};

export const editButtonStyle: React.CSSProperties = {
  backgroundColor: "#ff9800",
  color: "#ffffff",
};

export const errorStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "1rem",
  color: "red",
  fontSize: "1rem",
  marginBottom: "1rem",
};

export const loadingStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "2rem",
  fontSize: "1.2rem",
};

export const labelStyle: React.CSSProperties = {
  marginBottom: "0.5rem",
  display: "block",
  fontWeight: "600",
  color: "#555555",
};

export const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem",
  borderRadius: "4px",
  border: "1px solid #cccccc",
  fontSize: "1rem",
};

export const textareaStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem",
  borderRadius: "4px",
  border: "1px solid #cccccc",
  minHeight: "100px",
  fontSize: "1rem",
  resize: "vertical",
};
