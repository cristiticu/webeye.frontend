import { skipToken } from '@reduxjs/toolkit/query';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { useFetchGeneralContextQuery } from '../service';
import { REGIONS_STATUS_LONG_POLLING_MS } from '@/config';

type Params = {
    webpageUrl?: string;
    baseDateTime: DateTime;
};

export default function useGetCurrentDowntime({ webpageUrl, baseDateTime }: Params) {
    const { data: generalContext, isLoading: isLoadingGeneralContext } = useFetchGeneralContextQuery(webpageUrl ? { url: webpageUrl } : skipToken, {
        pollingInterval: REGIONS_STATUS_LONG_POLLING_MS,
    });

    const currentDowntimeHours = useMemo(() => {
        if (!generalContext?.downtime_s_at) {
            return [];
        }

        const start = DateTime.fromISO(generalContext.downtime_s_at);
        let startHour = start.hour;
        let baseHourLength = baseDateTime.hour + 1;

        if (!baseDateTime.hasSame(start, 'day')) {
            baseHourLength = 24;
            startHour = 0;
        }

        return Array.from({ length: baseHourLength - startHour }, (_, i) => startHour + i);
    }, [baseDateTime, generalContext]);

    return {
        generalContext,
        currentDowntimeHours,
        isLoadingCurrentDowntime: isLoadingGeneralContext,
    };
}
