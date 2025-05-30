import './ScreenshotCard.less';
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
            height="100%"
            gap={2}
            separator={<StackSeparator />}
        >
            <Heading alignSelf="self-start">Welcome to Webeye</Heading>

            <Skeleton
                className="screenshot-skeleton"
                loading={!hasDataForScreenshot}
            >
                {!screenshotError && (
                    <Image
                        className="webpage-screenshot"
                        src={`${SCREENSHOT_STORAGE_URL}/${userGuid}/${webpageGuid}.jpg`}
                        alt="Webpage screenshot"
                        loading="lazy"
                        onError={() => setScreenshotError(true)}
                    />
                )}

                {screenshotError && <NoEventsFiller />}
            </Skeleton>
        </VStack>
    );
}
