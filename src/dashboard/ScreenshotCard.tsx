import { SCREENSHOT_STORAGE_URL } from '@/config';
import { Flex, Heading, Icon, Image, Skeleton, StackSeparator, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { MdImageNotSupported } from 'react-icons/md';

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
                        borderRadius="md"
                        objectFit="cover"
                        onError={() => setScreenshotError(true)}
                        w="100%"
                        h="100%"
                    />
                )}

                {screenshotError && (
                    <Flex
                        w="100%"
                        h="300px"
                        borderRadius="md"
                        bg="gray.100"
                        direction="column"
                        align="center"
                        justify="center"
                    >
                        <Icon>
                            <MdImageNotSupported />
                        </Icon>

                        <Text color="gray.500">No events yet</Text>
                    </Flex>
                )}
            </Skeleton>
        </VStack>
    );
}
