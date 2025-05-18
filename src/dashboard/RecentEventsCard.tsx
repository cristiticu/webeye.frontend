import NoEventsFiller from '@/components/NoEventsFiller';
import { REGION_DATA } from '@/config';
import { formatDetailedTimestamp } from '@/shared/utils';
import { Heading, Icon, Link, Skeleton, StackSeparator, Timeline, VStack } from '@chakra-ui/react';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { useFetchEventsQuery } from '@/monitoringEvents/service';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useMemo } from 'react';
import { usePreservedNavigate } from '@/shared/hooks/usePreservedNavigate';

type Props = {
    webpageUrl?: string;
};

export default function RecentEventsCard({ webpageUrl }: Props) {
    const navigate = usePreservedNavigate();
    const { data: monitoringEvents, isLoading: isLoadingEvents } = useFetchEventsQuery(webpageUrl ? { url: webpageUrl } : skipToken);

    const events = useMemo(() => (monitoringEvents ? monitoringEvents.data.slice(0, 5) : undefined), [monitoringEvents]);

    const handleSeeAllClick = () => {
        navigate('/event');
    };

    const handleEventClick = (region: string, createdAt: string) => {
        navigate(`/event/${region}/${encodeURIComponent(createdAt)}`);
    };

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
                                    <Timeline.Title
                                        userSelect="none"
                                        color={event.status === 'up' ? 'blue.500' : 'inherit'}
                                        _hover={event.status === 'up' ? { textDecoration: 'underline' } : undefined}
                                        onClick={event.status === 'up' ? () => handleEventClick(event.region, event.c_at) : undefined}
                                    >
                                        {formatDetailedTimestamp(event.c_at)}
                                    </Timeline.Title>
                                    <Timeline.Description>{REGION_DATA[event.region].name}</Timeline.Description>
                                </Timeline.Content>
                            </Timeline.Item>
                        ))}
                </Timeline.Root>

                {events && events.length > 0 && <Link onClick={handleSeeAllClick}>See All</Link>}
            </Skeleton>
        </VStack>
    );
}
