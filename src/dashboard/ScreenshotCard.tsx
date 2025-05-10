import NoEventsFiller from '@/components/NoEventsFiller';
import { SCREENSHOT_STORAGE_URL } from '@/config';
import { Heading, Image, Skeleton, StackSeparator, VStack } from '@chakra-ui/react';
import { useState } from 'react';

type Props = {
    webpageGuid?: string;
    userGuid?: string;
};

export default function ScreenshotCard({ webpageGuid, userGuid }: Props) {
    const [screenshotError, setScreenshotError] = useState<boolean>(false);

    const hasDataForScreenshot = webpageGuid && userGuid;

    return (
        <VStack
            gap={2}
            separator={<StackSeparator />}
        >
            <Heading alignSelf="self-start">Welcome to Webeye</Heading>

            <Skeleton
                loading={!hasDataForScreenshot}
                width="100%"
                height="300px"
            >
                {!screenshotError && (
                    <Image
                        loading="lazy"
                        src={`${SCREENSHOT_STORAGE_URL}/${userGuid}/${webpageGuid}.jpg`}
                        alt="Webpage screenshot"
                        borderRadius="lg"
                        objectFit="cover"
                        onError={() => setScreenshotError(true)}
                        w="100%"
                        h="100%"
                    />
                )}

                {screenshotError && <NoEventsFiller />}
            </Skeleton>
        </VStack>
    );
}
