/**
 * Time Helper Utilities
 */

/**
 * Format time as HH:MM from Date object
 */
export const formatTime = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * Get current time in HH:MM format
 */
export const getCurrentTime = (): string => {
  return formatTime(new Date());
};

/**
 * Parse HH:MM format to minutes since midnight
 */
export const timeToMinutes = (timeString: string): number => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

/**
 * Convert minutes since midnight to HH:MM format
 */
export const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};

/**
 * Sort tasks by time (HH:MM format)
 */
export const sortByTime = <T extends { time?: string }>(tasks: T[]): T[] => {
  return [...tasks].sort((a, b) => {
    // Tasks without time go to the end
    if (!a.time) return 1;
    if (!b.time) return -1;

    const aMinutes = timeToMinutes(a.time);
    const bMinutes = timeToMinutes(b.time);

    return aMinutes - bMinutes;
  });
};

/**
 * Check if time string is valid (HH:MM format)
 */
export const isValidTime = (timeString: string): boolean => {
  const regex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
  return regex.test(timeString);
};

/**
 * Compare two times
 * Returns: -1 if time1 < time2, 0 if equal, 1 if time1 > time2
 */
export const compareTime = (time1: string, time2: string): number => {
  const minutes1 = timeToMinutes(time1);
  const minutes2 = timeToMinutes(time2);

  if (minutes1 < minutes2) return -1;
  if (minutes1 > minutes2) return 1;
  return 0;
};

/**
 * Add minutes to a time
 */
export const addMinutesToTime = (timeString: string, minutes: number): string => {
  let totalMinutes = timeToMinutes(timeString) + minutes;

  // Wrap around to next day if needed
  if (totalMinutes >= 24 * 60) {
    totalMinutes = totalMinutes % (24 * 60);
  } else if (totalMinutes < 0) {
    totalMinutes = (24 * 60) + totalMinutes;
  }

  return minutesToTime(totalMinutes);
};

/**
 * Get time range label (e.g., "08:00 - 09:00")
 */
export const getTimeRangeLabel = (startTime: string, durationMinutes: number): string => {
  const endTime = addMinutesToTime(startTime, durationMinutes);
  return `${startTime} - ${endTime}`;
};

/**
 * Check if time is in morning (5:00 - 12:00)
 */
export const isMorning = (timeString: string): boolean => {
  const minutes = timeToMinutes(timeString);
  return minutes >= 5 * 60 && minutes < 12 * 60;
};

/**
 * Check if time is in afternoon (12:00 - 17:00)
 */
export const isAfternoon = (timeString: string): boolean => {
  const minutes = timeToMinutes(timeString);
  return minutes >= 12 * 60 && minutes < 17 * 60;
};

/**
 * Check if time is in evening (17:00 - 21:00)
 */
export const isEvening = (timeString: string): boolean => {
  const minutes = timeToMinutes(timeString);
  return minutes >= 17 * 60 && minutes < 21 * 60;
};

/**
 * Check if time is at night (21:00 - 5:00)
 */
export const isNight = (timeString: string): boolean => {
  const minutes = timeToMinutes(timeString);
  return minutes >= 21 * 60 || minutes < 5 * 60;
};

/**
 * Get period of day from time
 */
export const getPeriodOfDay = (timeString: string): 'morning' | 'afternoon' | 'evening' | 'night' => {
  if (isMorning(timeString)) return 'morning';
  if (isAfternoon(timeString)) return 'afternoon';
  if (isEvening(timeString)) return 'evening';
  return 'night';
};

/**
 * Get time until a specific time from now
 */
export const getTimeUntil = (timeString: string): number => {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const targetMinutes = timeToMinutes(timeString);

  let diff = targetMinutes - nowMinutes;

  // If time has passed today, calculate for tomorrow
  if (diff < 0) {
    diff += 24 * 60;
  }

  return diff;
};

/**
 * Format time difference as readable string
 */
export const formatTimeDifference = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (mins === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${mins}m`;
};
