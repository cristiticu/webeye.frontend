import { Box, Link, Text } from '@chakra-ui/react';
import { usePreservedNavigate } from '@/shared/hooks/usePreservedNavigate';
import { formatPrettyTimestamp } from '@/shared/utils';

type Props = {
    region: string;
    regionName: string;
    status: string;
    lastUpdated: string | null;
    error: string | null;
};

export default function RegionTooltip({ region, regionName, status, lastUpdated, error }: Props) {
    const navigate = usePreservedNavigate();

    const formattedLastUpdated = lastUpdated && formatPrettyTimestamp(lastUpdated);

    const handleEventClick = () => {
        navigate(`/event/${region}/${encodeURIComponent(lastUpdated)}`);
    };

    return (
        <Box p={2}>
            <Text fontWeight="bold">{regionName}</Text>

            {status === 'up' && <Text>This region is all good!</Text>}
            {status === 'down' && <Text>Region is down!</Text>}
            {status === 'unknown' && <Text>No status available</Text>}

            {formattedLastUpdated && (
                <Text
                    fontSize="sm"
                    color="gray.500"
                >
                    Last updated:{' '}
                    <Link
                        color="blue.500"
                        onClick={handleEventClick}
                        textDecoration="underline"
                    >
                        {formattedLastUpdated}
                    </Link>
                </Text>
            )}

            {error && (
                <Text
                    fontSize="sm"
                    color="red.500"
                >
                    {error}
                </Text>
            )}
        </Box>
    );
}
