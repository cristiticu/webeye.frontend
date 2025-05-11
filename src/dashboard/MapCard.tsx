import { useFetchRegionsStatusQuery } from '@/monitoringEvents/service';
import RegionsWorldMap from '@/monitoringEvents/RegionsWorldMap';
import { Heading, Skeleton, StackSeparator, VStack } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';
import { mapRegionsStatus } from '@/monitoringEvents/utils';
import { REGIONS_STATUS_LONG_POLLING_MS } from '@/config';

type Props = {
    webpageUrl?: string;
};

export default function MapCard({ webpageUrl }: Props) {
    const { data: regionsStatusList, isLoading: isLoadingRegions } = useFetchRegionsStatusQuery(webpageUrl ? { url: webpageUrl } : skipToken, {
        pollingInterval: REGIONS_STATUS_LONG_POLLING_MS,
    });

    const regionsStatus = useMemo(() => (regionsStatusList ? mapRegionsStatus(regionsStatusList) : {}), [regionsStatusList]);

    return (
        <VStack
            gap={2}
            separator={<StackSeparator />}
        >
            <Heading alignSelf="self-start">Global Overview</Heading>
            <Skeleton
                variant="pulse"
                loading={isLoadingRegions}
            >
                <RegionsWorldMap
                    regionsStatus={regionsStatus}
                    width={1000}
                    height={501}
                />
            </Skeleton>
        </VStack>
    );
}
