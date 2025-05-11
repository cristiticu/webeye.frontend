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
