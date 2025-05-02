import { Button, HStack, Text } from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip';

export default function App() {
    return (
        <>
            <Text
                color="warning.fg"
                backgroundColor="warning.bg"
                animation="slide-from-bottom-full"
                animationDuration="slowest"
            >
                Hello, World!
            </Text>
            <HStack>
                <Tooltip content="Hello!">
                    <Button
                        colorPalette="red"
                        variant="surface"
                    >
                        Click me
                    </Button>
                </Tooltip>

                <Button>Click me</Button>
            </HStack>
        </>
    );
}
