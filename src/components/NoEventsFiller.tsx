import { Flex, Icon, Text } from '@chakra-ui/react';
import { MdImageNotSupported } from 'react-icons/md';

export default function NoEventsFiller() {
    return (
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
    );
}
