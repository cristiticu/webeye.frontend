import useCurrentWebpageState from '@/monitoredWebpages/hooks/useCurrentWebpageState';
import { Container } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import EventDetails from '../EventDetails';
import useGetAuthenticatedUser from '@/user/hooks/useGetAuthenticatedUser';

export default function EventDetailsPage() {
    const params = useParams();

    const { webpage } = useCurrentWebpageState();
    const { user } = useGetAuthenticatedUser();

    return (
        <Container
            paddingTop={6}
            position="absolute"
        >
            <EventDetails
                userGuid={user?.guid}
                webpageGuid={webpage?.guid}
                region={params.region}
                webpageUrl={webpage?.url}
                createdAt={params.createdAt}
            />
        </Container>
    );
}
