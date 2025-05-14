import { loginValidationRule } from '@/auth/utils/validation';
import { Button, Field, Flex, Input, Stack } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import validate from 'validate.js';

const initialValidationErrors = {
    oldPassword: [],
    newPassword: [],
    newPasswordVerify: [],
};

type Props = {
    loading?: boolean;
    onSubmit: (oldPassword: string, newPassword: string) => void;
};

export default function ChangePasswordInput({ loading, onSubmit }: Props) {
    const [validationErrors, setValidationErrors] = useState(initialValidationErrors);

    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [passwordVerify, setPasswordVerify] = useState<string>('');

    const handleOldPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setOldPassword(event.target.value);
        setValidationErrors((_) => ({ ..._, oldPassword: [] }));
    };

    const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
        setValidationErrors((_) => ({ ..._, newPassword: [] }));
    };

    const handlePasswordVerifyChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordVerify(event.target.value);
        setValidationErrors((_) => ({ ..._, newPasswordVerify: [] }));
    };

    const handleSubmit = () => {
        let hasErrors = false;

        const validationErrors = validate({ password: newPassword }, loginValidationRule);

        if (!oldPassword) {
            setValidationErrors((_) => ({ ..._, oldPassword: ['Please enter your old password'] }));
            hasErrors = true;
        }

        if (!passwordVerify) {
            setValidationErrors((_) => ({ ..._, newPasswordVerify: ['Please verify your new password'] }));
            hasErrors = true;
        }

        if (validationErrors) {
            setValidationErrors((_) => ({ ..._, newPassword: validationErrors.password }));
            hasErrors = true;
        }

        if (passwordVerify !== newPassword) {
            setValidationErrors((_) => ({ ..._, newPasswordVerify: ["Passwords don't match"] }));
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        onSubmit(oldPassword, newPassword);
    };

    return (
        <Flex
            flexDirection="column"
            width="100%"
        >
            <Stack width="50%">
                <Field.Root invalid={validationErrors.oldPassword?.length > 0}>
                    <Field.Label fontSize="lg">Old password:</Field.Label>
                    <Input
                        type="password"
                        marginLeft="12px"
                        name="checkString"
                        value={oldPassword}
                        onChange={handleOldPasswordChange}
                    />
                    <Field.ErrorText>{validationErrors.oldPassword[0]}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={validationErrors.newPassword?.length > 0}>
                    <Field.Label fontSize="lg">New password:</Field.Label>
                    <Input
                        type="password"
                        marginLeft="12px"
                        name="lastName"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                    />
                    <Field.ErrorText>{validationErrors.newPassword[0]}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={validationErrors.newPasswordVerify?.length > 0}>
                    <Field.Label fontSize="lg">Verify password:</Field.Label>
                    <Input
                        type="password"
                        marginLeft="12px"
                        name="email"
                        value={passwordVerify}
                        onChange={handlePasswordVerifyChange}
                    />
                    <Field.ErrorText>{validationErrors.newPasswordVerify[0]}</Field.ErrorText>
                </Field.Root>
            </Stack>

            <Flex
                justify="flex-end"
                gap={2}
                mt={3}
            >
                <Button
                    size="lg"
                    colorPalette="green"
                    onClick={handleSubmit}
                    loading={loading}
                >
                    Save
                </Button>
            </Flex>
        </Flex>
    );
}
