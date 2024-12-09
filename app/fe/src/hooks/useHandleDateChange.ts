import { useState } from 'react';

export function useHandleDateChange<T extends { interviewDate?: string }>(
    initialState: T,
) {
    const [formData, setFormData] = useState<T>(initialState);

    function handleDateChange(date: Date | null) {
        setFormData((prev) => ({
            ...prev,
            interviewDate: date ? date.toISOString().split('T')[0] : '',
        }));
    }

    return { formData, setFormData, handleDateChange };
}
