import useGetDowntimes from '@/monitoringEvents/hooks/useGetDowntimes';
import { Flex, Heading, Link, Skeleton, StackSeparator, VStack } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { Link as RouterLink } from 'react-router-dom';
import { useMemo } from 'react';
import { useFetchGeneralContextQuery } from '@/monitoringEvents/service';
import { skipToken } from '@reduxjs/toolkit/query/react';
import DowntimeTicks from '@/monitoringEvents/DowntimeTicks';

const now = DateTime.now();

type Props = {
    webpageUrl?: string;
};

export default function UptimeCard({ webpageUrl }: Props) {
    const { downtimes, isLoadingDowntimes } = useGetDowntimes({ url: webpageUrl, endAt: now });
    const { data: generalContext, isLoading: isLoadingGeneralContext } = useFetchGeneralContextQuery(webpageUrl ? { url: webpageUrl } : skipToken);

    const currentDowntimeHours = useMemo(() => {
        if (!generalContext?.downtime_s_at) {
            return [];
        }

        const start = DateTime.fromISO(generalContext.downtime_s_at);
        let startHour = start.hour;

        if (!now.hasSame(start, 'day')) {
            startHour = 0;
        }

        return Array.from({ length: 24 - startHour }, (_, i) => startHour + i);
    }, [generalContext]);

    const downtimeHours = useMemo(
        () =>
            downtimes
                ? downtimes
                      .map((downtime) => {
                          const startHour = DateTime.fromISO(downtime.s_at).hour;
                          const endHour = DateTime.fromISO(downtime.r_at).hour;

                          return Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);
                      })
                      .flat()
                : [],
        [downtimes]
    );

    const allDowntimeHours = [...currentDowntimeHours, ...downtimeHours];
    const downtimePercent = allDowntimeHours.length / (now.hour + 1);

    const isLoading = isLoadingDowntimes || isLoadingGeneralContext;

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
                <Heading alignSelf="self-start">Today&apos;s Uptime: {(100 - downtimePercent).toFixed(0)}%</Heading>
                <Link asChild>
                    <RouterLink to="/downtime">See All</RouterLink>
                </Link>
            </Flex>

            <Skeleton
                variant="pulse"
                loading={isLoading}
            >
                <DowntimeTicks downtimeHours={allDowntimeHours} />
            </Skeleton>
        </VStack>
    );
}
