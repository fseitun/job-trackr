import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/job");
    }
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Job Trackr</h1>
      <p style={styles.description}>
        Manage your job applications and interviews with ease.
      </p>
      <div style={styles.buttonGroup}>
        <Link to="/login" style={styles.link}>
          <button style={styles.button}>Login</button>
        </Link>
        <Link to="/register" style={styles.link}>
          <button style={styles.button}>Register</button>
        </Link>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "2rem",
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#333",
  },
  description: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    color: "#555",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  link: {
    textDecoration: "none",
  },
  button: {
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#1a73e8",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s",
  },
};

export default LandingPage;
