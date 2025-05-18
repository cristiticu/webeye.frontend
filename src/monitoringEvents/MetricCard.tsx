import { getColor } from '@/shared/utils';
import { Card } from '@chakra-ui/react';

type Props = {
    metric: string;
    label: string;
    value: string;
    divide: number;
    unit: string;
};

export default function MetricCard({ metric, label, divide, unit, value }: Props) {
    const numberValue = Number.parseFloat(value);

    return (
        <Card.Root size="sm">
            <Card.Body gap="2">
                <Card.Title
                    fontSize="sm"
                    color="gray.500"
                    mb={1}
                >
                    {label}
                </Card.Title>
                <Card.Description
                    fontWeight="semibold"
                    fontSize="lg"
                    color={getColor(numberValue, metric)}
                >
                    {`${(numberValue / divide).toFixed(3)} ${unit}`}
                </Card.Description>
            </Card.Body>
        </Card.Root>
    );
}
