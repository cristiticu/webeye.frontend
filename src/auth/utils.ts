import { getCookieJson } from '@/shared/utils';
import { jwtDecode } from 'jwt-decode';
import { TokenData } from './types';

export const loginValidationRule = {
    email: {
        email: true,
    },
    firstName: {
        length: {
            minimum: 1,
            maximum: 32,
            tooShort: '^Enter your name',
            tooLong: '^Too many characters',
        },
        format: {
            pattern: "^[a-z ,.'-]+$",
            flags: 'i',
            message: '^Contains invalid characters',
        },
    },
    lastName: {
        length: {
            maximum: 32,
            tooLong: '^Too many characters',
        },
        format: {
            pattern: "^[a-z ,.'-]+$",
            flags: 'i',
            message: '^Contains invalid characters',
        },
    },
    password: {
        length: {
            minimum: 4,
            message: '^Password length too small',
        },
    },
};

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
