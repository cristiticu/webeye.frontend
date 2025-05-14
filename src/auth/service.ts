import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_BASE_URL } from '@/config';
import { LoginResponse, LoginParams, RegisterResponse, RegisterParams, ChangePasswordResponse, ChangePasswordParams } from './types';
import { authBaseQuery } from './utils/authAndRefetchBaseQuery';

export const authApi = createApi({
    reducerPath: 'api.auth',

    keepUnusedDataFor: 3600,

    baseQuery: fetchBaseQuery({ baseUrl: BACKEND_BASE_URL }),

    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginParams>({
            query: (args) => {
                const bodyFormData = new FormData();
                bodyFormData.append('username', args.email);
                bodyFormData.append('password', args.password);

                return {
                    method: 'POST',
                    url: '/auth',
                    body: bodyFormData,
                };
            },
        }),

        register: builder.mutation<RegisterResponse, RegisterParams>({
            query: (args) => {
                return {
                    method: 'POST',
                    url: '/user',
                    body: args,
                };
            },
        }),

        changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordParams>({
            queryFn: async (args, api, extraOptions) => {
                const baseQuery = authBaseQuery({ baseUrl: BACKEND_BASE_URL });

                const response = await baseQuery(
                    {
                        url: '/auth/change-password',
                        method: 'POST',
                        body: args,
                    },
                    api,
                    extraOptions
                );

                if (response.data) {
                    return { data: response.data as ChangePasswordResponse };
                }

                return { error: response.error };
            },
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useChangePasswordMutation } = authApi;
