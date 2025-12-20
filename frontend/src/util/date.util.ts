import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = Date.now();

  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";

  const daysAgo = Math.floor((now - date.getTime()) / DAY_IN_MS);

  if (daysAgo < 7) {
    return formatDistanceToNow(date, { addSuffix: true });
  }

  return format(date, "MMM d, yyyy");
};
