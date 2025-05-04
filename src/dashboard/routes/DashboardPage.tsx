import MonitoredWebpagesTabs from '@/monitoredWebpages/MonitoredWebpagesTabs';
import { Container } from '@chakra-ui/react';
import Test from '../Test';

export default function DashboardPage() {
    return (
        <Container
            paddingTop={6}
            position="absolute"
        >
            <MonitoredWebpagesTabs>
                <Test />
            </MonitoredWebpagesTabs>
        </Container>
    );
}
