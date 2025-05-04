import { Box, Flex, Text, VStack, Button, Spacer, HStack, Icon } from '@chakra-ui/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import BrandTitle from './shared/BrandTitle';

const menuItems = {
    dashboard: 'Dashboard',
    monitors: 'Monitor Details',
    map: 'Map',
    placeholder_2: 'Placeholder',
};

export default function Layout() {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedMenu = location.pathname.split('/')[1];

    const pageTitle = menuItems[selectedMenu] || 'Page not found';

    return (
        <Flex height="100vh">
            <Box
                minWidth="250px"
                background="gray.300"
                boxShadow="md"
                display="flex"
                flexDirection="column"
                shadow="xl"
            >
                <Box
                    px={4}
                    py={3}
                    height={74}
                    display="flex"
                    justifyContent="center"
                >
                    <BrandTitle size="medium" />
                </Box>
                <VStack
                    align="stretch"
                    flex="1"
                    gap="0"
                >
                    {Object.keys(menuItems).map((item) => (
                        <Button
                            background={selectedMenu === item ? 'bg.emphasized' : undefined}
                            key={item}
                            variant="ghost"
                            justifyContent="flex-start"
                            colorScheme="gray"
                            px={6}
                            py={4}
                            borderRadius={0}
                            onClick={() => navigate(`/${item}`)}
                        >
                            {menuItems[item]}
                        </Button>
                    ))}
                </VStack>
            </Box>

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
                    <HStack>
                        <Button
                            variant="ghost"
                            color="gray.100"
                        >
                            Edit Profile{' '}
                            <Icon color="gray.100">
                                <AiOutlineUser />
                            </Icon>
                        </Button>
                    </HStack>
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
        </Flex>
    );
}
