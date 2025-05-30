import MonitoredWebpages from '@/monitoredWebpages/MonitoredWebpages';
import { Container } from '@chakra-ui/react';
import Dashboard from '../Dashboard';
import useCurrentWebpageState from '@/monitoredWebpages/hooks/useCurrentWebpageState';

export default function DashboardPage() {
    const { webpage } = useCurrentWebpageState();

    return (
        <Container className="page-container">
            <MonitoredWebpages>
                <Dashboard
                    key={webpage?.guid || 'no-website'}
                    webpageGuid={webpage?.guid}
                    webpageUrl={webpage?.url}
                />
            </MonitoredWebpages>
        </Container>
    );
}
