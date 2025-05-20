import { Box } from '@chakra-ui/react';
import Onboarding from '../Onboarding';
import BrandTitle from '@/components/BrandTitle';

export default function UserOnboardingPage() {
    return (
        <Box className="onboarding-page">
            <Box className="onboarding-container">
                <BrandTitle size="large" />
                <Onboarding />
            </Box>
        </Box>
    );
}
