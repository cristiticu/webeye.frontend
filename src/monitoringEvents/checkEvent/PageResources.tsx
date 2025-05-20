import { HAR_VIEWER_URL } from '@/config';
import { Heading, Skeleton, StackSeparator, VStack } from '@chakra-ui/react';

type Props = {
    userGuid?: string;
    webpageGuid?: string;
    region: string;
    createdAt: string;
};

export default function PageResources({ userGuid, webpageGuid, region, createdAt }: Props) {
    const isLoading = !userGuid || !webpageGuid || !region;

    return (
        <VStack
            width="100%"
            p={4}
            gap={2}
            separator={<StackSeparator />}
            alignItems="baseline"
        >
            <Heading size="md">Page Resources & Timings</Heading>

            <Skeleton
                width="100%"
                loading={isLoading}
                variant="pulse"
            >
                {!isLoading && (
                    <iframe
                        src={`${HAR_VIEWER_URL}?u_guid=${userGuid}&w_guid=${webpageGuid}&region=${region}&c_at=${encodeURIComponent(createdAt)}`}
                        width="100%"
                        height="400px"
                        style={{ border: 'none' }}
                        title="HAR Viewer"
                    />
                )}
            </Skeleton>
        </VStack>
    );
}
