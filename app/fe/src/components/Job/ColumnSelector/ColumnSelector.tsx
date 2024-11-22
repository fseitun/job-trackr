import { useState, useEffect } from 'react';
import { client } from '../../../api/client';
import { useAuth } from '../../../hooks/useAuth';
import { Modal, Button, Checkbox } from '../../../styles/Common.styles';

interface ColumnSelectorProps {
    availableColumns: string[];
    onSave: (selected: Record<string, boolean>) => void;
}

export function ColumnSelector({
    availableColumns,
    onSave,
}: ColumnSelectorProps) {
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<
        Record<string, boolean>
    >({});

    useEffect(() => {
        async function fetchPreferences() {
            try {
                const preferences =
                    await client.get<Record<string, boolean>>(
                        '/user/preferences',
                    );
                setSelectedColumns(preferences.data);
            } catch (error) {
                console.error('Failed to fetch column preferences:', error);
                const defaults = availableColumns.reduce(
                    (acc, column) => {
                        acc[column] = true;
                        return acc;
                    },
                    {} as Record<string, boolean>,
                );
                setSelectedColumns(defaults);
            }
        }

        if (user) {
            fetchPreferences();
        }
    }, [user, availableColumns]);

    function handleCheckboxChange(column: string) {
        setSelectedColumns((prev) => ({
            ...prev,
            [column]: !prev[column],
        }));
    }

    async function handleSave() {
        try {
            await client.put('/user/preferences', {
                preferences: selectedColumns,
            });
            onSave(selectedColumns);
            setShowModal(false);
        } catch (error) {
            console.error('Failed to save column preferences:', error);
        }
    }

    return (
        <>
            <Button onClick={() => setShowModal(true)}>Select Columns</Button>
            {showModal && (
                <Modal>
                    <h2>Select Columns to Display</h2>
                    <form>
                        {availableColumns.map((column) => (
                            <div key={column}>
                                <Checkbox
                                    type="checkbox"
                                    checked={selectedColumns[column] || false}
                                    onChange={() =>
                                        handleCheckboxChange(column)
                                    }
                                />
                                <label>{column}</label>
                            </div>
                        ))}
                    </form>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={() => setShowModal(false)}>Cancel</Button>
                </Modal>
            )}
        </>
    );
}
