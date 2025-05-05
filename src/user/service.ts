import authAndRefetchBaseQuery from '@/auth/utils/authAndRefetchBaseQuery';
import { BACKEND_BASE_URL } from '@/config';
import { createApi } from '@reduxjs/toolkit/query/react';
import { FetchUserParams, User } from './types';

const USER_DATA_REFETCH = 60 * 60 * 2;
const USER_DATA_BASE_URL = `${BACKEND_BASE_URL}/user`;

export const userApi = createApi({
    reducerPath: 'api.user',
    keepUnusedDataFor: USER_DATA_REFETCH,

    baseQuery: authAndRefetchBaseQuery({ baseUrl: USER_DATA_BASE_URL }),

    endpoints: (builder) => ({
        fetchUser: builder.query<User, FetchUserParams>({
            query: (args) => {
                const { guid } = args;

                return {
                    method: 'GET',
                    url: `/${guid}`,
                };
            },
        }),
    }),
});

export const { useFetchUserQuery } = userApi;
