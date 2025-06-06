import { BACKEND_BASE_URL } from '@/config';
import { RootState } from '@/store';
import { BaseQueryApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { login } from '../slice';
import { LoginResponse } from '../types';
import { setCookieJson } from '@/shared/utils';
import logout from './logout';
import { toaster } from '@/components/ui/toaster';

type AuthBaseQueryParams = {
    baseUrl: string;
};

export function authBaseQuery({ baseUrl }: AuthBaseQueryParams) {
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
                dispatch(logout());
                toaster.create({
                    type: 'error',
                    title: 'An authentication error has occurred.',
                });

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
