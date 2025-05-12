import { Tabs, Menu, Button, Flex, Icon, Portal } from '@chakra-ui/react';
import { AiOutlineMore, AiOutlineControl } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import DeleteMonitoredWebpageButton from './DeleteMonitoredWebpageButton';

type Props = {
    guid: string;
    url: string;
};

export default function MonitoredWebpageTab({ guid, url }: Props) {
    const navigate = useNavigate();

    return (
        <Flex
            alignItems="center"
            className="tab"
        >
            <Tabs.Trigger value={guid}>{url}</Tabs.Trigger>

            <Menu.Root>
                <Menu.Trigger asChild>
                    <Button
                        size="xs"
                        variant="surface"
                        colorPalette="gray"
                    >
                        <Icon>
                            <AiOutlineMore />
                        </Icon>
                    </Button>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content>
                            <Menu.Item
                                value="settings"
                                onClick={() => navigate(`/monitors?w_guid=${guid}`, { state: { isEditing: true } })}
                            >
                                <Icon>
                                    <AiOutlineControl />
                                </Icon>
                                Edit monitor
                            </Menu.Item>
                            <Menu.Item
                                value="delete"
                                color="fg.error"
                                _hover={{ bg: 'bg.error', color: 'fg.error' }}
                            >
                                <DeleteMonitoredWebpageButton webpageUrl={url} />
                            </Menu.Item>
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
        </Flex>
    );
}
