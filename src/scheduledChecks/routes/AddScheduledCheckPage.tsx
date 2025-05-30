import MonitoredWebpages from '@/monitoredWebpages/MonitoredWebpages';
import { Container } from '@chakra-ui/react';
import useCurrentWebpageState from '@/monitoredWebpages/hooks/useCurrentWebpageState';
import AddScheduledCheck from '../AddScheduledCheck';

export default function AddScheduledCheckPage() {
    const { webpage } = useCurrentWebpageState();

    return (
        <Container className="page-container">
            <MonitoredWebpages>
                <AddScheduledCheck webpageUrl={webpage?.url} />
            </MonitoredWebpages>
        </Container>
    );
}
