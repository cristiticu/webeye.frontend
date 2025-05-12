import MonitoredWebpages from '@/monitoredWebpages/MonitoredWebpages';
import { Container } from '@chakra-ui/react';
import useCurrentWebpageState from '@/monitoredWebpages/hooks/useCurrentWebpageState';
import AddScheduledCheck from '../AddScheduledCheck';

export default function AddScheduledCheckPage() {
    const { webpage } = useCurrentWebpageState();

    return (
        <Container
            paddingTop={6}
            position="absolute"
        >
            <MonitoredWebpages>
                <AddScheduledCheck webpageUrl={webpage?.url} />
            </MonitoredWebpages>
        </Container>
    );
}
