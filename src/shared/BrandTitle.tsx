import './shared.less';
import { Box, Heading, Icon } from '@chakra-ui/react';
import { AiOutlineEye } from 'react-icons/ai';

type Props = {
    size: 'medium' | 'large';
};

export default function BrandTitle({ size }: Props) {
    return (
        <Box className="brand-title">
            <Icon className={`brand-icon ${size}`}>
                <AiOutlineEye />
            </Icon>
            <Heading className={`brand-title-text ${size}`}>Webeye</Heading>
        </Box>
    );
}
