import React from "react";
import { Link } from "react-router-dom";
import { Interview } from "../../types";

interface InterviewListProps {
  interviews: Interview[];
  jobProcessId: number;
}

const InterviewList: React.FC<InterviewListProps> = ({ interviews }) => {
  if (interviews.length === 0) {
    return <p>No interviews scheduled for this job application.</p>;
  }

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th>Interviewer Name</th>
          <th>Role</th>
          <th>Date</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {interviews.map((interview) => (
          <tr key={interview.id} style={styles.row}>
            <td>{interview.interviewerName}</td>
            <td>{interview.interviewerRole}</td>
            <td>{interview.interviewDate.split("T")[0]}</td>
            <td>{interview.notes || "N/A"}</td>
            <td>
              <Link to={`/edit-interview/${interview.id}`}>
                <button style={{ ...styles.button, ...styles.editButton }}>
                  Edit
                </button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  row: {
    borderBottom: "1px solid #ddd",
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
  editButton: {
    backgroundColor: "#34a853",
  },
};

export default InterviewList;
