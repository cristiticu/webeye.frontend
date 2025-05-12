import { usePreservedNavigate } from '@/shared/hooks/usePreservedNavigate';
import { Box, Button, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import { ImFileEmpty } from 'react-icons/im';

export default function EmptyLayout() {
    const navigate = usePreservedNavigate();

    return (
        <Box
            w="100%"
            h="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={8}
        >
            <VStack textAlign="center">
                <Icon
                    boxSize={16}
                    color="gray.400"
                >
                    <ImFileEmpty />
                </Icon>
                <Heading size="lg">Monitor not set up</Heading>
                <Text
                    fontSize="md"
                    color="gray.600"
                    maxW="md"
                >
                    There is no active monitor set up for your webpage! Start monitoring your site&apos;s loading performance and uptime in real-time from 17
                    global locations across 3 continents. Stay ahead of downtime with precise, distributed checks and diagnose loading issues with no hassle.
                </Text>

                <Button onClick={() => navigate('/monitors/add')}>Create Your Monitor</Button>
            </VStack>
        </Box>
    );
}
