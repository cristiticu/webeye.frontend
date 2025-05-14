import { DateTime } from 'luxon';
import { useFetchEventsQuery } from '../service';
import { useMemo } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';

type Props = {
    url?: string;
    startAt: DateTime;
    endAt: DateTime;
    maxEvents?: number;
};

export default function useGetMonitoringEvents({ url, startAt, endAt, maxEvents }: Props) {
    const formattedStartAt = endAt.minus({ hours: 2 }).set({ minute: 0, second: 0, millisecond: 0 }).toUTC().toISO();
    const formattedEndAt = endAt.plus({ hours: 2 }).set({ minute: 0, second: 0, millisecond: 0 }).toUTC().toISO();

    const { data: eventsForDay, isLoading: isLoadingEvents } = useFetchEventsQuery(
        url ? { url, start_at: formattedStartAt, end_at: formattedEndAt } : skipToken
    );

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
