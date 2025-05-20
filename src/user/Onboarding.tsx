import './Onboarding.less';
import AddMonitoredWebpage from '@/monitoredWebpages/wizard/AddMonitoredWebpage';
import { usePreservedNavigate } from '@/shared/hooks/usePreservedNavigate';
import { Box, VStack, Heading } from '@chakra-ui/react';

export default function Onboarding() {
    const navigate = usePreservedNavigate();

    return (
        <Box className="onboarding-card">
            <VStack className="onboarding-stack">
                <Heading
                    className="onboarding-card-heading"
                    size="xl"
                >
                    Your first monitored webpage
                </Heading>
                <AddMonitoredWebpage onFinishSetup={() => navigate('/dashboard')} />
            </VStack>
        </Box>
    );
}
