import { Box, Heading, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
    title: string;
    children?: ReactNode;
};

export default function AuthCard({ title, children }: Props) {
    return (
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
}
