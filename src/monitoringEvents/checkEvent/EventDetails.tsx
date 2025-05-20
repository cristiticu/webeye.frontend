import { Flex, Heading, StackSeparator, Text, VStack } from '@chakra-ui/react';
import PageResources from './PageResources';
import EventResults from './EventResults';
import { useFetchEventQuery } from '../service';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { formatDetailedDayTimestamp } from '@/shared/utils';
import { REGION_DATA } from '@/config';
import EventError from './EventError';

type Props = {
    userGuid?: string;
    webpageGuid?: string;
    webpageUrl?: string;
    region: string;
    createdAt: string;
};

export default function EventDetails({ userGuid, webpageGuid, webpageUrl, region, createdAt }: Props) {
    const hasParams = webpageUrl && createdAt;

    const { data: monitoringEvent } = useFetchEventQuery(hasParams ? { url: webpageUrl, c_at: createdAt } : skipToken);

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
                <VStack alignItems="baseline">
                    <Heading>Performance Report for {webpageUrl}</Heading>
                    <Text
                        fontSize="sm"
                        color="gray.500"
                    >
                        Metrics extracted from {REGION_DATA[region]?.name}
                    </Text>
                </VStack>

                <Text
                    fontSize="sm"
                    color="gray.500"
                >
                    {formatDetailedDayTimestamp(createdAt)}
                </Text>
            </Flex>

            {monitoringEvent?.status === 'down' && <EventError error={monitoringEvent?.error || 'Unknown Error'} />}

            {monitoringEvent?.status === 'up' && (
                <>
                    <EventResults results={monitoringEvent?.results || {}} />
                    <PageResources
                        userGuid={userGuid}
                        webpageGuid={webpageGuid}
                        region={region}
                        createdAt={createdAt}
                    />
                </>
            )}
        </VStack>
    );
}
