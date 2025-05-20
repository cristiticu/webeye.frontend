import { DateTime } from 'luxon';
import { useFetchDowntimesQuery } from '../service';
import { skipToken } from '@reduxjs/toolkit/query';
import { getStartOfDayUTC, getEndOfDayUTC } from '../utils';
import { useMemo } from 'react';
import { REGIONS_STATUS_LONG_POLLING_MS } from '@/config';

type Props = {
    url?: string;
    endAt: DateTime;
};

export default function useGetDowntimes({ url, endAt }: Props) {
    const formattedStartAt = getStartOfDayUTC(endAt);
    const formattedEndAt = getEndOfDayUTC(endAt);

    const { data: downtimesForDay, isLoading: isLoadingDowntimes } = useFetchDowntimesQuery(
        url ? { url, start_at: formattedStartAt, end_at: formattedEndAt } : skipToken,
        {
            pollingInterval: REGIONS_STATUS_LONG_POLLING_MS,
        }
    );

    const downtimeHours = useMemo(
        () =>
            downtimesForDay
                ? downtimesForDay
                      .map((downtime) => {
                          const startHour = DateTime.fromISO(downtime.s_at).hour;
                          const endHour = DateTime.fromISO(downtime.r_at).hour;

                          return Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);
                      })
                      .flat()
                : [],
        [downtimesForDay]
    );

    return {
        downtimes: downtimesForDay,
        downtimeHours,
        isLoadingDowntimes,
    };
}
