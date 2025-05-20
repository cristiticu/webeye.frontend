import { ChangeEvent, useMemo, useState } from 'react';
import useGetCurrentDowntime from '../hooks/useGetCurrentDowntime';
import useGetDowntimes from '../hooks/useGetDowntimes';
import { DateTime } from 'luxon';
import { Grid, GridItem, Heading, Input, Skeleton, StackSeparator, Text, VStack } from '@chakra-ui/react';
import DowntimeTicks from './DowntimeTicks';
import DowntimeTable from './DowntimeTable';
import useProcessDowntimes from '../hooks/useProcessDowntimes';

type Props = {
    webpageUrl?: string;
};

export default function Downtimes({ webpageUrl }: Props) {
    const [selectedDate, setSelectedDate] = useState<DateTime>(() => DateTime.now());

    const now = DateTime.now();
    const dayStart = useMemo(() => selectedDate.startOf('day'), [selectedDate]);
    const isToday = now.hasSame(dayStart, 'day');
    const dayEnd = useMemo(() => {
        return isToday ? now : selectedDate.endOf('day');
    }, [selectedDate, isToday, now]);

    const { downtimes, downtimeHours, isLoadingDowntimes } = useGetDowntimes({ url: webpageUrl, endAt: dayEnd });
    const { generalContext, currentDowntimeHours, isLoadingCurrentDowntime } = useGetCurrentDowntime({ webpageUrl, baseDateTime: dayEnd });

    const allDowntimeHours = useMemo(
        () => (isToday ? [...currentDowntimeHours, ...downtimeHours].filter((hour, index, array) => array.indexOf(hour) === index) : downtimeHours),
        [currentDowntimeHours, downtimeHours, isToday]
    );

    const { downtimePercentage, allDowntimeDurations, formattedDuration } = useProcessDowntimes({ downtimes, generalContext, dayStart, dayEnd });

    const isLoading = isLoadingDowntimes || (isToday && isLoadingCurrentDowntime);

    const handleDayChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            setSelectedDate(DateTime.fromISO(event.target.value));
        }
    };

    return (
        <Grid
            templateColumns="repeat(24, 1fr)"
            templateRows="repeat(4, auto)"
            gap={4}
        >
            <GridItem
                colSpan={4}
                rowSpan={1}
                border="1px solid"
                borderColor="gray.300"
                borderRadius="xl"
                p={4}
            >
                <VStack
                    justify="space-between"
                    align="center"
                >
                    <Heading alignSelf="self-start">Select a date</Heading>
                    <Input
                        type="date"
                        max={DateTime.now().toISODate()}
                        value={selectedDate.toISODate()}
                        onChange={handleDayChange}
                        maxW="200px"
                    />
                </VStack>
            </GridItem>

            <GridItem
                colSpan={12}
                rowSpan={1}
                border="1px solid"
                borderColor="gray.300"
                borderRadius="xl"
                p={4}
            >
                <VStack
                    gap={2}
                    separator={<StackSeparator />}
                    alignItems="baseline"
                >
                    <Heading alignSelf="self-start">Uptime</Heading>

                    <Skeleton
                        variant="pulse"
                        loading={isLoading}
                    >
                        <DowntimeTicks
                            date={selectedDate}
                            downtimeHours={allDowntimeHours}
                        />
                    </Skeleton>
                </VStack>
            </GridItem>

            <GridItem
                colSpan={8}
                rowSpan={1}
                border="1px solid"
                borderColor="gray.300"
                borderRadius="xl"
                p={4}
            >
                <VStack align="start">
                    <Text fontWeight="bold">{downtimePercentage.toFixed(2)}% Availability</Text>
                    <Text
                        fontSize="sm"
                        color="gray.500"
                    >
                        Downtime: {formattedDuration}
                    </Text>
                </VStack>
            </GridItem>

            <GridItem
                colSpan={24}
                rowSpan={1}
            >
                <Skeleton loading={isLoading}>
                    <DowntimeTable records={allDowntimeDurations} />
                </Skeleton>
            </GridItem>
        </Grid>
    );
}
