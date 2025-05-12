import { AVAILABLE_DAY_FILTERS, DAY_FILTERS_LIST, FREQUENCY_LIST, REGIONS_LIST, RESPONSE_STATUS_LIST } from '@/config';
import { Button, Field, Flex, Input, Portal, Select, Stack } from '@chakra-ui/react';
import { useState } from 'react';

const initialValidationErrors = {
    regions: [],
    days: [],
    frequency: [],
    acceptedStatus: [],
    timeout: [],
};

type Props = {
    initialFrequency?: string;
    initialDays?: string;
    initialRegions?: string[];
    initialCheckString?: string;
    initialTimeout?: number;
    initialAcceptedStatus?: string[];
    submitText: string;
    loading?: boolean;
    onSubmit: (frequency: string, days: string, regions: string[], checkString: string, timeout: number, acceptedStatus: string[]) => void;
    onCancel?: () => void;
};

export default function ScheduledCheckInput({
    initialFrequency,
    initialDays,
    initialRegions = [],
    initialCheckString,
    initialTimeout = 30000,
    initialAcceptedStatus = [],
    submitText,
    loading,
    onSubmit,
    onCancel,
}: Props) {
    const [scheduledCheck, setScheduledCheck] = useState({
        frequency: initialFrequency,
        days: initialDays,
        regions: initialRegions,
        checkString: initialCheckString,
        timeout: initialTimeout / 1000,
        acceptedStatus: initialAcceptedStatus,
    });

    const [validationErrors, setValidationErrors] = useState(initialValidationErrors);

    const handleRegionsChange = (regions: string[]) => {
        setScheduledCheck((_) => ({ ..._, regions }));
        setValidationErrors((_) => ({ ..._, regions: [] }));
    };

    const handleDayFilterChange = (days: string) => {
        setScheduledCheck((_) => ({ ..._, days }));
        setValidationErrors((_) => ({ ..._, days: [] }));
    };

    const handleFrequencyChange = (frequency: string) => {
        setScheduledCheck((_) => ({ ..._, frequency }));
        setValidationErrors((_) => ({ ..._, frequency: [] }));
    };

    const handleResponseStatusesChange = (acceptedStatus: string[]) => {
        setScheduledCheck((_) => ({ ..._, acceptedStatus }));
        setValidationErrors((_) => ({ ..._, acceptedStatus: [] }));
    };

    const handleTimeoutChange = (timeout: string) => {
        const parsed = Number.parseInt(timeout);

        if (Number.isNaN(parsed)) {
            return;
        }

        setScheduledCheck((_) => ({ ..._, timeout: parsed }));
        setValidationErrors((_) => ({ ..._, timeout: [] }));
    };

    const handleSubmitClick = () => {
        let hasErrors = false;

        if (scheduledCheck.regions.length === 0) {
            setValidationErrors((_) => ({ ..._, regions: ['Please select at least one region'] }));
            hasErrors = true;
        }

        if (!Object.keys(AVAILABLE_DAY_FILTERS).includes(scheduledCheck.days)) {
            setValidationErrors((_) => ({ ..._, days: ['Please select a valid filter'] }));
            hasErrors = true;
        }

        if (!scheduledCheck.frequency) {
            setValidationErrors((_) => ({ ..._, frequency: ['Please select a frequency'] }));
            hasErrors = true;
        }

        if (scheduledCheck.acceptedStatus.length === 0) {
            setValidationErrors((_) => ({ ..._, acceptedStatus: ['Please select at least one status group'] }));
            hasErrors = true;
        }

        if (scheduledCheck.timeout > 30 || scheduledCheck.timeout <= 0) {
            setValidationErrors((_) => ({ ..._, timeout: ['Please enter a timeout between 1 and 30 seconds'] }));
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        onSubmit(
            scheduledCheck.frequency,
            scheduledCheck.days,
            scheduledCheck.regions,
            scheduledCheck.checkString,
            scheduledCheck.timeout,
            scheduledCheck.acceptedStatus
        );
    };

    return (
        <Flex
            flexDirection="column"
            width="100%"
        >
            <Stack width="50%">
                <Field.Root invalid={validationErrors.frequency?.length > 0}>
                    <Field.Label fontSize="lg">Frequency:</Field.Label>
                    <Select.Root
                        marginLeft="12px"
                        collection={FREQUENCY_LIST}
                        value={[scheduledCheck.frequency]}
                        onValueChange={(event) => handleFrequencyChange(event.value[0])}
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
                                    {FREQUENCY_LIST.items.map((frequency) => (
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

                    <Field.ErrorText>{validationErrors.frequency[0]}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={validationErrors.days?.length > 0}>
                    <Field.Label fontSize="lg"> Active:</Field.Label>
                    <Select.Root
                        marginLeft="12px"
                        collection={DAY_FILTERS_LIST}
                        value={[scheduledCheck.days]}
                        onValueChange={(event) => handleDayFilterChange(event.value[0])}
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
                                    {DAY_FILTERS_LIST.items.map((dayFilter) => (
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

                    <Field.ErrorText>{validationErrors.days[0]}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={validationErrors.regions?.length > 0}>
                    <Field.Label fontSize="lg">Regions:</Field.Label>
                    <Select.Root
                        marginLeft="12px"
                        multiple
                        collection={REGIONS_LIST}
                        value={scheduledCheck.regions}
                        onValueChange={(event) => handleRegionsChange(event.value)}
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
                                    {REGIONS_LIST.items.map((region) => (
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

                    <Field.ErrorText>{validationErrors.regions[0]}</Field.ErrorText>
                </Field.Root>

                <Field.Root>
                    <Field.Label fontSize="lg">Check string:</Field.Label>
                    <Input
                        marginLeft="12px"
                        name="checkString"
                        value={scheduledCheck.checkString || ''}
                        onChange={(event) => setScheduledCheck((_) => ({ ..._, checkString: event.target.value }))}
                    />
                </Field.Root>

                <Field.Root invalid={validationErrors.timeout?.length > 0}>
                    <Field.Label fontSize="lg">Timeout:</Field.Label>
                    <Input
                        marginLeft="12px"
                        name="timeout"
                        type="number"
                        value={scheduledCheck.timeout}
                        onChange={(event) => handleTimeoutChange(event.target.value)}
                    />

                    <Field.ErrorText>{validationErrors.timeout[0]}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={validationErrors.acceptedStatus?.length > 0}>
                    <Field.Label fontSize="lg">Accepted status:</Field.Label>
                    <Select.Root
                        marginLeft="12px"
                        multiple
                        collection={RESPONSE_STATUS_LIST}
                        value={scheduledCheck.acceptedStatus}
                        onValueChange={(event) => handleResponseStatusesChange(event.value)}
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
                                    {RESPONSE_STATUS_LIST.items.map((status) => (
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

                    <Field.ErrorText>{validationErrors.acceptedStatus[0]}</Field.ErrorText>
                </Field.Root>
            </Stack>

            <Flex
                justify="flex-end"
                gap={2}
                mt={3}
            >
                {onCancel && (
                    <Button
                        size="lg"
                        colorPalette="red"
                        onClick={onCancel}
                        variant="outline"
                    >
                        Cancel
                    </Button>
                )}

                <Button
                    size="lg"
                    colorPalette="green"
                    onClick={handleSubmitClick}
                    loading={loading}
                >
                    {submitText}
                </Button>
            </Flex>
        </Flex>
    );
}
