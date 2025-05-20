import useCurrentWebpageState from '@/monitoredWebpages/hooks/useCurrentWebpageState';
import MonitoredWebpages from '@/monitoredWebpages/MonitoredWebpages';
import { Container } from '@chakra-ui/react';
import Downtimes from '../downtime/Downtimes';

export default function DowntimesPage() {
    const { webpage } = useCurrentWebpageState();

    return (
        <Container
            paddingTop={6}
            position="absolute"
        >
            <MonitoredWebpages>
                <Downtimes webpageUrl={webpage?.url} />
            </MonitoredWebpages>
        </Container>
    );
}
