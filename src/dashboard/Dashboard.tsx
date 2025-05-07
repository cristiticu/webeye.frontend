import useGetAuthenticatedUser from '@/user/hooks/useGetAuthenticatedUser';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import ScreenshotCard from './ScreenshotCard';

type Props = {
    webpageGuid: string;
};

export default function Dashboard({ webpageGuid }: Props) {
    const { user } = useGetAuthenticatedUser();

    return (
        <Grid
            templateColumns="repeat(12, 1fr)"
            gap={6}
        >
            <GridItem
                colSpan={{ base: 12, md: 6 }}
                rowSpan={2}
                border="1px solid"
                borderColor="gray.300"
                borderRadius="xl"
                p={4}
            >
                <ScreenshotCard
                    webpageGuid={webpageGuid}
                    userGuid={user?.guid}
                />
            </GridItem>

            {/* Uptime Widget */}
            <GridItem
                colSpan={{ base: 12, md: 3 }}
                border="1px solid"
                borderColor="gray.300"
                borderRadius="xl"
                p={4}
            >
                <Text fontWeight="bold">Uptime</Text>
                <Box mt={4}>Uptime data goes here</Box>
            </GridItem>

            {/* Latency Chart */}
            <GridItem
                colSpan={{ base: 12, md: 3 }}
                border="1px solid"
                borderColor="gray.300"
                borderRadius="xl"
                p={4}
            >
                <Text fontWeight="bold">Latency (ms)</Text>
                <Box mt={4}>Latency chart goes here</Box>
            </GridItem>

            {/* Events Log */}
            <GridItem
                colSpan={{ base: 12, md: 6 }}
                border="1px solid"
                borderColor="gray.300"
                borderRadius="xl"
                p={4}
            >
                <Text fontWeight="bold">Recent Events</Text>
                <Box mt={4}>Event logs or table</Box>
            </GridItem>
        </Grid>
    );
}
