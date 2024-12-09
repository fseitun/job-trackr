import { Link } from 'react-router';
import { Interview } from '@types';
import { formatDate } from 'utils';
import { EditButton, Row, Table } from './InterviewList.styles';
import route from '@route';

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
                        <td>{interview.notes || 'N/A'}</td>
                        <td>
                            <Link to={route.editInterview}>
                                <EditButton>Edit</EditButton>
                            </Link>
                        </td>
                    </Row>
                ))}
            </tbody>
        </Table>
    );
}
