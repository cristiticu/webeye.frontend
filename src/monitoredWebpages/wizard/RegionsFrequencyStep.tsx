import { Flex, Button, Fieldset, CheckboxGroup, Checkbox, For, RadioGroup, VStack, Select, Portal, createListCollection, HStack, Text } from '@chakra-ui/react';
import { RefObject, useMemo, useState } from 'react';

const initialValidationErrors = {
    regions: [],
    dayFilter: [],
    frequency: [],
};

const availableRegions = {
    america: 'Americas',
    europe: 'Europe',
    asia_pacific: 'Asia Pacific',
};

const availableFrequencies = createListCollection({
    items: [
        { label: 'minute', value: '1m' },
        { label: '2 minutes', value: '2m' },
        { label: '5 minutes', value: '5m' },
        { label: '10 minutes', value: '10m' },
        { label: '15 minutes', value: '15m' },
        { label: 'half an hour', value: '30m' },
    ],
});

const availableDayFilters = {
    all: 'Everyday',
    weekdays: 'Only weekdays',
    weekend: 'Only on the weekend',
};

type Props = {
    frequency: string;
    dayFilter: string;
    regions: string[];
    contentRef?: RefObject<HTMLDivElement>;
    onFrequencyChange: (_: string) => void;
    onDayFilterChange: (_: string) => void;
    onRegionsChange: (_: string[]) => void;
    onStepFinish: () => void;
    onStepBack: () => void;
};

export default function RegionsFrequencyStep({
    frequency,
    dayFilter,
    regions,
    contentRef,
    onFrequencyChange,
    onDayFilterChange,
    onRegionsChange,
    onStepBack,
    onStepFinish,
}: Props) {
    const [validationErrors, setValidationErrors] = useState(initialValidationErrors);

    const handleRegionsChange = (regions: string[]) => {
        onRegionsChange(regions);
        setValidationErrors((_) => ({ ..._, regions: [] }));
    };

    const handleDayFilterChange = (dayFilter: string) => {
        onDayFilterChange(dayFilter);
        setValidationErrors((_) => ({ ..._, dayFilter: [] }));
    };

    const handleFrequencyChange = (frequency: string) => {
        onFrequencyChange(frequency);
        setValidationErrors((_) => ({ ..._, frequency: [] }));
    };

    const handleNextButtonClick = () => {
        let hasErrors = false;

        if (regions.length === 0) {
            setValidationErrors((_) => ({ ..._, regions: ['Please select at least one region'] }));
            hasErrors = true;
        }

        if (!Object.keys(availableDayFilters).includes(dayFilter)) {
            setValidationErrors((_) => ({ ..._, dayFilter: ['Please select a valid filter'] }));
            hasErrors = true;
        }

        if (!frequency) {
            setValidationErrors((_) => ({ ..._, frequency: ['Please select a frequency'] }));
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        onStepFinish();
    };

    const regionKeys = useMemo(() => Object.keys(availableRegions), []);
    const dayFilterKeys = useMemo(() => Object.keys(availableDayFilters), []);

    return (
        <Flex
            marginTop={8}
            flexDirection="column"
            gap={8}
        >
            <Fieldset.Root invalid={validationErrors.regions?.length > 0}>
                <CheckboxGroup
                    value={regions}
                    name="regions"
                    onValueChange={handleRegionsChange}
                >
                    <Fieldset.Legend
                        fontSize="sm"
                        mb="2"
                    >
                        Select monitoring regions (up to 3)
                    </Fieldset.Legend>
                    <Fieldset.Content>
                        <For each={regionKeys}>
                            {(region) => (
                                <Checkbox.Root
                                    key={region}
                                    value={region}
                                >
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control />
                                    <Checkbox.Label>{availableRegions[region]}</Checkbox.Label>
                                </Checkbox.Root>
                            )}
                        </For>
                    </Fieldset.Content>
                </CheckboxGroup>
                <Fieldset.ErrorText>{validationErrors.regions[0]}</Fieldset.ErrorText>
            </Fieldset.Root>

            <Fieldset.Root invalid={validationErrors.dayFilter?.length > 0}>
                <Fieldset.Legend
                    fontSize="sm"
                    mb="2"
                >
                    When to monitor?
                </Fieldset.Legend>
                <RadioGroup.Root
                    value={dayFilter}
                    onValueChange={(event) => handleDayFilterChange(event.value)}
                >
                    <VStack
                        alignItems="baseline"
                        gap="4"
                    >
                        <For each={dayFilterKeys}>
                            {(filter) => (
                                <RadioGroup.Item
                                    key={filter}
                                    value={filter}
                                >
                                    <RadioGroup.ItemHiddenInput />
                                    <RadioGroup.ItemIndicator />
                                    <RadioGroup.ItemText>{availableDayFilters[filter]}</RadioGroup.ItemText>
                                </RadioGroup.Item>
                            )}
                        </For>
                    </VStack>
                </RadioGroup.Root>
                <Fieldset.ErrorText>{validationErrors.dayFilter[0]}</Fieldset.ErrorText>
            </Fieldset.Root>

            <Fieldset.Root invalid={validationErrors.frequency?.length > 0}>
                <Select.Root
                    collection={availableFrequencies}
                    value={[frequency]}
                    onValueChange={(event) => handleFrequencyChange(event.value[0])}
                >
                    <Select.HiddenSelect />
                    <Select.Label>How often to run the checks?</Select.Label>
                    <HStack>
                        <Text>Every</Text>
                        <Select.Control flexGrow={1}>
                            <Select.Trigger>
                                <Select.ValueText placeholder="Select frequency" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                                <Select.Indicator />
                            </Select.IndicatorGroup>
                        </Select.Control>
                    </HStack>

                    <Portal container={contentRef}>
                        <Select.Positioner>
                            <Select.Content>
                                {availableFrequencies.items.map((frequency) => (
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
                <Fieldset.ErrorText>{validationErrors.frequency[0]}</Fieldset.ErrorText>
            </Fieldset.Root>

            <Flex>
                <Button
                    width={28}
                    onClick={onStepBack}
                    variant="outline"
                    colorPalette="gray"
                >
                    Back
                </Button>
                <Button
                    width={28}
                    marginLeft="auto"
                    onClick={handleNextButtonClick}
                >
                    Next
                </Button>
            </Flex>
        </Flex>
    );
}
