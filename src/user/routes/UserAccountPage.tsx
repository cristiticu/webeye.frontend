import { Container } from '@chakra-ui/react';
import UserAccount from '../UserAccount';

export default function UserAccountPage() {
    return (
        <Container
            paddingTop={6}
            position="absolute"
        >
            <UserAccount />
        </Container>
    );
}
