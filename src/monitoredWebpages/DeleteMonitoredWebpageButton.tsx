import { CloseButton, Dialog, Icon, Portal } from '@chakra-ui/react';
import { AiOutlineDelete } from 'react-icons/ai';
import DeleteMonitoredWebpage from './DeleteMonitoredWebpage';
import { useState } from 'react';

type Props = {
    webpageUrl: string;
};

export default function DeleteMonitoredWebpageButton({ webpageUrl }: Props) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleRemoveButtonClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsModalOpen(true);
    };

    return (
        <>
            <Icon onClick={handleRemoveButtonClick}>
                <AiOutlineDelete />
            </Icon>
            <span onClick={handleRemoveButtonClick}> Remove</span>

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
                                <Dialog.Title>Delete {webpageUrl}</Dialog.Title>
                                <Dialog.CloseTrigger asChild>
                                    <CloseButton size="sm" />
                                </Dialog.CloseTrigger>
                            </Dialog.Header>
                            <Dialog.Body>
                                <DeleteMonitoredWebpage
                                    webpageUrl={webpageUrl}
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
