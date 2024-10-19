import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { JobProcess } from "../../types";
import api from "../../api/api";

const JobProcessList: React.FC = () => {
  const [jobProcesses, setJobProcesses] = useState<JobProcess[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchJobProcesses = async () => {
      try {
        const response = await api.get<JobProcess[]>("/job-processes");
        setJobProcesses(response.data);
      } catch (err) {
        console.error("Error fetching job processes:", err);
        setError("Failed to load job applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobProcesses();
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading job applications...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Job Applications</h1>
      <Link to="/job-processes/add" style={styles.addButton}>
        <button style={styles.button}>Add Job Application</button>
      </Link>
      {jobProcesses.length === 0 ? (
        <p>No job applications found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Hiring Company</th>
              <th>Recruiting Company</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobProcesses.map((job) => (
              <tr key={job.id} style={styles.row}>
                <td>{job.hiringCompany}</td>
                <td>{job.recruitingCompany}</td>
                <td>{job.position}</td>
                <td>
                  <Link to={`/job-processes/${job.id}`}>
                    <button style={{ ...styles.button, ...styles.viewButton }}>
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "2rem",
  },
  header: {
    textAlign: "center",
    marginBottom: "1.5rem",
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
  viewButton: {
    backgroundColor: "#34a853",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  row: {
    borderBottom: "1px solid #ddd",
  },
  th: {
    textAlign: "left",
    padding: "0.75rem",
    backgroundColor: "#f2f2f2",
  },
  td: {
    padding: "0.75rem",
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

export default JobProcessList;
