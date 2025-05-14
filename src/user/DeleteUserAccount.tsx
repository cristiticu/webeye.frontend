import { Alert, Button, Stack } from '@chakra-ui/react';
import useDeleteUser from './hooks/useDeleteUser';

export default function DeleteUserAccount() {
    const { deleteUser, isDeletingUser } = useDeleteUser();

    return (
        <Stack>
            <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Content>
                    <Alert.Description>
                        Are you sure you want to delete <strong>your entire account</strong>? Doing so will remove all stored events, downtimes and webpages,
                        and you will be unable to monitor your webpages for downtime and performance
                    </Alert.Description>
                </Alert.Content>
            </Alert.Root>

            <Button
                marginLeft="auto"
                colorPalette="red"
                onClick={deleteUser}
                loading={isDeletingUser}
            >
                Delete Account
            </Button>
        </Stack>
    );
}
