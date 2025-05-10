import { DateTime } from 'luxon';
import { useFetchDowntimesQuery } from '../service';

type Props = {
    url: string;
    endAt: DateTime;
};

export default function useGetDowntimes({ url, endAt }: Props) {
    const formattedStartAt = endAt.startOf('day').toISO();
    const formattedEndAt = endAt.endOf('day').toISO();

    const { data: downtimesForDay, isLoading: isLoadingDowntimes } = useFetchDowntimesQuery({ url, start_at: formattedStartAt, end_at: formattedEndAt });

    return {
        downtimes: downtimesForDay,
        isLoadingDowntimes,
    };
}
