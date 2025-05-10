import { DateTime } from 'luxon';
import { useFetchEventsQuery } from '../service';
import { useMemo } from 'react';

type Props = {
    url: string;
    startAt: DateTime;
    endAt: DateTime;
    maxEvents?: number;
};

export default function useGetMonitoringEvents({ url, startAt, endAt, maxEvents }: Props) {
    const formattedStartAt = endAt.startOf('day').toISO();
    const formattedEndAt = endAt.endOf('day').toISO();

    const { data: eventsForDay, isLoading: isLoadingEvents } = useFetchEventsQuery({ url, start_at: formattedStartAt, end_at: formattedEndAt });

    const filteredEvents = useMemo(
        () =>
            eventsForDay
                ? eventsForDay.filter((event, index) => {
                      const eventTime = DateTime.fromISO(event.c_at);

                      return (!maxEvents || index >= eventsForDay.length - maxEvents) && eventTime >= startAt && eventTime <= endAt;
                  })
                : undefined,
        [endAt, eventsForDay, maxEvents, startAt]
    );

    return {
        events: filteredEvents,
        isLoadingEvents,
    };
}
