import { Button, Icon } from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';
import useGetAuthenticatedUser from './hooks/useGetAuthenticatedUser';

export default function UserMenuButton() {
    const { user, isLoadingUser } = useGetAuthenticatedUser();

    return (
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
    );
}
