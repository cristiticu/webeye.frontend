import authAndRefetchBaseQuery from '@/auth/utils/authAndRefetchBaseQuery';
import { BACKEND_BASE_URL } from '@/config';
import { createApi } from '@reduxjs/toolkit/query/react';
import { UpdateUserParams, User } from './types';

const USER_DATA_REFETCH = 60 * 60 * 2;
const USER_DATA_BASE_URL = `${BACKEND_BASE_URL}/user`;

export const userApi = createApi({
    reducerPath: 'api.user',
    keepUnusedDataFor: USER_DATA_REFETCH,

    tagTypes: ['User'],

    baseQuery: authAndRefetchBaseQuery({ baseUrl: USER_DATA_BASE_URL }),

    endpoints: (builder) => ({
        fetchUser: builder.query<User, void>({
            query: () => {
                return {
                    method: 'GET',
                    url: '',
                };
            },

            providesTags: (_result, _error, _arg, _meta) => [{ type: 'User', id: '*' }],
        }),

        updateUser: builder.mutation<User, UpdateUserParams>({
            query: (args) => {
                return {
                    method: 'PATCH',
                    url: '',
                    body: args,
                };
            },

            invalidatesTags: (result, error, _args) => {
                if (error) {
                    return [];
                }

                return [{ type: 'User', id: '*' }];
            },
        }),

        deleteUser: builder.mutation<void, void>({
            query: () => {
                return {
                    method: 'DELETE',
                    url: '',
                };
            },
        }),
    }),
});

export const { useFetchUserQuery, useUpdateUserMutation, useDeleteUserMutation } = userApi;
