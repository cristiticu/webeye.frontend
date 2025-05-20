import useGetDowntimes from '@/monitoringEvents/hooks/useGetDowntimes';
import { Flex, Heading, Link, Skeleton, StackSeparator, VStack } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import DowntimeTicks from '@/monitoringEvents/downtime/DowntimeTicks';
import { usePreservedNavigate } from '@/shared/hooks/usePreservedNavigate';
import useGetCurrentDowntime from '@/monitoringEvents/hooks/useGetCurrentDowntime';

const now = DateTime.now();

type Props = {
    webpageUrl?: string;
};

export default function UptimeCard({ webpageUrl }: Props) {
    const navigate = usePreservedNavigate();

    const { downtimeHours, isLoadingDowntimes } = useGetDowntimes({ url: webpageUrl, endAt: now });
    const { currentDowntimeHours, isLoadingCurrentDowntime } = useGetCurrentDowntime({ webpageUrl, baseDateTime: now });

    const allDowntimeHours = useMemo(
        () => [...currentDowntimeHours, ...downtimeHours].filter((hour, index, array) => array.indexOf(hour) === index),
        [currentDowntimeHours, downtimeHours]
    );

    const handleSeeAllClick = () => {
        navigate('/downtimes');
    };

    const downtimePercent = (allDowntimeHours.length / now.hour) * 100;

    const isLoading = isLoadingDowntimes || isLoadingCurrentDowntime;

    return (
        <VStack
            gap={2}
            separator={<StackSeparator />}
            alignItems="baseline"
        >
            <Flex
                justifyContent="space-between"
                width="100%"
            >
                <Heading alignSelf="self-start">Today&apos;s Uptime: {(100 - downtimePercent).toFixed(2)}%</Heading>
                <Link onClick={handleSeeAllClick}>See All</Link>
            </Flex>

            <Skeleton
                variant="pulse"
                loading={isLoading}
            >
                <DowntimeTicks
                    date={now}
                    downtimeHours={allDowntimeHours}
                />
            </Skeleton>
        </VStack>
    );
}
