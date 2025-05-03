import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { Box } from '@chakra-ui/react';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const locations = [
    { name: 'us-east-1', coordinates: [-78, 38], status: 'up', monitored: true },
    { name: 'eu-central-1', coordinates: [10, 51], status: 'down', monitored: true },
    { name: 'ap-southeast-2', coordinates: [151, -33], status: 'idle', monitored: false },
];

const selectableZones = [
    {
        name: 'Americas',
        coords: [-100, 20], // lon, lat
        width: 80,
        height: 60,
    },
    {
        name: 'Europe',
        coords: [10, 50],
        width: 40,
        height: 30,
    },
    {
        name: 'Asia-Pacific',
        coords: [120, -10],
        width: 80,
        height: 60,
    },
];

const getColor = (status: string, monitored: boolean) => {
    if (!monitored) return '#999'; // muted
    if (status === 'up') return '#38A169'; // green.500
    if (status === 'down') return '#E53E3E'; // red.500
    return '#CBD5E0'; // gray.300
};

export default function MapTest() {
    return (
        <Box
            width="100%"
            height="auto"
            overflow="hidden"
            background="brand.500"
        >
            <ComposableMap
                projectionConfig={{ scale: 150 }}
                width={800}
                height={400}
            >
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="#EDF2F7" // background color for countries
                                stroke="#EDF2F7" // removes borders
                                style={{
                                    default: { outline: 'none' },
                                    hover: { outline: 'none' },
                                    pressed: { outline: 'none' },
                                }}
                            />
                        ))
                    }
                </Geographies>

                {locations.map(({ name, coordinates, status, monitored }) => (
                    <Marker
                        key={name}
                        coordinates={coordinates}
                    >
                        <circle
                            r={6}
                            fill={getColor(status, monitored)}
                            stroke="#2D3748"
                            strokeWidth={1}
                        />
                    </Marker>
                ))}

                {selectableZones.map((region) => (
                    <g key={region.name}>
                        <Marker coordinates={region.coords}>
                            <rect
                                x={-region.width / 2}
                                y={-region.height / 2}
                                width={region.width}
                                height={region.height}
                                fill="transparent"
                                stroke="gray"
                                strokeDasharray="4"
                                cursor="pointer"
                            />
                            <text
                                y={5}
                                textAnchor="middle"
                                fontSize={12}
                                fill="#2D3748"
                                pointerEvents="none"
                            >
                                {region.name}
                            </text>
                        </Marker>
                    </g>
                ))}
            </ComposableMap>
        </Box>
    );
}
