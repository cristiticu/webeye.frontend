import { createListCollection } from '@chakra-ui/react';

export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL || '';
export const SCREENSHOT_STORAGE_URL = import.meta.env.VITE_SCREENSHOT_STORAGE_URL || '';
export const HAR_STORAGE_URL = import.meta.env.VITE_HAR_STORAGE_URL || '';
export const HAR_VIEWER_URL = import.meta.env.VITE_HAR_VIEWER_URL || '';

export const GENERAL_CONTEXT_LONG_POLLING_MS = 60 * 1000;
export const REGIONS_STATUS_LONG_POLLING_MS = 60 * 1000;

export const METRIC_THRESHOLDS = {
    'dom-interactive': {
        type: 'time',
        good: 1500,
        medium: 3000,
    },
    'load-duration': {
        type: 'time',
        good: 2500,
        medium: 5000,
    },
    'first-paint': {
        type: 'time',
        good: 1000,
        medium: 2000,
    },
    'dom-content-loaded': {
        type: 'time',
        good: 2000,
        medium: 4000,
    },
    'time-to-first-byte': {
        type: 'time',
        good: 800,
        medium: 1800,
    },
    'first-contentful-paint': {
        type: 'time',
        good: 1800,
        medium: 3000,
    },
    'cumulative-layout-shift': {
        type: 'score',
        good: 0.1,
        medium: 0.25,
    },
};

export const REGION_DATA = {
    'us-east-1': { name: 'North Virginia', countryCode: 'US', title: 'United States' },
    'us-east-2': { name: 'Ohio', countryCode: 'US', title: 'United States' },
    'us-west-1': { name: 'North California', countryCode: 'US', title: 'United States' },
    'us-west-2': { name: 'Oregon', countryCode: 'US', title: 'United States' },
    'ca-central-1': { name: 'Canada', countryCode: 'CA', title: 'Canada' },
    'sa-east-1': { name: 'Sao Paulo', countryCode: 'BR', title: 'Brazil' },
    'ap-south-1': { name: 'Mumbai', countryCode: 'IN', title: 'India' },
    'ap-southeast-1': { name: 'Singapore', countryCode: 'SG', title: 'Singapore' },
    'ap-southeast-2': { name: 'Sydney', countryCode: 'AU', title: 'Australia' },
    'ap-northeast-1': { name: 'Tokyo', countryCode: 'JP', title: 'Japan' },
    'ap-northeast-2': { name: 'Seoul', countryCode: 'KR', title: 'South Korea' },
    'ap-northeast-3': { name: 'Osaka', countryCode: 'JP', title: 'Japan' },
    'eu-central-1': { name: 'Frankfurt', countryCode: 'DE', title: 'Germany' },
    'eu-west-1': { name: 'Ireland', countryCode: 'IE', title: 'Ireland' },
    'eu-west-2': { name: 'London', countryCode: 'GB', title: 'United Kingdom' },
    'eu-west-3': { name: 'Paris', countryCode: 'FR', title: 'France' },
    'eu-north-1': { name: 'Stockholm', countryCode: 'SE', title: 'Sweden' },
};

export const AVAILABLE_FREQUENCIES = {
    '1m': 'minute',
    '2m': '2 minutes',
    '5m': '5 minutes',
    '10m': '10 minutes',
    '15m': '15 minutes',
    '30m': '30 minutes',
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
