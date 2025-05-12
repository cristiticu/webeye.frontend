import { BACKEND_BASE_URL } from '@/config';
import { createApi } from '@reduxjs/toolkit/query/react';
import { AddMonitoredWebpageParams, DeleteMonitoredWebpageParams, MonitoredWebpage } from './types';
import authAndRefetchBaseQuery from '@/auth/utils/authAndRefetchBaseQuery';

const MONITORED_WEBPAGES_REFETCH = 60 * 60 * 2;
const MONITORED_WEBPAGES_BASE_URL = `${BACKEND_BASE_URL}/monitored-webpage`;

export const monitoredWebpagesApi = createApi({
    reducerPath: 'api.monitoredWebpages',
    keepUnusedDataFor: MONITORED_WEBPAGES_REFETCH,

    baseQuery: authAndRefetchBaseQuery({ baseUrl: MONITORED_WEBPAGES_BASE_URL }),

    tagTypes: ['MonitoredWebpage'],

    endpoints: (builder) => ({
        fetchMonitoredWebpages: builder.query<MonitoredWebpage[], void>({
            query: () => {
                return {
                    method: 'GET',
                    url: '',
                };
            },

            providesTags: [{ type: 'MonitoredWebpage', id: 'LIST' }],
        }),

        addMonitoredWebpage: builder.mutation<MonitoredWebpage, AddMonitoredWebpageParams>({
            query: (args) => {
                return {
                    method: 'POST',
                    url: '',
                    body: args,
                };
            },

            invalidatesTags: (result, error, _args) => {
                if (error) {
                    return [];
                }

                return [{ type: 'MonitoredWebpage', id: 'LIST' }];
            },
        }),

        deleteMonitoredWebpage: builder.mutation<void, DeleteMonitoredWebpageParams>({
            query: (args) => {
                const { url } = args;

                return {
                    method: 'DELETE',
                    url: `?url=${encodeURIComponent(url)}`,
                };
            },

            invalidatesTags: (result, error, _args) => {
                if (error) {
                    return [];
                }

                return [{ type: 'MonitoredWebpage', id: 'LIST' }];
            },
        }),
    }),
});

export const { useFetchMonitoredWebpagesQuery, useAddMonitoredWebpageMutation, useDeleteMonitoredWebpageMutation } = monitoredWebpagesApi;
