import { CurrentStatus, RegionsStatus } from './types';
import { DateTime } from 'luxon';

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

export function getEndOfDayUTC(datetime: DateTime) {
    return datetime.toLocal().endOf('day').toUTC().toISO();
}
export function getStartOfDayUTC(datetime: DateTime) {
    return datetime.toLocal().startOf('day').toUTC().toISO();
}
