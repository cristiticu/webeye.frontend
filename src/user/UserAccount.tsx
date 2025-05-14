import { Skeleton, Tabs } from '@chakra-ui/react';
import useGetAuthenticatedUser from './hooks/useGetAuthenticatedUser';
import UserAccountCard from './UserAccountCard';
import ChangePassword from './ChangePassword';
import DeleteUserAccount from './DeleteUserAccount';

export default function UserAccount() {
    const { user, isLoadingUser } = useGetAuthenticatedUser();

    return (
        <Tabs.Root
            defaultValue="information"
            variant="enclosed"
        >
            <Tabs.List>
                <Tabs.Trigger value="information">Information</Tabs.Trigger>
                <Tabs.Trigger value="change-password">Change password</Tabs.Trigger>
                <Tabs.Trigger
                    colorPalette="red"
                    value="delete-account"
                >
                    Delete account
                </Tabs.Trigger>
            </Tabs.List>
            <Skeleton
                variant="pulse"
                loading={isLoadingUser}
            >
                <Tabs.Content value="information">
                    <UserAccountCard
                        firstName={user?.f_name}
                        lastName={user?.l_name}
                        email={user?.email}
                        createdAt={user?.c_at}
                    />
                </Tabs.Content>

                <Tabs.Content value="change-password">
                    <ChangePassword />
                </Tabs.Content>

                <Tabs.Content value="delete-account">
                    <DeleteUserAccount />
                </Tabs.Content>
            </Skeleton>
        </Tabs.Root>
    );
}
