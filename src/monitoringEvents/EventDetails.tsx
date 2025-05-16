import { HAR_VIEWER_URL } from '@/config';
import { formatDetailedDayTimestamp } from '@/shared/utils';
import { Flex, Heading, StackSeparator, Text, VStack } from '@chakra-ui/react';

type Props = {
    userGuid?: string;
    webpageGuid?: string;
    webpageUrl?: string;
    region: string;
    createdAt: string;
};

export default function EventDetails({ userGuid, webpageGuid, webpageUrl, region, createdAt }: Props) {
    return (
        <VStack
            borderWidth="1px"
            borderRadius="xl"
            p={4}
            gap={2}
            separator={<StackSeparator />}
            alignItems="baseline"
        >
            <Flex
                width="100%"
                justify="space-between"
                mb={2}
            >
                <Heading>Page resources & timings</Heading>
                <Text
                    fontSize="sm"
                    color="gray.500"
                >
                    {formatDetailedDayTimestamp(createdAt)}
                </Text>
            </Flex>

            <iframe
                src={`${HAR_VIEWER_URL}?u_guid=${userGuid}&w_guid=${webpageGuid}&region=${region}&c_at=${encodeURIComponent(createdAt)}`}
                width="100%"
                height="400px"
                style={{ border: 'none' }}
                title="HAR Viewer"
            />
        </VStack>
    );
}
