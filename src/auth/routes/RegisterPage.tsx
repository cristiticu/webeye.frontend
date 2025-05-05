import '../Auth.less';
import { Box } from '@chakra-ui/react';
import RegisterForm from '../RegisterForm';
import BrandTitle from '@/components/BrandTitle';

export default function LoginPage() {
    return (
        <Box className="auth-page">
            <Box className="auth-container">
                <BrandTitle size="large" />
                <RegisterForm />
            </Box>
        </Box>
    );
}
