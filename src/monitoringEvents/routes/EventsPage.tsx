import useCurrentWebpageState from '@/monitoredWebpages/hooks/useCurrentWebpageState';
import MonitoredWebpages from '@/monitoredWebpages/MonitoredWebpages';
import { Container } from '@chakra-ui/react';
import MonitoringEvents from '../checkEvent/MonitoringEvents';

export default function EventsPage() {
    const { webpage } = useCurrentWebpageState();

    return (
        <Container className="page-container">
            <MonitoredWebpages>
                <MonitoringEvents webpageUrl={webpage?.url} />
            </MonitoredWebpages>
        </Container>
    );
}
