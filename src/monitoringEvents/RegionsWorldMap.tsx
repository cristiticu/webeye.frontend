import { Box, chakra, Popover, Portal } from '@chakra-ui/react';
import { RegionsStatus } from './types';
import RegionTooltip from './RegionTooltip';

const regions = [
    { name: 'North Virginia', key: 'us-east-1', coordinates: [-88, 38.95] },
    { name: 'Ohio', key: 'us-east-2', coordinates: [-95, 40.0] },
    { name: 'North California', key: 'us-west-1', coordinates: [-130, 40] },
    { name: 'Oregon', key: 'us-west-2', coordinates: [-130, 45] },
    { name: 'Canada', key: 'ca-central-1', coordinates: [-85, 45.4] },
    { name: 'Sao Paulo', key: 'sa-east-1', coordinates: [-58, -24] },

    { name: 'Mumbai', key: 'ap-south-1', coordinates: [63, 22] },
    { name: 'Singapore', key: 'ap-southeast-1', coordinates: [93, 2] },
    { name: 'Sydney', key: 'ap-southeast-2', coordinates: [139, -34] },
    { name: 'Tokyo', key: 'ap-northeast-1', coordinates: [128, 39] },
    { name: 'Seoul', key: 'ap-northeast-2', coordinates: [114, 43] },
    { name: 'Osaka', key: 'ap-northeast-3', coordinates: [123, 36] },

    { name: 'Frankfurt', key: 'eu-central-1', coordinates: [-2, 54] },
    { name: 'Ireland', key: 'eu-west-1', coordinates: [-18, 58] },
    { name: 'London', key: 'eu-west-2', coordinates: [-10, 56] },
    { name: 'Paris', key: 'eu-west-3', coordinates: [-7, 52] },
    { name: 'Stockholm', key: 'eu-north-1', coordinates: [7, 65] },
];

const originalWidth = 2000;
const originalHeight = 1001;

const projectCoords = (lon: number, lat: number) => {
    const x = ((lon + 180) / 360) * originalWidth;
    const y = ((90 - lat) / 180) * originalHeight;

    return { x, y };
};

type Props = {
    regionsStatus: RegionsStatus;
    width: number;
    height: number;
};

export default function RegionsWorldMap({ regionsStatus, width, height }: Props) {
    return (
        <Box
            position="relative"
            width={`${width}px`}
            height={`${height}px`}
        >
            <svg
                viewBox={`0 0 ${originalWidth} ${originalHeight}`}
                width="100%"
                style={{ display: 'block' }}
            >
                <image
                    href="/worldMap.svg"
                    x="0"
                    y="0"
                    width={originalWidth}
                    height={originalHeight}
                    preserveAspectRatio="xMidYMid meet"
                />

                {regions.map(({ key, coordinates, name }) => {
                    const { x, y } = projectCoords(coordinates[0], coordinates[1]);

                    const fill = regionsStatus[key]?.status === 'up' ? 'green.500' : regionsStatus[key]?.status === 'down' ? 'red.500' : 'gray.400';
                    const stroke = regionsStatus[key]?.status === 'up' ? 'green.700' : regionsStatus[key]?.status === 'down' ? 'red.700' : 'gray.700';

                    return (
                        <Popover.Root key={key}>
                            <Popover.Trigger asChild>
                                <chakra.svg
                                    fill={fill}
                                    stroke={stroke}
                                >
                                    <circle
                                        cx={x}
                                        cy={y}
                                        r="13"
                                        strokeWidth="6"
                                    />
                                </chakra.svg>
                            </Popover.Trigger>

                            <Portal>
                                <Popover.Positioner>
                                    <Popover.Content>
                                        <RegionTooltip
                                            region={key}
                                            regionName={name}
                                            status={regionsStatus[key]?.status || 'unknown'}
                                            error={regionsStatus[key]?.error}
                                            lastUpdated={regionsStatus[key]?.lastUpdated}
                                        />
                                    </Popover.Content>
                                </Popover.Positioner>
                            </Portal>
                        </Popover.Root>
                    );
                })}
            </svg>
        </Box>
    );
}
