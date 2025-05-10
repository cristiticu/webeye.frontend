import NoEventsFiller from '@/components/NoEventsFiller';
import { REGION_DATA } from '@/config';
import useGetMonitoringEvents from '@/monitoringEvents/hooks/useGetMonitoringEvents';
import { formatDetailedTimestamp } from '@/shared/utils';
import { Heading, Icon, Link, Skeleton, StackSeparator, Timeline, VStack } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { Link as RouterLink } from 'react-router-dom';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

const now = DateTime.now().toUTC();
const startAt = now.minus({ hours: 1 });

type Props = {
    webpageUrl?: string;
};

export default function RecentEventsCard({ webpageUrl }: Props) {
    const { events, isLoadingEvents } = useGetMonitoringEvents({ url: webpageUrl, startAt, endAt: now.endOf('day'), maxEvents: 5 });

    return (
        <VStack
            gap={2}
            separator={<StackSeparator />}
        >
            <Heading alignSelf="self-start">Recent Events</Heading>
            <Skeleton
                variant="pulse"
                loading={isLoadingEvents}
            >
                <Timeline.Root
                    size="sm"
                    variant="plain"
                >
                    {events && events.length === 0 && <NoEventsFiller />}

                    {events &&
                        events.length > 0 &&
                        events.map((event) => (
                            <Timeline.Item key={event.c_at}>
                                <Timeline.Connector>
                                    <Timeline.Separator />
                                    <Timeline.Indicator outline="none">
                                        {event.status === 'up' && (
                                            <Icon
                                                fill="success"
                                                size="lg"
                                            >
                                                <AiFillCheckCircle />
                                            </Icon>
                                        )}
                                        {event.status === 'down' && (
                                            <Icon
                                                fill="danger"
                                                size="lg"
                                            >
                                                <AiFillCloseCircle fill="danger" />
                                            </Icon>
                                        )}
                                    </Timeline.Indicator>
                                </Timeline.Connector>
                                <Timeline.Content>
                                    <Timeline.Title>{formatDetailedTimestamp(event.c_at)}</Timeline.Title>
                                    <Timeline.Description>{REGION_DATA[event.region].name}</Timeline.Description>
                                </Timeline.Content>
                            </Timeline.Item>
                        ))}
                </Timeline.Root>

                {events && events.length > 0 && (
                    <Link asChild>
                        <RouterLink to="/check">See All</RouterLink>
                    </Link>
                )}
            </Skeleton>
        </VStack>
    );
}
