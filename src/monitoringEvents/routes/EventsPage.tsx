import useCurrentWebpageState from '@/monitoredWebpages/hooks/useCurrentWebpageState';
import MonitoredWebpages from '@/monitoredWebpages/MonitoredWebpages';
import { Container } from '@chakra-ui/react';
import MonitoringEvents from '../MonitoringEvents';

export default function EventsPage() {
    const { webpage } = useCurrentWebpageState();

    return (
        <Container
            paddingTop={6}
            position="absolute"
        >
            <MonitoredWebpages>
                <MonitoringEvents webpageUrl={webpage?.url} />
            </MonitoredWebpages>
        </Container>
    );
}
