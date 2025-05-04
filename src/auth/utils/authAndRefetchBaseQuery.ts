import { BACKEND_BASE_URL } from '@/config';
import { eraseCookie } from '@/shared/cookie';
import { RootState } from '@/store';
import { BaseQueryApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { login, logout } from '../slice';
import { LoginResponse } from '../types';
import { setCookieJson } from '@/shared/utils';

type AuthBaseQueryParams = {
    baseUrl: string;
};

function authBaseQuery({ baseUrl }: AuthBaseQueryParams) {
    return fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, api) => {
            const { getState } = api;
            const state = getState() as RootState;
            const token = state.auth.accessToken;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    });
}

function refreshBaseQuery() {
    return fetchBaseQuery({
        baseUrl: `${BACKEND_BASE_URL}/auth/refresh`,
        method: 'POST',
        prepareHeaders: (headers, api) => {
            const { getState } = api;
            const state = getState() as RootState;
            const token = state.auth.refreshToken;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    });
}

type Params = {
    baseUrl: string;
};

export default function authAndRefetchBaseQuery({ baseUrl }: Params) {
    const authFetch = authBaseQuery({ baseUrl });
    const refresh = refreshBaseQuery();

    return async (args, api: BaseQueryApi, extraOptions) => {
        const response = await authFetch(args, api, extraOptions);

        if (response.error?.status === 401) {
            const { dispatch } = api;
            const refreshResponse = await refresh('', api, extraOptions);

            if (refreshResponse.error) {
                eraseCookie('webeye.tokens');
                dispatch(logout());

                return response;
            }

            const refreshData = refreshResponse.data as LoginResponse;

            dispatch(login({ accessToken: refreshData.access_token, refreshToken: refreshData.refresh_token }));
            setCookieJson('webeye.tokens', refreshData, 30);

            return await authFetch(args, api, extraOptions);
        }

        return response;
    };
}
