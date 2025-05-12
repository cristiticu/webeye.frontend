import { Alert, Button, HStack, Stack } from '@chakra-ui/react';
import { useDeleteScheduledCheckMutation } from './service';
import { toaster } from '@/components/ui/toaster';

type Props = {
    webpageUrl: string;
    guid: string;
    onFinish: () => void;
};

export default function DeleteScheduledCheck({ webpageUrl, guid, onFinish }: Props) {
    const [deleteScheduledCheck, { isLoading: isDeletingScheduledCheck }] = useDeleteScheduledCheckMutation();

    const handleDeleteButtonClick = async () => {
        try {
            await deleteScheduledCheck({ url: webpageUrl, guid }).unwrap();

            toaster.create({
                type: 'success',
                title: 'Monitor deleted',
            });

            onFinish();
        } catch (_) {}
    };

    return (
        <Stack>
            <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Content>
                    <Alert.Description>
                        Are you sure you want to delete monitoring for <strong>{webpageUrl}</strong>? This webpage will no longer be safeguarded against
                        downtimes, and it won&apos;t generate new loading speed reports.
                    </Alert.Description>
                </Alert.Content>
            </Alert.Root>

            <HStack justify="flex-end">
                <Button
                    variant="outline"
                    colorPalette="gray"
                    onClick={onFinish}
                    disabled={isDeletingScheduledCheck}
                >
                    Cancel
                </Button>
                <Button
                    colorPalette="red"
                    onClick={handleDeleteButtonClick}
                    loading={isDeletingScheduledCheck}
                >
                    Delete Monitor
                </Button>
            </HStack>
        </Stack>
    );
}
