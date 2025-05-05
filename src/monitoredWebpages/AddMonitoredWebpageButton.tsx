import { Tooltip } from '@/components/ui/tooltip';
import { Button, CloseButton, Dialog, Icon, Portal } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import AddMonitoredWebpage from './wizard/AddMonitoredWebpage';

type Props = {
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '2xs' | 'xs';
};

export default function AddMonitoredWebpageButton({ size = 'xl' }: Props) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const dialogContentRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <Tooltip content="Monitor a new webpage">
                <Button
                    borderRadius="0"
                    size={size}
                    onClick={() => setIsModalOpen(true)}
                >
                    <Icon>
                        <AiOutlinePlus />
                    </Icon>
                </Button>
            </Tooltip>

            <Dialog.Root
                open={isModalOpen}
                onOpenChange={() => setIsModalOpen(false)}
                closeOnEscape
                size="lg"
            >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content ref={dialogContentRef}>
                            <Dialog.Header>
                                <Dialog.Title>Monitor a new webpage</Dialog.Title>
                                <Dialog.CloseTrigger asChild>
                                    <CloseButton size="sm" />
                                </Dialog.CloseTrigger>
                            </Dialog.Header>
                            <Dialog.Body>
                                <AddMonitoredWebpage
                                    contentRef={dialogContentRef}
                                    onFinishSetup={() => setIsModalOpen(false)}
                                />
                            </Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    );
}
