import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Job } from "../../types";
import client from "../../api/client";

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs = await client.fetchAll<Job>(
          "/job"
        );
        setJobs(jobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading job...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  const sortedJobs = [...jobs].sort(
    (a, b) =>
      new Date(b.lastInteraction).getTime() -
      new Date(a.lastInteraction).getTime()
  );
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Job Applications</h1>
      <Link to="/job/add" style={styles.addButton}>
        <button style={styles.button}>Add Job Application</button>
      </Link>
      {sortedJobs.length === 0 ? (
        <p>No job applications found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Hiring Company</th>
              <th>Recruiting Company</th>
              <th>Position</th>
              <th>Last Interaction</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedJobs.map((job) => (
              <tr key={job.id} style={styles.row}>
                <td>{job.hiringCompany}</td>
                <td>{job.recruitingCompany}</td>
                <td>{job.position}</td>
                <td>{job.lastInteraction ? job.lastInteraction : "N/A"}</td>
                <td>
                  <Link to={`/job/${job.id}`}>
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

export default JobList;
