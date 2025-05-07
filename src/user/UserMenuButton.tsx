import { Button, Icon, Menu, Portal } from '@chakra-ui/react';
import { AiOutlineDisconnect, AiOutlineProfile, AiOutlineUser } from 'react-icons/ai';
import useGetAuthenticatedUser from './hooks/useGetAuthenticatedUser';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store';
import logout from '@/auth/utils/logout';

export default function UserMenuButton() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { user, isLoadingUser } = useGetAuthenticatedUser();

    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button
                    variant="ghost"
                    color="gray.100"
                    height={'100%'}
                    loading={isLoadingUser}
                    disabled={!user}
                >
                    {user?.f_name}{' '}
                    <Icon color="gray.100">
                        <AiOutlineUser />
                    </Icon>
                </Button>
            </Menu.Trigger>

            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        <Menu.Item
                            value="settings"
                            onClick={() => navigate(`/account/settings`)}
                        >
                            <Icon>
                                <AiOutlineProfile />
                            </Icon>
                            Account settings
                        </Menu.Item>
                        <Menu.Item
                            value="delete"
                            color="fg.error"
                            _hover={{ bg: 'bg.error', color: 'fg.error' }}
                            onClick={() => dispatch(logout())}
                        >
                            <Icon>
                                <AiOutlineDisconnect />
                            </Icon>
                            Log out
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    );
}
