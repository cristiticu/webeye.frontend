import { getCookie, setCookie } from './cookie';

export function setCookieJson(name: string, value: object, days: number) {
    const json = JSON.stringify(value);
    setCookie(name, json, days);
}

export function getCookieJson(name: string) {
    const cookie = getCookie(name);

    return JSON.parse(cookie);
}
