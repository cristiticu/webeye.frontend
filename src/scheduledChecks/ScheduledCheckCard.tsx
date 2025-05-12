import { formatPrettyTimestamp } from '@/shared/utils';
import { Flex, Heading, StackSeparator, Text, VStack } from '@chakra-ui/react';
import ScheduledCheckInformation from './ScheduledCheckInformation';
import { useState } from 'react';
import ScheduledCheckInput from './ScheduledCheckInput';
import { toaster } from '@/components/ui/toaster';
import { useUpdateScheduledCheckMutation } from './service';
import DeleteScheduledCheckButton from './DeleteScheduledCheckButton';

type Props = {
    guid: string;
    webpageUrl: string;
    createdAt: string;
    frequency: string;
    days: string;
    regions: string[];
    checkString: string;
    timeout: number;
    acceptedStatus: string[];
    _isEditing?: boolean;
};

export default function ScheduledCheckCard({ guid, webpageUrl, createdAt, frequency, days, regions, checkString, timeout, acceptedStatus, _isEditing }: Props) {
    const [isEditing, setIsEditing] = useState<boolean>(_isEditing);

    const [updateScheduledCheck, { isLoading: isUpdatingScheduledCheck }] = useUpdateScheduledCheckMutation();

    const handleUpdateScheduledCheck = async (
        frequency: string,
        days: string,
        regions: string[],
        checkString: string,
        timeout: number,
        acceptedStatus: string[]
    ) => {
        try {
            await updateScheduledCheck({
                guid,
                url: webpageUrl,
                interval: frequency,
                days,
                zones: regions,
                check_string: checkString || null,
                timeout: timeout * 1000,
                accepted_status: acceptedStatus,
            }).unwrap();

            toaster.create({
                type: 'success',
                title: 'Changes saved successfully!',
            });

            setIsEditing(false);
        } catch (_) {
            toaster.create({
                type: 'error',
                title: 'Something went wrong! Please try again',
            });
        }
    };

    return (
        <VStack
            borderWidth="1px"
            borderRadius="xl"
            p={4}
            gap={2}
            separator={<StackSeparator />}
            alignItems="baseline"
        >
            <Flex
                width="100%"
                justify="space-between"
                mb={2}
            >
                <Heading>Page Speed & Downtime check</Heading>
                <Flex
                    alignItems="center"
                    gap="12px"
                >
                    <Text
                        fontSize="sm"
                        color="gray.500"
                    >
                        {formatPrettyTimestamp(createdAt)}
                    </Text>
                    <DeleteScheduledCheckButton
                        webpageUrl={webpageUrl}
                        guid={guid}
                    />
                </Flex>
            </Flex>

            {!isEditing && (
                <ScheduledCheckInformation
                    frequency={frequency}
                    days={days}
                    regions={regions}
                    checkString={checkString}
                    timeout={timeout}
                    acceptedStatus={acceptedStatus}
                    onEdit={() => setIsEditing(true)}
                />
            )}

            {isEditing && (
                <ScheduledCheckInput
                    initialFrequency={frequency}
                    initialAcceptedStatus={acceptedStatus}
                    initialCheckString={checkString}
                    initialDays={days}
                    initialRegions={regions}
                    initialTimeout={timeout}
                    submitText="Save"
                    loading={isUpdatingScheduledCheck}
                    onSubmit={handleUpdateScheduledCheck}
                    onCancel={() => setIsEditing(false)}
                />
            )}
        </VStack>
    );
}
