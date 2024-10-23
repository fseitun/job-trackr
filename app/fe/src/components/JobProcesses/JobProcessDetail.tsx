import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { JobProcess } from "../../types";
import InterviewList from "../Interview/InterviewList";
import client from "../../api/client";

const JobProcessDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [Interviews, setInterviews] = useState<JobProcess | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const data = await client.get<JobProcess>(`/job-processes/${id}`);
        for (const date of data.interviews) {
          console.log(date.interviewDate);
          console.log(new Date(date.interviewDate).getTime());
        }
        const sortedInterviews = [...data.interviews].sort(
          (a, b) =>
            new Date(b.interviewDate).getTime() -
            new Date(a.interviewDate).getTime()
        );
        setInterviews({ ...data, interviews: sortedInterviews });
      } catch (err) {
        console.error("Error fetching job application details:", err);
        setError("Failed to load job application details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInterviews();
    }
  }, [id]);

  if (loading) {
    return <div style={styles.loading}>Loading interviews...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  if (!Interviews) {
    return <div style={styles.error}>Interviews not found.</div>;
  }

  console.log(Interviews);

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
        interviews={Interviews.interviews}
        jobProcessId={Interviews.id}
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
