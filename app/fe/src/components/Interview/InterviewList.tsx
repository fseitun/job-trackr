import React from "react";
import { Link } from "react-router-dom";
import { Interview } from "../../types";
import {
  tableStyle,
  rowStyle,
  buttonStyle,
  editButtonStyle,
} from "./InterviewList.styles";

interface InterviewListProps {
  interviews: Interview[];
  jobProcessId: number;
}

const InterviewList: React.FC<InterviewListProps> = ({ interviews }) => {
  if (interviews.length === 0) {
    return <p>No interviews scheduled for this job application.</p>;
  }

  return (
    <table style={tableStyle}>
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
          <tr key={interview.id} style={rowStyle}>
            <td>{interview.interviewerName}</td>
            <td>{interview.interviewerRole}</td>
            <td>{new Date(interview.interviewDate).toLocaleDateString()}</td>
            <td>{interview.notes || "N/A"}</td>
            <td>
              <Link to={`/edit-interview/${interview.id}`}>
                <button style={{ ...buttonStyle, ...editButtonStyle }}>
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

export default InterviewList;
