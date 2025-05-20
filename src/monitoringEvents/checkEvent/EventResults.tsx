import { Heading, SimpleGrid, StackSeparator, VStack } from '@chakra-ui/react';
import MetricCard from './MetricCard';

const performanceMetrics = [
    { key: 'redirect-duration', label: 'Redirect Duration', divide: 1000, unit: 's' },
    { key: 'dns-duration', label: 'DNS Duration', divide: 1000, unit: 's' },
    { key: 'tcp-handshake-duration', label: 'TCP Handshake Duration', divide: 1000, unit: 's' },
    { key: 'tls-duration', label: 'TLS Duration', divide: 1000, unit: 's' },
    { key: 'backend-duration', label: 'Backend Duration', divide: 1000, unit: 's' },
    { key: 'time-to-first-byte', label: 'Time to First Byte (TTFB)', divide: 1000, unit: 's' },
    { key: 'download-duration', label: 'Download Duration', divide: 1000, unit: 's' },
    { key: 'encoded-body-size', label: 'Encoded Body Size', divide: 1024, unit: 'kB' },
    { key: 'decoded-body-size', label: 'Decoded Body Size', divide: 1024, unit: 'kB' },
    { key: 'dom-interactive', label: 'DOM Interactive', divide: 1000, unit: 's' },
    { key: 'dom-content-loaded', label: 'DOM Content Loaded', divide: 1000, unit: 's' },
    { key: 'load-duration', label: 'Load Duration', divide: 1000, unit: 's' },
];

const coreWebVitals = [
    { key: 'first-paint', label: 'First Paint', divide: 1000, unit: 's' },
    { key: 'first-contentful-paint', label: 'First Contentful Paint', divide: 1000, unit: 's' },
    { key: 'largest-contentful-paint', label: 'Largest Contentful Paint', divide: 1000, unit: 's' },
    { key: 'cumulative-layout-shift', label: 'Cumulative Layout Shift', divide: 1, unit: '' },
];

type Props = {
    results: Record<string, string>;
};

export default function EventResults({ results }: Props) {
    return (
        <>
            <VStack
                width="100%"
                p={4}
                gap={4}
                separator={<StackSeparator />}
                alignItems="baseline"
            >
                <Heading size="md">Core Web Vitals</Heading>

                <SimpleGrid
                    columns={[1, 2, 3]}
                    rowGap={6}
                    columnGap={2}
                    width="100%"
                >
                    {coreWebVitals.map((item) => (
                        <MetricCard
                            key={item.key}
                            metric={item.key}
                            label={item.label}
                            value={results[item.key] || 'NaN'}
                            divide={item.divide}
                            unit={item.unit}
                        />
                    ))}
                </SimpleGrid>
            </VStack>

            <VStack
                width="100%"
                p={4}
                gap={4}
                separator={<StackSeparator />}
                alignItems="baseline"
            >
                <Heading size="md">Performance Metrics</Heading>

                <SimpleGrid
                    columns={[1, 2, 3, 4]}
                    rowGap={6}
                    columnGap={2}
                    width="100%"
                >
                    {performanceMetrics.map((item) => (
                        <MetricCard
                            key={item.key}
                            metric={item.key}
                            label={item.label}
                            value={results[item.key] || 'NaN'}
                            divide={item.divide}
                            unit={item.unit}
                        />
                    ))}
                </SimpleGrid>
            </VStack>
        </>
    );
}
