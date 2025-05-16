import { BACKEND_BASE_URL } from '@/config';
import { createApi } from '@reduxjs/toolkit/query/react';
import {
    CurrentStatus,
    DowntimePeriod,
    FetchDowntimesParams,
    FetchEventParams,
    FetchEventsParams,
    FetchEventsResponse,
    FetchGeneralContextParams,
    FetchRegionsStatusParams,
    GeneralContext,
    MonitoringEvent,
} from './types';
import authAndRefetchBaseQuery from '@/auth/utils/authAndRefetchBaseQuery';

const EVENTS_REFRESH = 60 * 2;
const EVENTS_BASE_URL = `${BACKEND_BASE_URL}/monitoring-event`;

export const monitoringEventsApi = createApi({
    reducerPath: 'api.monitoringEvents',
    keepUnusedDataFor: EVENTS_REFRESH,

    baseQuery: authAndRefetchBaseQuery({ baseUrl: EVENTS_BASE_URL }),

    tagTypes: ['MonitoringEvent', 'DowntimePeriod'],

    endpoints: (builder) => ({
        fetchEvents: builder.query<FetchEventsResponse, FetchEventsParams>({
            query: (args) => {
                const { url, last_evaluated_key } = args;

                return {
                    method: 'GET',
                    url: `/list?url=${encodeURIComponent(url)}${last_evaluated_key ? `&last_evaluated_key=${last_evaluated_key}` : ''}`,
                };
            },

            keepUnusedDataFor: 60 * 60 * 2,

            providesTags: (_result, _error, _args) => [
                {
                    type: 'MonitoringEvent',
                    id: 'PARTIAL-LIST',
                },
            ],
        }),

        fetchEvent: builder.query<MonitoringEvent, FetchEventParams>({
            query: (args) => {
                const { url, c_at } = args;

                return {
                    method: 'GET',
                    url: `?url=${encodeURIComponent(url)}&c_at=${encodeURIComponent(c_at)}`,
                };
            },

            keepUnusedDataFor: 60 * 60 * 8,
        }),

        fetchDowntimes: builder.query<DowntimePeriod[], FetchDowntimesParams>({
            query: (args) => {
                const { url, start_at, end_at } = args;

                return {
                    method: 'GET',
                    url: `/downtime?url=${encodeURIComponent(url)}&start_at=${encodeURIComponent(start_at)}&end_at=${encodeURIComponent(end_at)}`,
                };
            },

            providesTags: (result, error, args) => [
                {
                    type: 'DowntimePeriod',
                    id: `${args.url}#${args.end_at}`,
                },
            ],

            keepUnusedDataFor: 60 * 60 * 2,
        }),

        fetchGeneralContext: builder.query<GeneralContext, FetchGeneralContextParams>({
            query: (args) => {
                const { url } = args;

                return {
                    method: 'GET',
                    url: `/status?url=${encodeURIComponent(url)}`,
                };
            },
        }),

        fetchRegionsStatus: builder.query<CurrentStatus[], FetchRegionsStatusParams>({
            query: (args) => {
                const { url } = args;

                return {
                    method: 'GET',
                    url: `/regions-status?url=${encodeURIComponent(url)}`,
                };
            },
        }),
    }),
});

export const { useFetchDowntimesQuery, useFetchEventsQuery, useFetchGeneralContextQuery, useFetchEventQuery, useFetchRegionsStatusQuery } = monitoringEventsApi;
