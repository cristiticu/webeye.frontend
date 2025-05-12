import { CloseButton, Dialog, IconButton, Portal } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import DeleteScheduledCheck from './DeleteScheduledCheck';

type Props = {
    webpageUrl: string;
    guid: string;
};

export default function DeleteScheduledCheckButton({ webpageUrl, guid }: Props) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <>
            <IconButton
                colorPalette="red"
                variant="outline"
                onClick={() => setIsModalOpen(true)}
            >
                <AiOutlineDelete />
            </IconButton>

            <Dialog.Root
                open={isModalOpen}
                onOpenChange={() => setIsModalOpen(false)}
                closeOnEscape
                size="lg"
            >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Delete monitor for {webpageUrl}</Dialog.Title>
                                <Dialog.CloseTrigger asChild>
                                    <CloseButton size="sm" />
                                </Dialog.CloseTrigger>
                            </Dialog.Header>
                            <Dialog.Body>
                                <DeleteScheduledCheck
                                    webpageUrl={webpageUrl}
                                    guid={guid}
                                    onFinish={() => setIsModalOpen(false)}
                                />
                            </Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    );
}
