import useGetAuthenticatedUser from '@/user/hooks/useGetAuthenticatedUser';
import { Grid, GridItem } from '@chakra-ui/react';
import ScreenshotCard from './ScreenshotCard';
import MapCard from './MapCard';
import CurrentStatusCard from './CurrentStatusCard';
import RecentEventsCard from './RecentEventsCard';
import AverageLoadingSpeedCard from './AverageLoadingSpeedCard';
import UptimeCard from './UptimeCard';

type Props = {
    webpageGuid: string;
    webpageUrl: string;
};

export default function Dashboard({ webpageGuid, webpageUrl }: Props) {
    const { user } = useGetAuthenticatedUser();

    return (
        <Grid
            templateColumns="repeat(24, 1fr)"
            templateRows="repeat(4, auto)"
            gap={6}
        >
            <GridItem
                colSpan={12}
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

            <GridItem
                colSpan={6}
                rowSpan={1}
                border="1px solid"
                borderColor="gray.300"
                borderRadius="xl"
                p={4}
            >
                <CurrentStatusCard webpageUrl={webpageUrl} />
            </GridItem>

            <GridItem
                colSpan={6}
                rowSpan={2}
                border="1px solid"
                borderColor="gray.300"
                borderRadius="xl"
                p={4}
            >
                <RecentEventsCard webpageUrl={webpageUrl} />
            </GridItem>

            <GridItem
                colSpan={6}
                rowSpan={1}
                border="1px solid"
                borderColor="gray.300"
                borderRadius="xl"
                p={4}
            >
                <AverageLoadingSpeedCard webpageUrl={webpageUrl} />
            </GridItem>

            <GridItem
                colSpan={24}
                rowSpan={1}
                border="1px solid"
                borderColor="gray.300"
                borderRadius="xl"
                p={4}
            >
                <UptimeCard webpageUrl={webpageUrl} />
            </GridItem>

            <GridItem
                colSpan={24}
                rowSpan={1}
                border="1px solid"
                borderColor="gray.300"
                borderRadius="xl"
                p={4}
            >
                <MapCard webpageUrl={webpageUrl} />
            </GridItem>
        </Grid>
    );
}
