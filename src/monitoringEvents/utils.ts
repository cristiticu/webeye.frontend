import { CurrentStatus, RegionsStatus } from './types';

export function mapRegionsStatus(regionsStatusList: CurrentStatus[]) {
    const regionsStatus: RegionsStatus = {};

    regionsStatusList.forEach((regionStatus) => {
        regionsStatus[regionStatus.region] = {
            status: regionStatus.status,
            lastUpdated: regionStatus.m_at,
            error: regionStatus.error,
        };
    });

    return regionsStatus;
}
