import authAndRefetchBaseQuery from '@/auth/utils/authAndRefetchBaseQuery';
import { BACKEND_BASE_URL } from '@/config';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ScheduledCheck, AddScheduledCheckParams, FetchScheduledChecksParams } from './types';

const SCHEDULED_CHECKS_REFETCH = 60 * 60 * 6;
const SCHEDULED_CHECKS_BASE_URL = `${BACKEND_BASE_URL}/task`;

export const scheduledChecksApi = createApi({
    reducerPath: 'api.scheduledChecks',
    keepUnusedDataFor: SCHEDULED_CHECKS_REFETCH,

    baseQuery: authAndRefetchBaseQuery({ baseUrl: SCHEDULED_CHECKS_BASE_URL }),

    tagTypes: ['ScheduledCheck'],

    endpoints: (builder) => ({
        fetchScheduledChecks: builder.query<ScheduledCheck[], FetchScheduledChecksParams>({
            query: (args) => {
                const { url } = args;

                return {
                    method: 'GET',
                    url: `/check?url=${encodeURIComponent(url)}`,
                };
            },

            providesTags: [{ type: 'ScheduledCheck', id: 'LIST' }],
        }),

        addScheduledCheck: builder.mutation<ScheduledCheck, AddScheduledCheckParams>({
            query: (args) => {
                return {
                    method: 'POST',
                    url: '/check',
                    body: args,
                };
            },

            invalidatesTags: (result, error, _args) => {
                if (error) {
                    return [];
                }

                return [{ type: 'ScheduledCheck', id: 'LIST' }];
            },
        }),
    }),
});

export const { useFetchScheduledChecksQuery, useAddScheduledCheckMutation } = scheduledChecksApi;
