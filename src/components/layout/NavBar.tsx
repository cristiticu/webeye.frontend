import UserMenuButton from '@/user/UserMenuButton';
import { Flex, Spacer, Box, Text } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

type Props = {
    pageTitle: string;
};

export default function NavBar({ pageTitle }: Props) {
    return (
        <Flex
            direction="column"
            flex="1"
        >
            <Flex
                background="brand.500"
                px={6}
                py={4}
                align="center"
                borderBottom="1px solid"
                borderColor="gray.200"
                height={74}
            >
                <Text
                    fontSize="lg"
                    fontWeight="semibold"
                    textTransform="capitalize"
                    color="gray.100"
                >
                    {pageTitle}
                </Text>
                <Spacer />
                <UserMenuButton />
            </Flex>

            <Box
                p={0}
                overflowY="auto"
                overflowX="auto"
                position="relative"
                width="100%"
                height="100%"
            >
                <Outlet />
            </Box>
        </Flex>
    );
}
