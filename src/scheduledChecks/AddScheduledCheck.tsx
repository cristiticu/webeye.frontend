import { Heading, StackSeparator, VStack } from '@chakra-ui/react';
import { useAddScheduledCheckMutation } from './service';
import ScheduledCheckInput from './ScheduledCheckInput';
import { toaster } from '@/components/ui/toaster';

type Props = {
    webpageUrl: string;
};

export default function AddScheduledCheck({ webpageUrl }: Props) {
    const [addScheduledCheck, { isLoading: isAddingScheduledCheck }] = useAddScheduledCheckMutation();

    const handleAddScheduledCheck = async (
        frequency: string,
        days: string,
        regions: string[],
        checkString: string,
        timeout: number,
        acceptedStatus: string[]
    ) => {
        try {
            await addScheduledCheck({
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
                title: 'Monitor successfully created!',
            });
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
            <Heading>Add a new monitor</Heading>

            <ScheduledCheckInput
                submitText="Create"
                loading={isAddingScheduledCheck}
                onSubmit={handleAddScheduledCheck}
            />
        </VStack>
    );
}
