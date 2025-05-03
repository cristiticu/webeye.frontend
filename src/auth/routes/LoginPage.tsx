import '../auth.less';
import { Box } from '@chakra-ui/react';
import LoginForm from '../LoginForm';
import BrandTitle from '@/shared/BrandTitle';

export default function LoginPage() {
    return (
        <Box className="auth-page">
            <Box className="auth-container">
                <BrandTitle />
                <LoginForm />
            </Box>
        </Box>
    );
}
