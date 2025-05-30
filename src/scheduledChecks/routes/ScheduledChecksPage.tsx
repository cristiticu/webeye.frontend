import MonitoredWebpages from '@/monitoredWebpages/MonitoredWebpages';
import { Container } from '@chakra-ui/react';
import ScheduledChecks from '../ScheduledChecks';
import useCurrentWebpageState from '@/monitoredWebpages/hooks/useCurrentWebpageState';
import { useLocation } from 'react-router-dom';

export default function ScheduledChecksPage() {
    const location = useLocation();
    const { webpage } = useCurrentWebpageState();

    return (
        <Container className="page-container">
            <MonitoredWebpages>
                <ScheduledChecks
                    key={webpage?.guid || 'no-website'}
                    webpageUrl={webpage?.url}
                    _isEditing={location.state?.isEditing}
                />
            </MonitoredWebpages>
        </Container>
    );
}
