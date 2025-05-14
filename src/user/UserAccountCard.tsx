import { useState } from 'react';
import { useUpdateUserMutation } from './service';
import { toaster } from '@/components/ui/toaster';
import { Flex, Heading, StackSeparator, Text, VStack } from '@chakra-ui/react';
import { formatPrettyTimestamp } from '@/shared/utils';
import UserAccountInformation from './UserAccountInformation';
import UserAccountInput from './UserAccountInput';

type Props = {
    firstName: string;
    lastName?: string;
    email: string;
    createdAt: string;
};

export default function UserAccountCard({ firstName, lastName, email, createdAt }: Props) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();

    const handleUpdateUser = async (firstName?: string, lastName?: string, email?: string) => {
        try {
            await updateUser({ email: email || null, f_name: firstName || null, l_name: lastName }).unwrap();

            toaster.create({
                type: 'success',
                title: 'Changes saved successfully!',
            });

            setIsEditing(false);
        } catch (_) {
            toaster.create({
                type: 'error',
                title: 'Something went wrong! Please try again',
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
            <Flex
                width="100%"
                justify="space-between"
                mb={2}
            >
                <Heading>Your account</Heading>
                <Text
                    fontSize="sm"
                    color="gray.500"
                >
                    Using Webeye since {formatPrettyTimestamp(createdAt)}
                </Text>
            </Flex>

            {!isEditing && (
                <UserAccountInformation
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    onEdit={() => setIsEditing(true)}
                />
            )}

            {isEditing && (
                <UserAccountInput
                    initialEmail={email}
                    initialFirstName={firstName}
                    initialLastName={lastName}
                    submitText="Save"
                    loading={isUpdatingUser}
                    onSubmit={handleUpdateUser}
                    onCancel={() => setIsEditing(false)}
                />
            )}
        </VStack>
    );
}
