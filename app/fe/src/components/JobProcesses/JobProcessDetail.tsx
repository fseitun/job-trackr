import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { JobProcess } from "../../types";
import InterviewList from "../Interview/InterviewList";

const JobProcessDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [jobProcess, setJobProcess] = useState<JobProcess | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchJobProcess = async () => {
      try {
        const response = await axios.get<JobProcess>(
          `/api/job-processes/${id}`
        );
        setJobProcess(response.data);
      } catch (err) {
        setError("Failed to load job application details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobProcess();
    }
  }, [id]);

  if (loading) {
    return <div style={styles.loading}>Loading job application...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  if (!jobProcess) {
    return <div style={styles.error}>Job application not found.</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.subHeader}>Interviews</h2>
      <Link to={`/job-processes/${id}/add-interview`} style={styles.addButton}>
        <button style={styles.button}>Add Interview</button>
      </Link>
      <InterviewList
        interviews={jobProcess.interviews}
        jobProcessId={jobProcess.id}
      />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
  },
  subHeader: {
    marginTop: "2rem",
    marginBottom: "1rem",
    color: "#555555",
    borderBottom: "1px solid #ddd",
    paddingBottom: "0.5rem",
  },
  addButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "1rem",
  },
  button: {
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#1a73e8",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  loading: {
    textAlign: "center",
    padding: "2rem",
    fontSize: "1.2rem",
  },
  error: {
    textAlign: "center",
    padding: "2rem",
    color: "red",
    fontSize: "1.2rem",
  },
};

export default JobProcessDetail;
