import type { EvanSession, ImportantDate } from '@evan/types';
import { formatImportantDate } from '@evan/utils/dates';

import type { SessionDay } from '@/types/icoodim';

const TIMEZONE = 'Europe/Brussels';

const dayKeyFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: TIMEZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const dayLabelFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: TIMEZONE,
  weekday: 'long',
  month: 'short',
  day: 'numeric',
});

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: TIMEZONE,
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

const deadlineFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: TIMEZONE,
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export function formatSessionTime(value: string): string {
  return timeFormatter.format(new Date(value));
}

export function formatSessionTimeRange(startAt: string, endAt: string): string {
  return `${formatSessionTime(startAt)}-${formatSessionTime(endAt)}`;
}

export function sessionDayKey(value: string): string {
  return dayKeyFormatter.format(new Date(value));
}

export function formatSessionDay(value: string): string {
  return dayLabelFormatter.format(new Date(value));
}

export function formatDeadline(value: string | null | undefined): string | null {
  if (!value) return null;
  return deadlineFormatter.format(new Date(value));
}

export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const startDay = new Intl.DateTimeFormat('en-GB', { timeZone: TIMEZONE, day: 'numeric' }).format(start);
  const endDay = new Intl.DateTimeFormat('en-GB', { timeZone: TIMEZONE, day: 'numeric' }).format(end);
  const month = new Intl.DateTimeFormat('en-GB', { timeZone: TIMEZONE, month: 'long' }).format(start);
  const year = new Intl.DateTimeFormat('en-GB', { timeZone: TIMEZONE, year: 'numeric' }).format(end);
  return `${month} ${startDay}-${endDay}, ${year}`;
}

export function groupSessionsByDay(sessions: EvanSession[]): SessionDay[] {
  const groups = new Map<string, SessionDay>();

  for (const session of [...sessions].sort((a, b) => a.start_at.localeCompare(b.start_at))) {
    const key = sessionDayKey(session.start_at);
    const existing = groups.get(key);
    if (existing) {
      existing.sessions.push(session);
    } else {
      groups.set(key, {
        key,
        label: formatSessionDay(session.start_at),
        sessions: [session],
      });
    }
  }

  return [...groups.values()].sort((a, b) => a.key.localeCompare(b.key));
}

export function sortImportantDates(dates: ImportantDate[]): ImportantDate[] {
  return [...dates].sort((a, b) => a.start_date.localeCompare(b.start_date));
}

export function formatImportantDateLabel(date: ImportantDate): string {
  return formatImportantDate(date, date.aoe);
}
