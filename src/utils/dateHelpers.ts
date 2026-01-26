/**
 * Date Helper Utilities
 */

/**
 * Format Date object to DD.MM.YYYY string
 */
export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

/**
 * Parse DD.MM.YYYY string to Date object
 */
export const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('.');
  return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
};

/**
 * Get current date in DD.MM.YYYY format
 */
export const getCurrentDate = (): string => {
  return formatDate(new Date());
};

/**
 * Get all days in a specific month
 */
export const getMonthDays = (month: number, year: number): Date[] => {
  const lastDay = new Date(year, month + 1, 0);
  const days: Date[] = [];

  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }

  return days;
};

/**
 * Get day of week (0 = Sunday, 6 = Saturday)
 */
export const getDayOfWeek = (date: Date): number => {
  return date.getDay();
};

/**
 * Check if date is today
 */
export const isToday = (date: Date | string): boolean => {
  const checkDate = typeof date === 'string' ? parseDate(date) : date;
  const today = new Date();

  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

/**
 * Get date range between two dates
 */
export const datesBetween = (start: Date, end: Date): Date[] => {
  const dates: Date[] = [];
  const current = new Date(start);

  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
};

/**
 * Add days to a date
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Get month name
 */
export const getMonthName = (month: number): string => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[month];
};

/**
 * Get day name
 */
export const getDayName = (day: number): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[day];
};

/**
 * Get short day name (Sun, Mon, etc.)
 */
export const getShortDayName = (day: number): string => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[day];
};

/**
 * Format date as "Month Year" (e.g., "February 2026")
 */
export const formatMonthYear = (month: number, year: number): string => {
  return `${getMonthName(month)} ${year}`;
};

/**
 * Get last N days from today
 */
export const getLastNDays = (n: number): string[] => {
  const dates: string[] = [];
  const today = new Date();

  for (let i = n - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(formatDate(date));
  }

  return dates;
};

/**
 * Compare two dates (ignoring time)
 */
export const isSameDay = (date1: Date | string, date2: Date | string): boolean => {
  const d1 = typeof date1 === 'string' ? parseDate(date1) : date1;
  const d2 = typeof date2 === 'string' ? parseDate(date2) : date2;

  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

/**
 * Get day of month
 */
export const getDayOfMonth = (date: Date | string): number => {
  const d = typeof date === 'string' ? parseDate(date) : date;
  return d.getDate();
};

/**
 * Get month (0-11)
 */
export const getMonth = (date: Date | string): number => {
  const d = typeof date === 'string' ? parseDate(date) : date;
  return d.getMonth();
};

/**
 * Get year
 */
export const getYear = (date: Date | string): number => {
  const d = typeof date === 'string' ? parseDate(date) : date;
  return d.getFullYear();
};
