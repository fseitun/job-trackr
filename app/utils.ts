export function formatDate(dateString: string, timeZone?: string): string {
    const isoDateString = dateString.replace(' ', 'T') + (dateString.endsWith('Z') ? '' : 'Z');
    const date = new Date(isoDateString);
    const locale = "es-AR";
    return date.toLocaleString(locale, {
      timeZone: timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
  });
}
