import { Alert, Button, HStack, Stack } from '@chakra-ui/react';
import { useDeleteMonitoredWebpageMutation } from './service';
import { toaster } from '@/components/ui/toaster';

type Props = {
    webpageUrl: string;
    onFinish: () => void;
};

export default function DeleteMonitoredWebpage({ webpageUrl, onFinish }: Props) {
    const [deleteMonitoredWebpage, { isLoading: isDeletingMonitoredWebpage }] = useDeleteMonitoredWebpageMutation();

    const handleDeleteButtonClick = async () => {
        try {
            await deleteMonitoredWebpage({ url: webpageUrl }).unwrap();

            toaster.create({
                type: 'success',
                title: 'Webpage deleted',
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
                        Are you sure you want to delete <strong>{webpageUrl}</strong>? Doing so will remove all generated reports for this url, and you will be
                        unable to debug possible downtimes or slow loading speeds.
                    </Alert.Description>
                </Alert.Content>
            </Alert.Root>

            <HStack justify="flex-end">
                <Button
                    variant="outline"
                    colorPalette="gray"
                    onClick={onFinish}
                    disabled={isDeletingMonitoredWebpage}
                >
                    Cancel
                </Button>
                <Button
                    colorPalette="red"
                    onClick={handleDeleteButtonClick}
                    loading={isDeletingMonitoredWebpage}
                >
                    Delete Webpage
                </Button>
            </HStack>
        </Stack>
    );
}
