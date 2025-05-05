import { Box, VStack, Spinner, Text, Icon } from '@chakra-ui/react';
import { AiFillCheckCircle } from 'react-icons/ai';

export default function CompleteStep() {
    return (
        <Box
            marginTop={8}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <VStack gap={8}>
                <Icon
                    boxSize={20}
                    color="brand.400"
                >
                    <AiFillCheckCircle />
                </Icon>
                <Text
                    fontSize="xl"
                    fontWeight="medium"
                >
                    All done! Setting up your monitor...
                </Text>
                <Spinner size="lg" />
            </VStack>
        </Box>
    );
}
