import useGetDowntimes from '@/monitoringEvents/hooks/useGetDowntimes';
import { Box, Flex, Heading, HStack, Link, Skeleton, StackSeparator, VStack } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { Link as RouterLink } from 'react-router-dom';
import { useMemo } from 'react';

const now = DateTime.now().toUTC();
const currentHour = now.toLocal().hour;

const ticks = Array.from({ length: 24 });

type Props = {
    webpageUrl?: string;
};

export default function UptimeCard({ webpageUrl }: Props) {
    const { downtimes, isLoadingDowntimes } = useGetDowntimes({ url: webpageUrl, endAt: now });

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
                : undefined,
        [downtimes]
    );

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
                <Heading alignSelf="self-start">Uptime (last 24 hours)</Heading>
                <Link asChild>
                    <RouterLink to="/downtime">See All</RouterLink>
                </Link>
            </Flex>

            <Skeleton
                variant="pulse"
                loading={isLoadingDowntimes}
            >
                <HStack
                    align="center"
                    justify="center"
                    alignSelf="baseline"
                    gap="8px"
                >
                    {ticks.map((_, index) => {
                        const isDowntime = downtimeHours?.includes(index);
                        const isInFuture = index > currentHour;

                        return (
                            <Box
                                key={index}
                                width="12px"
                                height="36px"
                                backgroundColor={isDowntime ? 'red.500' : isInFuture ? 'gray.300' : 'green.500'}
                                borderRadius="4px"
                            />
                        );
                    })}
                </HStack>
            </Skeleton>
        </VStack>
    );
}
