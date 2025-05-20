import { useMemo } from 'react';
import { DowntimePeriod, GeneralContext, GenericDowntime } from '../types';
import { DateTime, Duration } from 'luxon';

type Params = {
    downtimes?: DowntimePeriod[];
    generalContext?: GeneralContext;
    dayStart: DateTime;
    dayEnd: DateTime;
};

export default function useProcessDowntimes({ downtimes, generalContext, dayEnd, dayStart }: Params) {
    const allDowntimeDurations = useMemo<GenericDowntime[]>(() => {
        const records: GenericDowntime[] = [];

        if (downtimes) {
            for (const dt of downtimes) {
                const sAt = DateTime.fromISO(dt.s_at);
                const rAt = DateTime.fromISO(dt.r_at);
                const start = sAt < dayStart ? dayStart : sAt;
                const end = rAt > dayEnd ? dayEnd : rAt;

                if (end > start) {
                    records.push({
                        startAt: start,
                        endAt: end,
                        error: dt.error,
                    });
                }
            }
        }

        if (generalContext?.downtime_s_at) {
            const sAt = DateTime.fromISO(generalContext.downtime_s_at);
            const start = sAt < dayStart ? dayStart : sAt;
            const end = dayEnd;

            if (end > start) {
                records.push({
                    startAt: start,
                    endAt: end,
                    error: generalContext.error ?? 'Unknown error',
                });
            }
        }

        return records;
    }, [downtimes, generalContext?.downtime_s_at, generalContext?.error, dayStart, dayEnd]);

    const totalSeconds = useMemo(() => {
        return Math.floor(
            allDowntimeDurations.reduce((sum, dt) => {
                return sum + dt.endAt.diff(dt.startAt, 'seconds').seconds;
            }, 0)
        );
    }, [allDowntimeDurations]);

    const dayDurationSeconds = Math.floor(dayEnd.diff(dayStart, 'seconds').seconds);

    const downtimePercentage = useMemo(() => {
        if (dayDurationSeconds === 0) return 0;
        return ((dayDurationSeconds - totalSeconds) / dayDurationSeconds) * 100;
    }, [totalSeconds, dayDurationSeconds]);

    const formattedDuration = useMemo(() => {
        const dur = Duration.fromObject({ seconds: totalSeconds }).shiftTo('hours', 'minutes', 'seconds');
        const parts = [];
        if (dur.hours) parts.push(`${dur.hours} hours`);
        if (dur.minutes) parts.push(`${dur.minutes} minutes`);
        if (dur.seconds || parts.length === 0) parts.push(`${Math.floor(dur.seconds)} seconds`);
        return parts.join(' ');
    }, [totalSeconds]);

    return {
        allDowntimeDurations,
        downtimePercentage,
        formattedDuration,
    };
}
