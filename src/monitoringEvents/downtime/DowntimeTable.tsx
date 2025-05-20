import { Table, Text } from '@chakra-ui/react';
import { GenericDowntime } from '../types';

type Props = {
    records: GenericDowntime[];
};

export default function DowntimeTable({ records }: Props) {
    return (
        <>
            {!records?.length && <Text>No downtimes for this day.</Text>}

            {records?.length > 0 && (
                <Table.Root size="sm">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Start</Table.ColumnHeader>
                            <Table.ColumnHeader>End</Table.ColumnHeader>
                            <Table.ColumnHeader>Error</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="end">Duration</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {records.map((item, idx) => {
                            const duration = item.endAt.diff(item.startAt, ['minutes', 'seconds']);
                            const durationStr = `${Math.floor(duration.minutes)}m ${Math.floor(duration.seconds)}s`;

                            return (
                                <Table.Row key={`${item.startAt.toISO()}-${idx}`}>
                                    <Table.Cell fontFamily="mono">{item.startAt.toFormat('HH:mm:ss')}</Table.Cell>
                                    <Table.Cell fontFamily="mono">{item.endAt.toFormat('HH:mm:ss')}</Table.Cell>
                                    <Table.Cell>{item.error}</Table.Cell>
                                    <Table.Cell textAlign="end">{durationStr}</Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table.Root>
            )}
        </>
    );
}
