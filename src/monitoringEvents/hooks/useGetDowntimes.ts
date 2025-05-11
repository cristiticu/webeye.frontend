import { DateTime } from 'luxon';
import { useFetchDowntimesQuery } from '../service';
import { skipToken } from '@reduxjs/toolkit/query';

type Props = {
    url?: string;
    endAt: DateTime;
};

export default function useGetDowntimes({ url, endAt }: Props) {
    const formattedStartAt = endAt.startOf('day').toISO();
    const formattedEndAt = endAt.endOf('day').toISO();

    const { data: downtimesForDay, isLoading: isLoadingDowntimes } = useFetchDowntimesQuery(
        url ? { url, start_at: formattedStartAt, end_at: formattedEndAt } : skipToken
    );

    return {
        downtimes: downtimesForDay,
        isLoadingDowntimes,
    };
}
