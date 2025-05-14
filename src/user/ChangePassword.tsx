import useChangePassword from '@/auth/hooks/useChangePassword';
import { Heading, StackSeparator, VStack } from '@chakra-ui/react';
import ChangePasswordInput from './ChangePasswordInput';
import { toaster } from '@/components/ui/toaster';

export default function ChangePassword() {
    const { changePassword, isChangingPassword } = useChangePassword();

    const handleChangePassword = async (oldPassword: string, newPassword: string) => {
        try {
            await changePassword(oldPassword, newPassword);

            toaster.create({
                type: 'success',
                title: 'Password changed successfully!',
            });
        } catch (_) {
            toaster.create({
                type: 'error',
                title: 'Incorrect old password!',
            });
        }
    };

    return (
        <VStack
            borderWidth="1px"
            borderRadius="xl"
            p={4}
            gap={2}
            separator={<StackSeparator />}
            alignItems="baseline"
        >
            <Heading>Change your password</Heading>

            <ChangePasswordInput
                loading={isChangingPassword}
                onSubmit={handleChangePassword}
            />
        </VStack>
    );
}
