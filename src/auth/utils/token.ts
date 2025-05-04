import { getCookieJson } from '@/shared/utils';
import { jwtDecode } from 'jwt-decode';
import { TokenData } from '../types';

export function decodeAuthJwt(jwt: string) {
    const decoded = jwtDecode<TokenData>(jwt);

    return {
        userGuid: decoded.user_guid,
    };
}

export function extractAuthStateFromCookie() {
    const cookieTokens = getCookieJson('webeye.tokens');

    if (cookieTokens) {
        return {
            accessToken: cookieTokens.access_token,
            refreshToken: cookieTokens.refresh_token,
            ...decodeAuthJwt(cookieTokens.access_token),
        };
    } else {
        return {};
    }
}
