import { loginValidationRule } from '@/auth/utils/validation';
import { Button, Field, Flex, Input, Stack } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import validate from 'validate.js';

const initialValidationErrors = {
    firstName: [],
    lastName: [],
    email: [],
};

type Props = {
    initialFirstName: string;
    initialLastName?: string;
    initialEmail: string;
    submitText: string;
    loading?: boolean;
    onSubmit: (firstName?: string, lastName?: string, email?: string) => void;
    onCancel?: () => void;
};

export default function UserAccountInput({ initialEmail, initialFirstName, initialLastName, submitText, loading, onSubmit, onCancel }: Props) {
    const [user, setUser] = useState({
        firstName: initialFirstName,
        lastName: initialLastName,
        email: initialEmail,
    });

    const [validationErrors, setValidationErrors] = useState(initialValidationErrors);

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUser((_) => ({ ..._, email: event.target.value }));
        setValidationErrors((_) => ({ ..._, email: [] }));
    };

    const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUser((_) => ({ ..._, firstName: event.target.value }));
        setValidationErrors((_) => ({ ..._, firstName: [] }));
    };

    const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUser((_) => ({ ..._, lastName: event.target.value }));
        setValidationErrors((_) => ({ ..._, lastName: [] }));
    };

    const handleSubmit = async () => {
        const validationErrors = validate({ email: user.email, firstName: user.firstName, lastName: user.lastName || undefined }, loginValidationRule);

        if (validationErrors) {
            setValidationErrors((_) => ({ ..._, ...validationErrors }));
            return;
        }

        onSubmit(user.firstName, user.lastName, user.email);
    };

    return (
        <Flex
            flexDirection="column"
            width="100%"
        >
            <Stack width="50%">
                <Field.Root invalid={validationErrors.firstName?.length > 0}>
                    <Field.Label fontSize="lg">First name:</Field.Label>
                    <Input
                        marginLeft="12px"
                        name="checkString"
                        value={user.firstName || ''}
                        onChange={handleFirstNameChange}
                    />
                    <Field.ErrorText>{validationErrors.firstName[0]}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={validationErrors.lastName?.length > 0}>
                    <Field.Label fontSize="lg">Last name:</Field.Label>
                    <Input
                        marginLeft="12px"
                        name="lastName"
                        value={user.lastName || ''}
                        onChange={handleLastNameChange}
                    />
                    <Field.ErrorText>{validationErrors.lastName[0]}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={validationErrors.email?.length > 0}>
                    <Field.Label fontSize="lg">Email:</Field.Label>
                    <Input
                        marginLeft="12px"
                        name="email"
                        value={user.email || ''}
                        onChange={handleEmailChange}
                    />
                    <Field.ErrorText>{validationErrors.email[0]}</Field.ErrorText>
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
                    onClick={handleSubmit}
                    loading={loading}
                >
                    {submitText}
                </Button>
            </Flex>
        </Flex>
    );
}
