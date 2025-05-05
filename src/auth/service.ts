import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_BASE_URL } from '@/config';
import { LoginResponse, LoginParams, RegisterResponse, RegisterParams } from './types';

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
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
