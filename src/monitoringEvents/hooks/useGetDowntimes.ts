import { DateTime } from 'luxon';
import { useFetchDowntimesQuery } from '../service';
import { skipToken } from '@reduxjs/toolkit/query';
import { getStartOfDayUTC, getEndOfDayUTC } from '../utils';

type Props = {
    url?: string;
    endAt: DateTime;
};

export default function useGetDowntimes({ url, endAt }: Props) {
    const formattedStartAt = getStartOfDayUTC(endAt);
    const formattedEndAt = getEndOfDayUTC(endAt);

    const { data: downtimesForDay, isLoading: isLoadingDowntimes } = useFetchDowntimesQuery(
        url ? { url, start_at: formattedStartAt, end_at: formattedEndAt } : skipToken
    );

    return {
        downtimes: downtimesForDay,
        isLoadingDowntimes,
    };
}
