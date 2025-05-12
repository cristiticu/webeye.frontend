import { skipToken } from '@reduxjs/toolkit/query';
import { useFetchScheduledChecksQuery } from './service';
import EmptyLayout from './EmptyLayout';
import { Skeleton, Box } from '@chakra-ui/react';
import ScheduledCheckCard from './ScheduledCheckCard';

type Props = {
    webpageUrl?: string;
    _isEditing?: boolean;
};

export default function ScheduledChecks({ webpageUrl, _isEditing }: Props) {
    const { data: scheduledChecks, isLoading: isLoadingChecks } = useFetchScheduledChecksQuery(webpageUrl ? { url: webpageUrl } : skipToken);

    return (
        <Box>
            {scheduledChecks && scheduledChecks.length === 0 && <EmptyLayout />}
            <Skeleton
                loading={isLoadingChecks}
                borderRadius="md"
                width="100%"
            >
                {scheduledChecks &&
                    scheduledChecks.length > 0 &&
                    scheduledChecks.map((check) => (
                        <ScheduledCheckCard
                            key={`${check.guid}#${_isEditing}`}
                            guid={check.guid}
                            webpageUrl={webpageUrl}
                            createdAt={check.c_at}
                            frequency={check.interval}
                            timeout={check.configuration.timeout}
                            days={check.days}
                            regions={check.configuration.zones}
                            acceptedStatus={check.configuration.accepted_status}
                            checkString={check.configuration.check_string}
                            _isEditing={_isEditing}
                        />
                    ))}
            </Skeleton>
        </Box>
    );
}
