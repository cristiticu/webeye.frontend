import MonitoredWebpages from '@/monitoredWebpages/MonitoredWebpages';
import { Container } from '@chakra-ui/react';

export default function ScheduledChecksPage() {
    return (
        <Container
            paddingTop={6}
            position="absolute"
        >
            <MonitoredWebpages>Hello</MonitoredWebpages>
        </Container>
    );
}
