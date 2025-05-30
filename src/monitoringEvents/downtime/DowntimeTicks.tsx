import { Tooltip } from '@/components/ui/tooltip';
import { Box, HStack, Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';

const ticks = Array.from({ length: 24 });

type Props = {
    date: DateTime;
    downtimeHours: number[];
};

export default function DowntimeTicks({ date, downtimeHours }: Props) {
    const currentHour = DateTime.now().hour;
    const isToday = date.hasSame(DateTime.now(), 'day');

    return (
        <HStack
            align="center"
            justify="center"
            alignSelf="baseline"
            gap="8px"
        >
            {ticks.map((_, index) => {
                const isDowntime = downtimeHours?.includes(index);
                const isInFuture = isToday && index > currentHour;

                return (
                    <Tooltip
                        key={index}
                        openDelay={0}
                        content={
                            <Text fontSize="xs">
                                {((index + 11) % 12) + 1} {index > 12 ? 'PM' : 'AM'}
                            </Text>
                        }
                    >
                        <Box
                            width="12px"
                            height="36px"
                            backgroundColor={isInFuture ? 'gray.300' : isDowntime ? 'red.500' : 'green.500'}
                            borderRadius="4px"
                        />
                    </Tooltip>
                );
            })}
        </HStack>
    );
}
