const WEEKDAY_LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export function getDateFromToday(daysFromToday: number): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + daysFromToday);
  return date;
}

export function formatDayLabel(date: Date): string {
  return `${WEEKDAY_LABELS[date.getDay()]} ${date.getDate()}`;
}

export function getEventDayLabel(daysFromToday: number): string {
  return formatDayLabel(getDateFromToday(daysFromToday));
}
