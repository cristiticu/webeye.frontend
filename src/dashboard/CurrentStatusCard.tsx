import { GENERAL_CONTEXT_LONG_POLLING_MS } from '@/config';
import { useFetchGeneralContextQuery } from '@/monitoringEvents/service';
import { formatPrettyTimestamp } from '@/shared/utils';
import { Heading, Skeleton, StackSeparator, Text, VStack } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query/react';

const statusColor = {
    up: 'success',
    down: 'danger',
    unknown: 'gray.500',
};

type Props = {
    webpageUrl?: string;
};

export default function CurrentStatusCard({ webpageUrl }: Props) {
    const { data: generalContext, isLoading: isLoadingGeneralContext } = useFetchGeneralContextQuery(webpageUrl ? { url: webpageUrl } : skipToken, {
        pollingInterval: GENERAL_CONTEXT_LONG_POLLING_MS,
    });

    return (
        <VStack
            gap={2}
            separator={<StackSeparator />}
        >
            <Heading alignSelf="self-start">Current Status</Heading>

            <Skeleton
                variant="pulse"
                loading={isLoadingGeneralContext}
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <Text
                    fontWeight="bold"
                    fontSize="34px"
                    color={statusColor[generalContext?.status || 'unknown']}
                >
                    {generalContext?.status?.toUpperCase() || 'UNKNOWN'}
                </Text>

                {generalContext?.status === 'up' && (
                    <Text
                        fontWeight="sm"
                        fontSize="gray.500"
                    >
                        No problems found
                    </Text>
                )}

                {generalContext?.downtime_s_at && (
                    <Text
                        fontSize="sm"
                        color="gray.500"
                    >
                        since {formatPrettyTimestamp(generalContext.downtime_s_at)}
                    </Text>
                )}

                {generalContext?.error && (
                    <Text
                        marginTop="24px"
                        fontSize="md"
                        color="red.500"
                        maxLines={2}
                        wordBreak="break-word"
                    >
                        {generalContext?.error}
                    </Text>
                )}
            </Skeleton>
        </VStack>
    );
}
