import { Box, Button, Heading, HStack, StackSeparator, Table, VStack } from '@chakra-ui/react';
import { MonitoringEvent } from './types';
import { formatDetailedDayTimestamp } from '@/shared/utils';
import { Tooltip } from '@/components/ui/tooltip';
import { REGION_DATA } from '@/config';
import { CountryFlag } from '@/components/CountryFlag';

type Props = {
    events: MonitoringEvent[];
    nextDisabled?: boolean;
    previousDisabled?: boolean;
    onEventClick: (region: string, createdAt: string) => void;
    onPreviousClick: () => void;
    onNextClick: () => void;
};

export default function EventsTable({ events, nextDisabled, previousDisabled, onEventClick, onPreviousClick, onNextClick }: Props) {
    return (
        <VStack
            gap={2}
            separator={<StackSeparator />}
            alignItems="baseline"
        >
            <Heading>Monitoring Events</Heading>

            <Table.Root
                variant="line"
                size="sm"
            >
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Time</Table.ColumnHeader>
                        <Table.ColumnHeader>Region</Table.ColumnHeader>
                        <Table.ColumnHeader>Status</Table.ColumnHeader>
                        <Table.ColumnHeader>Error</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {events.map((item) => (
                        <Tooltip
                            key={item.c_at}
                            positioning={{ placement: 'top' }}
                            content={item.status === 'up' ? 'Click to view' : 'No data'}
                        >
                            <Table.Row
                                onClick={item.status === 'up' ? () => onEventClick(item.region, item.c_at) : undefined}
                                _hover={item.status === 'up' ? { background: 'gray.200 !important', cursor: 'pointer' } : undefined}
                                transition="background-color 0.2s"
                            >
                                <Table.Cell
                                    color={item.status === 'up' ? 'blue.500' : 'inherit'}
                                    _hover={item.status === 'up' ? { textDecoration: 'underline' } : undefined}
                                >
                                    {formatDetailedDayTimestamp(item.c_at)}
                                </Table.Cell>
                                <Table.Cell>
                                    <HStack>
                                        <CountryFlag
                                            countryCode={REGION_DATA[item.region].countryCode}
                                            title={REGION_DATA[item.region].title}
                                        />
                                        {REGION_DATA[item.region].name}
                                    </HStack>
                                </Table.Cell>
                                <Table.Cell>
                                    <Box
                                        w="10px"
                                        h="10px"
                                        borderRadius="full"
                                        bg={item.status === 'up' ? 'green.400' : 'red.400'}
                                    />
                                </Table.Cell>
                                <Table.Cell>{item.error}</Table.Cell>
                            </Table.Row>
                        </Tooltip>
                    ))}
                </Table.Body>
            </Table.Root>

            <HStack pt={4}>
                <Button
                    onClick={onPreviousClick}
                    size="sm"
                    variant="outline"
                    disabled={previousDisabled}
                >
                    Previous
                </Button>
                <Button
                    onClick={onNextClick}
                    size="sm"
                    variant="outline"
                    disabled={nextDisabled}
                >
                    Next
                </Button>
            </HStack>
        </VStack>
    );
}
