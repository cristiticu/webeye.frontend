import NoEventsFiller from '@/components/NoEventsFiller';
import { METRIC_THRESHOLDS } from '@/config';
import { useFetchEventsQuery } from '@/monitoringEvents/service';
import { calculateAverageMeasurement } from '@/monitoringEvents/utils';
import { Heading, HStack, Skeleton, StackSeparator, Text, VStack } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useMemo } from 'react';

function getColor(value: number, metric: string): string {
    const thresholds = METRIC_THRESHOLDS[metric];

    if (!thresholds) return 'gray.400';

    if (value <= thresholds.good) return 'green.500';
    if (value <= thresholds.medium) return 'yellow.500';
    return 'red.500';
}

type Props = {
    webpageUrl?: string;
};

export default function AverageStatisticsCard({ webpageUrl }: Props) {
    const { data: monitoringEvents, isLoading: isLoadingEvents } = useFetchEventsQuery(webpageUrl ? { url: webpageUrl } : skipToken);

    const events = useMemo(
        () => (monitoringEvents ? monitoringEvents.data.slice(0, 5).filter((event) => event.status === 'up') : undefined),
        [monitoringEvents]
    );

    const averageLoadingSpeed = useMemo(() => (events ? calculateAverageMeasurement(events, 'dom-content-loaded') : NaN), [events]);
    const averageTtfb = useMemo(() => (events ? calculateAverageMeasurement(events, 'time-to-first-byte') : NaN), [events]);
    const averageFcp = useMemo(() => (events ? calculateAverageMeasurement(events, 'first-contentful-paint') : NaN), [events]);
    const averageCls = useMemo(() => (events ? calculateAverageMeasurement(events, 'cumulative-layout-shift') : NaN), [events]);

    return (
        <VStack
            gap={2}
            separator={<StackSeparator />}
        >
            <Heading alignSelf="self-start">Avg. Measurements</Heading>
            <Skeleton
                variant="pulse"
                loading={isLoadingEvents}
            >
                {events && events.length === 0 && <NoEventsFiller />}
                {events && events.length > 0 && (
                    <VStack
                        gap={1}
                        align="stretch"
                    >
                        <HStack justify="space-between">
                            <Text
                                fontSize="sm"
                                fontWeight="medium"
                            >
                                Loading speed:
                            </Text>
                            <Text
                                fontSize="2xl"
                                fontWeight="bold"
                                color={getColor(averageLoadingSpeed, 'dom-content-loaded')}
                            >
                                {(averageLoadingSpeed / 1000).toFixed(3)} s
                            </Text>
                        </HStack>
                        <HStack justify="space-between">
                            <Text
                                fontSize="sm"
                                fontWeight="medium"
                            >
                                TTFB:
                            </Text>
                            <Text
                                fontSize="2xl"
                                fontWeight="bold"
                                color={getColor(averageTtfb, 'time-to-first-byte')}
                            >
                                {(averageTtfb / 1000).toFixed(3)} s
                            </Text>
                        </HStack>
                        <HStack justify="space-between">
                            <Text
                                fontSize="sm"
                                fontWeight="medium"
                            >
                                FCP:
                            </Text>
                            <Text
                                fontSize="2xl"
                                fontWeight="bold"
                                color={getColor(averageFcp, 'first-contentful-paint')}
                            >
                                {(averageFcp / 1000).toFixed(3)} s
                            </Text>
                        </HStack>
                        <HStack justify="space-between">
                            <Text
                                fontSize="sm"
                                fontWeight="medium"
                            >
                                CLS:
                            </Text>
                            <Text
                                fontSize="2xl"
                                fontWeight="bold"
                                color={getColor(averageCls, 'cumulative-layout-shift')}
                            >
                                {averageCls?.toFixed(3)}
                            </Text>
                        </HStack>
                    </VStack>
                )}
            </Skeleton>
        </VStack>
    );
}
