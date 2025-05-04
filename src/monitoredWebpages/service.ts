import { BACKEND_BASE_URL } from '@/config';
import { createApi } from '@reduxjs/toolkit/query/react';
import { MonitoredWebpage } from './types';
import authAndRefetchBaseQuery from '@/auth/utils/authAndRefetchBaseQuery';

const MONITORED_WEBPAGES_REFETCH = 60 * 60 * 2;
const MONITORED_WEBPAGES_BASE_URL = `${BACKEND_BASE_URL}/monitored-webpage`;

export const monitoredWebpagesApi = createApi({
    reducerPath: 'monitoredWebpagesApi',
    keepUnusedDataFor: MONITORED_WEBPAGES_REFETCH,

    baseQuery: authAndRefetchBaseQuery({ baseUrl: MONITORED_WEBPAGES_BASE_URL }),

    endpoints: (builder) => ({
        fetchMonitoredWebpages: builder.query<MonitoredWebpage[], void>({
            query: () => {
                return {
                    method: 'GET',
                    url: '',
                };
            },
        }),
    }),
});

export const { useFetchMonitoredWebpagesQuery } = monitoredWebpagesApi;
