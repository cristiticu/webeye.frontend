import { Box, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import { MdPublic } from 'react-icons/md';
import AddMonitoredWebpageButton from './AddMonitoredWebpageButton';

export default function EmptyLayout() {
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
                    as={MdPublic}
                    boxSize={16}
                    color="gray.400"
                />
                <Heading size="lg">No Webpages Monitored</Heading>
                <Text
                    fontSize="md"
                    color="gray.600"
                    maxW="md"
                >
                    Start monitoring your site&apos;s loading performance and uptime in real-time from 21 global locations across 3 continents. Stay ahead of
                    downtime with precise, distributed checks and diagnose loading issues with no hassle.
                </Text>
                <AddMonitoredWebpageButton type="full" />
            </VStack>
        </Box>
    );
}
