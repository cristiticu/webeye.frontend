import useCurrentWebpageState from '@/monitoredWebpages/hooks/useCurrentWebpageState';
import MonitoredWebpages from '@/monitoredWebpages/MonitoredWebpages';
import { Container } from '@chakra-ui/react';

export default function DowntimesPage() {
    const { webpage } = useCurrentWebpageState();

    return (
        <Container
            paddingTop={6}
            position="absolute"
        >
            <MonitoredWebpages>Downtimes</MonitoredWebpages>
        </Container>
    );
}
