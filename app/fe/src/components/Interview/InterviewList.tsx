import { Link } from 'react-router-dom';
import { Interview } from '../../types';
import { formatDate } from '../../../../utils';
import styled from 'styled-components';

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const Row = styled.tr`
    border-bottom: 1px solid #dddddd;
`;

const Button = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: none;
    background-color: #1a73e8;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #1669c1;
    }
`;

const EditButton = styled(Button)`
    background-color: #4caf50;

    &:hover {
        background-color: #3e8e41;
    }
`;

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
