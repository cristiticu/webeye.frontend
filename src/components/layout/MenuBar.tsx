import BrandTitle from '@/components/BrandTitle';
import { usePreservedNavigate } from '@/shared/hooks/usePreservedNavigate';
import { Box, VStack, Button } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

type Props = {
    menuItems: Record<string, string>;
    menuIcons?: Record<string, IconType>;
    selectedMenu: string;
};

export default function MenuBar({ menuItems, selectedMenu, menuIcons }: Props) {
    const navigate = usePreservedNavigate();

    return (
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
                        {menuIcons[item] && menuIcons[item]({})}
                        {menuItems[item]}
                    </Button>
                ))}
            </VStack>
        </Box>
    );
}
