import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Job, UserPreferences } from '../../../types';
import { client } from '../../../api/client';
import { formatDate } from '../../../../../utils';
import {
    AddButtonWrapper,
    Container,
    Error,
    Header,
    Loading,
    Row,
    Table,
    Td,
    Th,
    ViewButton,
} from './JobList.styles';
import { Button } from '../../../styles/Common.styles';
import { ColumnSelector } from '../ColumnSelector/ColumnSelector';

export function JobList() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [selectedColumns, setSelectedColumns] = useState<
        Record<string, boolean>
    >({});

    useEffect(() => {
        async function fetchJobs() {
            try {
                const response = await client.get<Job[]>('/job');
                setJobs(response.data);
            } catch (err) {
                console.error('Error fetching jobs:', err);
                setError('Failed to load jobs.');
            } finally {
                setLoading(false);
            }
        }

        fetchJobs();
    }, []);

    useEffect(() => {
        async function fetchPreferences() {
            try {
                const response =
                    await client.get<UserPreferences>('/user/preferences');
                setSelectedColumns(response.data);
            } catch (error) {
                console.error('Failed to fetch column preferences:', error);
                const defaults = {
                    hiringCompany: true,
                    recruitingCompany: true,
                    position: true,
                    recruiterName: true,
                    recruitmentChannel: false,
                    monthlySalary: true,
                    vacationDays: true,
                    holidayDays: true,
                    jobDescription: false,
                    directHire: false,
                    timeZone: false,
                    lastInteraction: true,
                };
                setSelectedColumns(defaults);
            }
        }

        fetchPreferences();
    }, []);

    function handleSaveColumns(columns: Record<string, boolean>): void {
        setSelectedColumns(columns);
    }

    if (loading) {
        return <Loading>Loading jobs...</Loading>;
    }

    if (error) {
        return <Error>{error}</Error>;
    }

    const sortedJobs = [...jobs].sort(
        (a, b) =>
            new Date(b.lastInteraction).getTime() -
            new Date(a.lastInteraction).getTime(),
    );

    const availableColumns = [
        'hiringCompany',
        'recruitingCompany',
        'position',
        'recruiterName',
        'recruitmentChannel',
        'monthlySalary',
        'vacationDays',
        'holidayDays',
        'jobDescription',
        'directHire',
        'timeZone',
        'lastInteraction',
    ];

    const visibleColumns = availableColumns.filter(
        (column) => selectedColumns[column],
    );

    return (
        <Container>
            <Header>Job Applications</Header>
            <AddButtonWrapper to="/job/add">
                <Button>Add Job Application</Button>
            </AddButtonWrapper>
            <ColumnSelector
                availableColumns={availableColumns}
                onSave={handleSaveColumns}
            />
            {sortedJobs.length === 0 ?
                <p>No job applications found.</p>
            :   <Table>
                    <thead>
                        <tr>
                            {visibleColumns.map((column) => (
                                <Th key={column}>
                                    {column.charAt(0).toUpperCase() +
                                        column.slice(1)}
                                </Th>
                            ))}
                            <Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedJobs.map((job) => (
                            <Row key={job.id}>
                                {visibleColumns.includes('hiringCompany') && (
                                    <Td>{job.hiringCompany}</Td>
                                )}
                                {visibleColumns.includes(
                                    'recruitingCompany',
                                ) && <Td>{job.recruitingCompany}</Td>}
                                {visibleColumns.includes('position') && (
                                    <Td>{job.position}</Td>
                                )}
                                {visibleColumns.includes('recruiterName') && (
                                    <Td>{job.recruiterName}</Td>
                                )}
                                {visibleColumns.includes(
                                    'recruitmentChannel',
                                ) && <Td>{job.recruitmentChannel}</Td>}
                                {visibleColumns.includes('monthlySalary') && (
                                    <Td>{job.monthlySalary}</Td>
                                )}
                                {visibleColumns.includes('vacationDays') && (
                                    <Td>{job.vacationDays}</Td>
                                )}
                                {visibleColumns.includes('holidayDays') && (
                                    <Td>{job.holidayDays}</Td>
                                )}
                                {visibleColumns.includes('jobDescription') && (
                                    <Td>{job.jobDescription}</Td>
                                )}
                                {visibleColumns.includes('directHire') && (
                                    <Td>{job.directHire ? 'Yes' : 'No'}</Td>
                                )}
                                {visibleColumns.includes('timeZone') && (
                                    <Td>{job.timeZone}</Td>
                                )}
                                {visibleColumns.includes('lastInteraction') && (
                                    <Td>
                                        {job.lastInteraction ?
                                            formatDate(job.lastInteraction)
                                        :   'N/A'}
                                    </Td>
                                )}
                                <Td>
                                    <Link to={`/job/${job.id}`}>
                                        <ViewButton>View Details</ViewButton>
                                    </Link>
                                </Td>
                            </Row>
                        ))}
                    </tbody>
                </Table>
            }
        </Container>
    );
}
