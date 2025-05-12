import { Button, createListCollection, Flex, IconButton, Input, Portal, Select, Separator, Stack, Text } from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { formatPrettyTimestamp } from '@/shared/utils';

const availableFrequencies = {
    '1m': 'minute',
    '2m': '2 minutes',
    '5m': '5 minutes',
    '10m': '10 minutes',
    '15m': '15 minutes',
    '30m': 'half an hour',
};

const frequencyList = createListCollection({
    items: Object.keys(availableFrequencies).map((key) => ({
        label: availableFrequencies[key],
        value: key,
    })),
});

const availableRegions = {
    america: 'Americas',
    europe: 'Europe',
    asia_pacific: 'Asia Pacific',
};

const regionsList = createListCollection({
    items: Object.keys(availableRegions).map((key) => ({
        label: availableRegions[key],
        value: key,
    })),
});

const availableDayFilters = {
    all: 'Everyday',
    weekdays: 'Only weekdays',
    weekend: 'Only on the weekend',
};

const dayFiltersList = createListCollection({
    items: Object.keys(availableDayFilters).map((key) => ({
        label: availableDayFilters[key],
        value: key,
    })),
});

const responseStatusList = createListCollection({
    items: [
        { label: '1xx', value: '1xx' },
        { label: '2xx', value: '2xx' },
        { label: '3xx', value: '3xx' },
        { label: '4xx', value: '4xx' },
        { label: '5xx', value: '5xx' },
    ],
});

const initialState = {
    interval: '',
    days: '',
    zones: [],
    checkString: null,
    timeout: 30000,
    acceptedStatus: [],
};

type Props = {
    index: number;
    guid: string;
    createdAt: string;
    interval: string;
    days: string;
    zones: string[];
    checkString: string;
    timeout: number;
    acceptedStatus: string[];
    _isEditing?: boolean;
};

export default function ScheduledCheckInformation({ guid, index, createdAt, interval, days, zones, checkString, timeout, acceptedStatus, _isEditing }: Props) {
    const [isEditing, setIsEditing] = useState<boolean>(_isEditing);
    const [editedCheck, setEditedCheck] = useState(initialState);

    const handleCancelButtonClick = () => {
        setIsEditing(false);
        setEditedCheck(initialState);
    };

    const handleEditButtonClick = () => {
        setIsEditing(true);
        setEditedCheck({
            interval,
            days,
            zones,
            checkString,
            timeout: timeout / 1000,
            acceptedStatus,
        });
    };

    const handleSaveButtonClick = () => {
        setIsEditing(false);
        toaster.create({
            type: 'success',
            title: 'Changes successfully saved!',
        });
        console.log(editedCheck);
    };

    useEffect(() => {
        if (isEditing) {
            setEditedCheck({
                interval,
                days,
                zones,
                checkString,
                timeout: timeout / 1000,
                acceptedStatus,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Flex
            borderWidth="1px"
            borderRadius="xl"
            p={4}
            flexDirection="column"
        >
            <Flex
                justify="space-between"
                mb={2}
            >
                <Text fontWeight="bold">#{index + 1} Page Speed & Downtime check</Text>
                <Flex
                    alignItems="center"
                    gap="12px"
                >
                    <Text
                        fontSize="sm"
                        color="gray.500"
                    >
                        {formatPrettyTimestamp(createdAt)}
                    </Text>
                    <IconButton
                        colorPalette="red"
                        variant="outline"
                        aria-label="delete-check"
                    >
                        <AiOutlineDelete />
                    </IconButton>
                </Flex>
            </Flex>

            <Separator mb={2} />

            <Stack>
                <Flex>
                    <Text
                        w="200px"
                        fontWeight="medium"
                    >
                        Frequency:
                    </Text>

                    {isEditing ? (
                        <Select.Root
                            collection={frequencyList}
                            value={[editedCheck.interval]}
                            onValueChange={(event) => setEditedCheck((_) => ({ ..._, interval: event.value[0] }))}
                        >
                            <Select.HiddenSelect />
                            <Select.Control flexGrow={1}>
                                <Select.Trigger>
                                    <Select.ValueText placeholder="Select frequency" />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content>
                                        {frequencyList.items.map((frequency) => (
                                            <Select.Item
                                                item={frequency}
                                                key={frequency.value}
                                            >
                                                {frequency.label}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>
                    ) : (
                        <Text>Every {availableFrequencies[interval]}</Text>
                    )}
                </Flex>
                <Flex>
                    <Text
                        w="200px"
                        fontWeight="medium"
                    >
                        Active:
                    </Text>
                    {isEditing ? (
                        <Select.Root
                            collection={dayFiltersList}
                            value={[editedCheck.days]}
                            onValueChange={(event) => setEditedCheck((_) => ({ ..._, days: event.value[0] }))}
                        >
                            <Select.HiddenSelect />
                            <Select.Control flexGrow={1}>
                                <Select.Trigger>
                                    <Select.ValueText placeholder="Select when to run" />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content>
                                        {dayFiltersList.items.map((dayFilter) => (
                                            <Select.Item
                                                item={dayFilter}
                                                key={dayFilter.value}
                                            >
                                                {dayFilter.label}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>
                    ) : (
                        <Text>{availableDayFilters[days]}</Text>
                    )}
                </Flex>
                <Flex>
                    <Text
                        w="200px"
                        fontWeight="medium"
                    >
                        Regions:
                    </Text>
                    {isEditing ? (
                        <Select.Root
                            multiple
                            collection={regionsList}
                            value={editedCheck.zones}
                            onValueChange={(event) => setEditedCheck((_) => ({ ..._, zones: event.value }))}
                        >
                            <Select.HiddenSelect />
                            <Select.Control flexGrow={1}>
                                <Select.Trigger>
                                    <Select.ValueText placeholder="Select monitoring regions" />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content>
                                        {regionsList.items.map((region) => (
                                            <Select.Item
                                                item={region}
                                                key={region.value}
                                            >
                                                {region.label}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>
                    ) : (
                        <Text>{zones.map((zone, index, array) => `${availableRegions[zone]}${index === array.length - 1 ? '' : ', '}`)}</Text>
                    )}
                </Flex>
                <Flex>
                    <Text
                        w="200px"
                        fontWeight="medium"
                    >
                        Check string:
                    </Text>
                    {isEditing ? (
                        <Input
                            name="checkString"
                            value={editedCheck.checkString || ''}
                            onChange={(e) => setEditedCheck((_) => ({ ..._, checkString: e.target.value }))}
                        />
                    ) : (
                        <Text>{checkString || 'None'}</Text>
                    )}
                </Flex>
                <Flex>
                    <Text
                        w="200px"
                        fontWeight="medium"
                    >
                        Timeout:
                    </Text>
                    {isEditing ? (
                        <Input
                            name="timeout"
                            type="number"
                            value={editedCheck.timeout}
                            onChange={(e) => setEditedCheck((_) => ({ ..._, timeout: parseInt(e.target.value) }))}
                        />
                    ) : (
                        <Text>{timeout / 1000} seconds</Text>
                    )}
                </Flex>
                <Flex>
                    <Text
                        w="200px"
                        fontWeight="medium"
                    >
                        Accepted status:
                    </Text>
                    {isEditing ? (
                        <Select.Root
                            multiple
                            collection={responseStatusList}
                            value={editedCheck.acceptedStatus}
                            onValueChange={(event) => setEditedCheck((_) => ({ ..._, acceptedStatus: event.value }))}
                        >
                            <Select.HiddenSelect />
                            <Select.Control flexGrow={1}>
                                <Select.Trigger>
                                    <Select.ValueText placeholder="Select valid response statuses" />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content>
                                        {responseStatusList.items.map((status) => (
                                            <Select.Item
                                                item={status}
                                                key={status.value}
                                            >
                                                {status.label}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>
                    ) : (
                        <Text>{acceptedStatus.map((status, index, array) => `${status}${index === array.length - 1 ? '' : ', '}`)}</Text>
                    )}
                </Flex>
            </Stack>
            <Flex
                justify="flex-end"
                gap={2}
                mt={3}
            >
                {isEditing ? (
                    <>
                        <Button
                            size="lg"
                            colorPalette="red"
                            onClick={handleCancelButtonClick}
                            variant="outline"
                        >
                            Cancel
                        </Button>
                        <Button
                            size="lg"
                            colorPalette="green"
                            onClick={handleSaveButtonClick}
                        >
                            Save
                        </Button>
                    </>
                ) : (
                    <Button
                        size="lg"
                        variant="surface"
                        onClick={handleEditButtonClick}
                    >
                        Edit
                    </Button>
                )}
            </Flex>
        </Flex>
    );
}
