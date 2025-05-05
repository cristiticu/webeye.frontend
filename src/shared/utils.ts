import { getCookie, setCookie } from './cookie';

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
