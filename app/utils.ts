export function formatDate(dateString: string, timeZone?: string): string {
    if (!dateString) return '';

    let isoDateString =
        dateString.includes('T') ? dateString : dateString.replace(' ', 'T');
    isoDateString += dateString.endsWith('Z') ? '' : 'Z';

    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) return '';

    const locale = 'es-AR';
    return date.toLocaleDateString(locale, {
        timeZone: timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}
