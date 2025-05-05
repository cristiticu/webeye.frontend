import { Button, Icon } from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';
import { useFetchUserQuery } from './service';
import { useAppSelector } from '@/store';
import { skipToken } from '@reduxjs/toolkit/query';

export default function UserMenuButton() {
    const userGuid = useAppSelector((state) => state.auth.userGuid);
    const { data: user, isLoading } = useFetchUserQuery(userGuid ? { guid: userGuid } : skipToken);

    return (
        <Button
            variant="ghost"
            color="gray.100"
            height={'100%'}
            loading={isLoading}
            disabled={!user}
        >
            {user?.f_name}{' '}
            <Icon color="gray.100">
                <AiOutlineUser />
            </Icon>
        </Button>
    );
}
