import { Button, Field, Flex, Stack, Text } from '@chakra-ui/react';

type Props = {
    firstName: string;
    lastName?: string;
    email: string;
    onEdit?: () => void;
};

export default function UserAccountInformation({ firstName, lastName, email, onEdit }: Props) {
    return (
        <Flex
            flexDirection="column"
            width="100%"
        >
            <Stack>
                <Field.Root>
                    <Field.Label fontSize="lg">First name:</Field.Label>
                    <Text
                        marginLeft="12px"
                        color="gray.600"
                        fontSize="md"
                    >
                        {firstName}
                    </Text>
                </Field.Root>

                <Field.Root>
                    <Field.Label fontSize="lg">Last name:</Field.Label>
                    <Text
                        marginLeft="12px"
                        color="gray.600"
                        fontSize="md"
                    >
                        {lastName || 'None'}
                    </Text>
                </Field.Root>

                <Field.Root>
                    <Field.Label fontSize="lg">Email:</Field.Label>
                    <Text
                        marginLeft="12px"
                        color="gray.600"
                        fontSize="md"
                    >
                        {email}
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
