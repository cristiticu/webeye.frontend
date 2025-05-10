import { getCookie, setCookie } from './cookie';
import { DateTime } from 'luxon';

export function setCookieJson(name: string, value: object, days: number) {
    const json = JSON.stringify(value);
    setCookie(name, json, days);
}

export function getCookieJson(name: string) {
    const cookie = getCookie(name);

    return JSON.parse(cookie);
}

export function normalizeUrl(url: string) {
    let normalizedUrl = url.toLowerCase().trim();

    if (!url.startsWith('https://') && !url.startsWith('http://')) {
        normalizedUrl = 'https://'.concat(url);
    }

    return normalizedUrl;
}

export function formatPrettyTimestamp(timestamp: string): string {
    const dt = DateTime.fromISO(timestamp);
    const now = DateTime.local();

    if (dt.hasSame(now, 'day')) {
        return `Today at ${dt.toFormat('HH:mm')}`;
    } else if (dt.hasSame(now.minus({ days: 1 }), 'day')) {
        return `Yesterday at ${dt.toFormat('HH:mm')}`;
    } else {
        return dt.toFormat('dd LLL yyyy, HH:mm');
    }
}

export function formatDetailedTimestamp(timestamp: string): string {
    const dt = DateTime.fromISO(timestamp);

    return dt.toFormat('HH:mm:ss');
}
