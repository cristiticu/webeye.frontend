import './shared.less';
import { Box, Heading, Icon } from '@chakra-ui/react';
import { AiOutlineEye } from 'react-icons/ai';

export default function BrandTitle() {
    return (
        <Box className="brand-title">
            <Icon className="brand-icon">
                <AiOutlineEye />
            </Icon>
            <Heading className="brand-title-text">Webeye</Heading>
        </Box>
    );
}
