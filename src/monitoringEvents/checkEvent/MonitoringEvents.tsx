import { Box, Skeleton } from '@chakra-ui/react';
import EventsTable from './EventsTable';
import { useFetchEventsQuery } from '../service';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { usePreservedNavigate } from '@/shared/hooks/usePreservedNavigate';
import { useState } from 'react';

type Props = {
    webpageUrl?: string;
};

export default function MonitoringEvents({ webpageUrl }: Props) {
    const navigate = usePreservedNavigate();

    const [prevKeysStack, setPrevKeysStack] = useState<(string | null)[]>([]);
    const [lastEvaluatedKey, setLastEvaluatedKey] = useState<string | null>(null);

    const { data: monitoringEvents, isLoading: isLoadingEvents } = useFetchEventsQuery(
        webpageUrl ? { url: webpageUrl, last_evaluated_key: lastEvaluatedKey } : skipToken
    );

    const handleNextClick = () => {
        if (monitoringEvents?.meta?.last_evaluated_key) {
            setPrevKeysStack((stack) => [...stack, lastEvaluatedKey]);
            setLastEvaluatedKey(monitoringEvents.meta.last_evaluated_key);
        }
    };

    const handlePreviousClick = () => {
        if (prevKeysStack.length !== 0) {
            const newStack = [...prevKeysStack];
            const prevKey = newStack.pop() || null;

            setLastEvaluatedKey(prevKey);
            setPrevKeysStack(newStack);
        }
    };

    const handleEventClick = (region: string, createdAt: string) => {
        navigate(`/event/${region}/${encodeURIComponent(createdAt)}`);
    };

    const nextDisabled = !monitoringEvents?.meta?.last_evaluated_key;
    const previousDisabled = prevKeysStack.length === 0;

    return (
        <Box marginBottom="36px">
            <Skeleton
                loading={isLoadingEvents}
                borderRadius="md"
                width="100%"
            >
                <EventsTable
                    events={monitoringEvents?.data || []}
                    onEventClick={handleEventClick}
                    onNextClick={handleNextClick}
                    onPreviousClick={handlePreviousClick}
                    nextDisabled={nextDisabled}
                    previousDisabled={previousDisabled}
                />
            </Skeleton>
        </Box>
    );
}
