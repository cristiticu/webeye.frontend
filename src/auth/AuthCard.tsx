import { Box, Heading, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
    title: string;
    children?: ReactNode;
};

export const AuthCard = ({ title, children }: Props) => (
    <Box className="auth-card">
        <VStack className="card-stack">
            <Heading
                className="auth-card-heading"
                size="xl"
            >
                {title}
            </Heading>
            {children}
        </VStack>
    </Box>
);
