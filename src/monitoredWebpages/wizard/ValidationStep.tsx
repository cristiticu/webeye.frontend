import { RESPONSE_STATUS_LIST } from '@/config';
import { Flex, Button, Fieldset, Select, Portal, Field, Input, Badge } from '@chakra-ui/react';
import { RefObject, useState } from 'react';

const initialValidationErrors = {
    responseStatuses: [],
    timeout: [],
};

type Props = {
    responseStatuses: string[];
    checkString: string;
    timeout: number;
    contentRef?: RefObject<HTMLDivElement>;
    onResponseStatusesChange: (_: string[]) => void;
    onCheckStringChange: (_: string) => void;
    onTimeoutChange: (_: number) => void;
    onStepFinish: () => void;
    onStepBack: () => void;
};

export default function ValidationStep({
    responseStatuses,
    checkString,
    timeout,
    contentRef,
    onResponseStatusesChange,
    onCheckStringChange,
    onTimeoutChange,
    onStepFinish,
    onStepBack,
}: Props) {
    const [validationErrors, setValidationErrors] = useState(initialValidationErrors);

    const handleResponseStatusesChange = (responseStatuses: string[]) => {
        onResponseStatusesChange(responseStatuses);
        setValidationErrors((_) => ({ ..._, responseStatuses: [] }));
    };

    const handleTimeoutChange = (timeout: string) => {
        const parsed = Number.parseInt(timeout);

        if (Number.isNaN(parsed)) {
            return;
        }

        onTimeoutChange(parsed);
        setValidationErrors((_) => ({ ..._, timeout: [] }));
    };

    const handleNextButtonClick = () => {
        let hasErrors = false;

        if (responseStatuses.length === 0) {
            setValidationErrors((_) => ({ ..._, responseStatuses: ['Please select at least one status group'] }));
            hasErrors = true;
        }

        if (timeout > 30 || timeout <= 0) {
            setValidationErrors((_) => ({ ..._, timeout: ['Please enter a timeout between 1 and 30 seconds'] }));
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        onStepFinish();
    };

    return (
        <Flex
            marginTop={8}
            flexDirection="column"
            gap={8}
        >
            <Fieldset.Root invalid={validationErrors.responseStatuses?.length > 0}>
                <Select.Root
                    collection={RESPONSE_STATUS_LIST}
                    value={responseStatuses}
                    onValueChange={(event) => handleResponseStatusesChange(event.value)}
                    multiple
                >
                    <Select.HiddenSelect />
                    <Select.Label>Select valid response statuses</Select.Label>
                    <Select.Control flexGrow={1}>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Select status" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>

                    <Portal container={contentRef}>
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
                <Fieldset.ErrorText>{validationErrors.responseStatuses[0]}</Fieldset.ErrorText>
            </Fieldset.Root>

            <Field.Root>
                <Field.Label>
                    Enter a check string
                    <Field.RequiredIndicator
                        fallback={
                            <Badge
                                size="xs"
                                variant="surface"
                            >
                                Optional
                            </Badge>
                        }
                    />
                </Field.Label>
                <Input
                    name="check-string"
                    placeholder='Example: <div id="root"'
                    type="text"
                    value={checkString}
                    onChange={(event) => onCheckStringChange(event.target.value)}
                />
                <Field.HelperText>
                    The HTTP response must contain this exact string; the check will fail if it doesn&apos;t, even if the response had a valid status code.
                    Choose something that would only be present on a successful request
                </Field.HelperText>
            </Field.Root>

            <Field.Root invalid={validationErrors.timeout?.length > 0}>
                <Field.Label>Enter the request timeout</Field.Label>
                <Input
                    name="check-string"
                    placeholder="Enter a timeout"
                    type="number"
                    value={timeout}
                    onChange={(event) => handleTimeoutChange(event.target.value)}
                />
                <Field.HelperText>This value is in seconds</Field.HelperText>
                <Field.ErrorText>{validationErrors.timeout[0]}</Field.ErrorText>
            </Field.Root>

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
                    Finish setup
                </Button>
            </Flex>
        </Flex>
    );
}
