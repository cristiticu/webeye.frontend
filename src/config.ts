import { createListCollection } from '@chakra-ui/react';

export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL || '';
export const SCREENSHOT_STORAGE_URL = import.meta.env.VITE_SCREENSHOT_STORAGE_URL || '';
export const HAR_STORAGE_URL = import.meta.env.VITE_HAR_STORAGE_URL || '';

export const GENERAL_CONTEXT_LONG_POLLING_MS = 60 * 1000;
export const REGIONS_STATUS_LONG_POLLING_MS = 60 * 1000;

export const REGION_DATA = {
    'us-east-1': { name: 'North Virginia' },
    'us-east-2': { name: 'Ohio' },
    'us-west-1': { name: 'North California' },
    'us-west-2': { name: 'Oregon' },
    'ca-central-1': { name: 'Canada' },
    'sa-east-1': { name: 'Sao Paulo' },
    'ap-south-1': { name: 'Mumbai' },
    'ap-southeast-1': { name: 'Singapore' },
    'ap-southeast-2': { name: 'Sydney' },
    'ap-northeast-1': { name: 'Tokyo' },
    'ap-northeast-2': { name: 'Seoul' },
    'ap-northeast-3': { name: 'Osaka' },
    'eu-central-1': { name: 'Frankfurt' },
    'eu-west-1': { name: 'Ireland' },
    'eu-west-2': { name: 'London' },
    'eu-west-3': { name: 'Paris' },
    'eu-north-1': { name: 'Stockholm' },
};

export const AVAILABLE_FREQUENCIES = {
    '1m': 'minute',
    '2m': '2 minutes',
    '5m': '5 minutes',
    '10m': '10 minutes',
    '15m': '15 minutes',
    '30m': 'half an hour',
};

export const FREQUENCY_LIST = createListCollection({
    items: Object.keys(AVAILABLE_FREQUENCIES).map((key) => ({
        label: AVAILABLE_FREQUENCIES[key],
        value: key,
    })),
});

export const AVAILABLE_REGIONS = {
    america: 'Americas',
    europe: 'Europe',
    asia_pacific: 'Asia Pacific',
};

export const REGIONS_LIST = createListCollection({
    items: Object.keys(AVAILABLE_REGIONS).map((key) => ({
        label: AVAILABLE_REGIONS[key],
        value: key,
    })),
});

export const AVAILABLE_DAY_FILTERS = {
    all: 'Everyday',
    weekdays: 'Only weekdays',
    weekend: 'Only on the weekend',
};

export const DAY_FILTERS_LIST = createListCollection({
    items: Object.keys(AVAILABLE_DAY_FILTERS).map((key) => ({
        label: AVAILABLE_DAY_FILTERS[key],
        value: key,
    })),
});

export const RESPONSE_STATUS_LIST = createListCollection({
    items: [
        { label: '1xx', value: '1xx' },
        { label: '2xx', value: '2xx' },
        { label: '3xx', value: '3xx' },
        { label: '4xx', value: '4xx' },
        { label: '5xx', value: '5xx' },
    ],
});
