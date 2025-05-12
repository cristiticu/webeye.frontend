import { AVAILABLE_DAY_FILTERS, AVAILABLE_FREQUENCIES, AVAILABLE_REGIONS } from '@/config';
import { Button, Field, Flex, Stack, Text } from '@chakra-ui/react';

type Props = {
    frequency: string;
    days: string;
    regions: string[];
    checkString: string;
    timeout: number;
    acceptedStatus: string[];
    onEdit?: () => void;
};

export default function ScheduledCheckInformation({ frequency, days, regions, checkString, timeout, acceptedStatus, onEdit }: Props) {
    return (
        <Flex
            flexDirection="column"
            width="100%"
        >
            <Stack>
                <Field.Root>
                    <Field.Label fontSize="lg">Frequency:</Field.Label>
                    <Text
                        marginLeft="12px"
                        color="gray.600"
                        fontSize="md"
                    >
                        Every {AVAILABLE_FREQUENCIES[frequency]}
                    </Text>
                </Field.Root>

                <Field.Root>
                    <Field.Label fontSize="lg">Active:</Field.Label>
                    <Text
                        marginLeft="12px"
                        color="gray.600"
                        fontSize="md"
                    >
                        {AVAILABLE_DAY_FILTERS[days]}
                    </Text>
                </Field.Root>

                <Field.Root>
                    <Field.Label fontSize="lg">Regions:</Field.Label>
                    <Text
                        marginLeft="12px"
                        color="gray.600"
                        fontSize="md"
                    >
                        {regions.map((region, index, array) => `${AVAILABLE_REGIONS[region]}${index === array.length - 1 ? '' : ', '}`)}
                    </Text>
                </Field.Root>

                <Field.Root>
                    <Field.Label fontSize="lg">Check string:</Field.Label>
                    <Text
                        marginLeft="12px"
                        color="gray.600"
                        fontSize="md"
                    >
                        {checkString || 'None'}
                    </Text>
                </Field.Root>

                <Field.Root>
                    <Field.Label fontSize="lg">Timeout:</Field.Label>
                    <Text
                        marginLeft="12px"
                        color="gray.600"
                        fontSize="md"
                    >
                        {timeout / 1000} seconds
                    </Text>
                </Field.Root>

                <Field.Root>
                    <Field.Label fontSize="lg">Accepted status:</Field.Label>
                    <Text
                        marginLeft="12px"
                        color="gray.600"
                        fontSize="md"
                    >
                        {acceptedStatus.map((status, index, array) => `${status}${index === array.length - 1 ? '' : ', '}`)}
                    </Text>
                </Field.Root>
            </Stack>

            {onEdit && (
                <Button
                    marginLeft="auto"
                    size="lg"
                    variant="surface"
                    onClick={onEdit}
                >
                    Edit
                </Button>
            )}
        </Flex>
    );
}
