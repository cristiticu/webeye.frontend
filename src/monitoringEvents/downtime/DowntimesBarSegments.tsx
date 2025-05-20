import { BarSegment, useChart } from '@chakra-ui/charts';
import { DateTime, Interval } from 'luxon';

type Props = {
    downtimes: { s_at: string; r_at: string }[];
    ongoingDowntimeStart?: string;
    dayStart: DateTime;
    dayEnd: DateTime;
};

export default function DowntimeBar({ downtimes, ongoingDowntimeStart, dayStart, dayEnd }: Props) {
    const now = DateTime.now().toUTC();
    const isToday = now.hasSame(dayStart, 'day');

    const segments = [];

    const downtimeIntervals: Interval[] = downtimes
        .map((dt) => {
            const start = DateTime.fromISO(dt.s_at) < dayStart ? dayStart : DateTime.fromISO(dt.s_at);
            const end = DateTime.fromISO(dt.r_at) > dayEnd ? dayEnd : DateTime.fromISO(dt.r_at);
            return end > start ? Interval.fromDateTimes(start, end) : null;
        })
        .filter(Boolean) as Interval[];

    if (ongoingDowntimeStart) {
        const sAt = DateTime.fromISO(ongoingDowntimeStart);
        const start = sAt < dayStart ? dayStart : sAt;
        const end = dayEnd;
        if (end > start) {
            downtimeIntervals.push(Interval.fromDateTimes(start, end));
        }
    }

    downtimeIntervals.sort((a, b) => a.start.toMillis() - b.start.toMillis());

    let pointer = dayStart;
    let index = 0;
    for (const interval of downtimeIntervals) {
        if (pointer < interval.start) {
            const uptime = Interval.fromDateTimes(pointer, interval.start);
            segments.push({
                name: `uptime-${index}`,
                value: uptime.toDuration('seconds').seconds,
                color: 'green.solid',
            });
        }

        const downtime = interval;

        segments.push({
            name: `downtime-${index}`,
            value: downtime.toDuration('seconds').seconds,
            color: 'red.solid',
        });

        pointer = interval.end;
        index++;
    }

    if (pointer < dayEnd) {
        const finalInterval = Interval.fromDateTimes(pointer, dayEnd);
        const value = finalInterval.toDuration('seconds').seconds;
        segments.push({
            name: isToday && pointer > now ? 'Future' : 'Uptime',
            value,
            color: isToday && pointer > now ? 'gray.solid' : 'green.solid',
        });
    }

    const chart = useChart({
        data: segments,
        // sort: false,
    });

    return (
        <BarSegment.Root
            chart={chart}
            barSize="4"
            w="full"
        >
            <BarSegment.Content>
                <BarSegment.Bar gap="0.5" />
            </BarSegment.Content>
        </BarSegment.Root>
    );
}
