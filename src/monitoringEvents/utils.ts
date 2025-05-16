import { CurrentStatus, MonitoringEvent, RegionsStatus } from './types';
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

export function calculateAverageMeasurement(events: MonitoringEvent[], measurement: string) {
    return events.reduce((acc, event) => acc + (event.results ? Number.parseFloat(event.results[measurement]) : 0), 0) / events.length;
}

export function getEndOfDayUTC(datetime: DateTime) {
    return datetime.toLocal().endOf('day').toUTC().toISO();
}
export function getStartOfDayUTC(datetime: DateTime) {
    return datetime.toLocal().startOf('day').toUTC().toISO();
}
