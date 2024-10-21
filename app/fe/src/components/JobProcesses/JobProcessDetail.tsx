import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { JobProcess } from "../../types";
import InterviewList from "../Interview/InterviewList";
import client from "../../api/client";

const JobProcessDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [jobProcess, setJobProcess] = useState<JobProcess | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchJobProcess = async () => {
      try {
        const data = await client.get<JobProcess>(`/job-processes/${id}`);
        setJobProcess(data);
      } catch (err) {
        console.error("Error fetching job application details:", err);
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
      <button
        onClick={() => navigate("/job-processes")}
        style={styles.backButton}
      >
        Back
      </button>
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
  backButton: {
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#d93025",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginBottom: "1rem",
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
