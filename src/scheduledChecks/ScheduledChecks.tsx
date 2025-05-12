import { skipToken } from '@reduxjs/toolkit/query';
import { useFetchScheduledChecksQuery } from './service';
import EmptyLayout from './EmptyLayout';
import { Skeleton, VStack } from '@chakra-ui/react';
import ScheduledCheckInformation from './ScheduledCheckInformation';

type Props = {
    webpageUrl?: string;
    _isEditing?: boolean;
};

export default function ScheduledChecks({ webpageUrl, _isEditing }: Props) {
    const { data: scheduledChecks, isLoading: isLoadingChecks } = useFetchScheduledChecksQuery(webpageUrl ? { url: webpageUrl } : skipToken);

    return (
        <VStack align="stretch">
            {scheduledChecks && scheduledChecks.length === 0 && <EmptyLayout />}
            <Skeleton
                loading={isLoadingChecks}
                borderRadius="md"
            >
                {scheduledChecks &&
                    scheduledChecks.length > 0 &&
                    scheduledChecks.map((check, index) => (
                        <ScheduledCheckInformation
                            key={`${check.guid}#${_isEditing}`}
                            guid={check.guid}
                            index={index}
                            createdAt={check.c_at}
                            interval={check.interval}
                            timeout={check.configuration.timeout}
                            days={check.days}
                            zones={check.configuration.zones}
                            acceptedStatus={check.configuration.accepted_status}
                            checkString={check.configuration.check_string}
                            _isEditing={_isEditing}
                        />
                    ))}
            </Skeleton>
        </VStack>
    );
}
