import { Link } from "react-router-dom";
import { Interview } from "../../types";
import { formatDate } from "../../../../utils";
import { Table, Row, EditButton } from "./InterviewList.styles";

interface InterviewListProps {
  interviews: Interview[];
  jobId: number;
}

export function InterviewList({ interviews }: InterviewListProps) {
  if (interviews.length === 0) {
    return <p>No interviews scheduled for this job application.</p>;
  }

  return (
    <Table>
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
          <Row key={interview.id}>
            <td>{interview.interviewerName}</td>
            <td>{interview.interviewerRole}</td>
            <td>{formatDate(interview.interviewDate)}</td>
            <td>{interview.notes || "N/A"}</td>
            <td>
              <Link to={`/edit-interview/${interview.id}`}>
                <EditButton>Edit</EditButton>
              </Link>
            </td>
          </Row>
        ))}
      </tbody>
    </Table>
  );
}
