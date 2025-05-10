import NoEventsFiller from '@/components/NoEventsFiller';
import useGetMonitoringEvents from '@/monitoringEvents/hooks/useGetMonitoringEvents';
import { Heading, Skeleton, StackSeparator, Text, VStack } from '@chakra-ui/react';
import { DateTime } from 'luxon';

const now = DateTime.now().toUTC();
const startAt = now.minus({ hours: 1 });

type Props = {
    webpageUrl?: string;
};

export default function AverageLoadingSpeedCard({ webpageUrl }: Props) {
    const { events, isLoadingEvents } = useGetMonitoringEvents({ url: webpageUrl, startAt, endAt: now.endOf('day'), maxEvents: 5 });

    const averageLoadingSpeed =
        events && events.length > 0
            ? events.reduce((acc, event) => acc + Number.parseInt(event.results['dom-content-loaded']), 0) / events.length / 1000
            : undefined;

    return (
        <VStack
            gap={2}
            separator={<StackSeparator />}
        >
            <Heading alignSelf="self-start">Avg. Loading Speed</Heading>
            <Skeleton
                variant="pulse"
                loading={isLoadingEvents}
            >
                {events && events.length === 0 && <NoEventsFiller />}
                {events && events.length > 0 && (
                    <Text
                        fontSize="2xl"
                        fontWeight="bold"
                    >
                        {averageLoadingSpeed.toFixed(3)} s
                    </Text>
                )}
            </Skeleton>
        </VStack>
    );
}
