import { Alert } from '@chakra-ui/react';

type Props = {
    error: string;
};

export default function EventError({ error }: Props) {
    return (
        <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
                <Alert.Title> Check Failed!</Alert.Title>
                <Alert.Description>{error}</Alert.Description>
            </Alert.Content>
        </Alert.Root>
    );
}
