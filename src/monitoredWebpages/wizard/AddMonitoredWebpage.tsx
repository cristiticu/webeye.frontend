import { For, Steps, Text } from '@chakra-ui/react';
import { RefObject, useState } from 'react';
import UrlStep from './UrlStep';
import RegionsFrequencyStep from './RegionsFrequencyStep';
import ValidationStep from './ValidationStep';
import CompleteStep from './CompleteStep';
import { useAddMonitoredWebpageMutation } from '../service';
import { useAddScheduledCheckMutation } from '@/scheduledChecks/service';

const wizardSteps = [
    {
        index: 0,
        title: 'Add an URL',
    },
    {
        index: 1,
        title: 'Regions & frequency',
    },
    {
        index: 2,
        title: 'Response validation',
    },
];

type Props = {
    showSkipButton?: boolean;
    contentRef?: RefObject<HTMLDivElement>;
    onFinishSetup: () => void;
};

export default function AddMonitoredWebpage({ showSkipButton, contentRef, onFinishSetup }: Props) {
    const [url, setUrl] = useState<string>('');
    const [frequency, setFrequency] = useState<string>('');
    const [dayFilter, setDayFilter] = useState<string>('all');
    const [regions, setRegions] = useState<string[]>([]);
    const [responseStatuses, setResponseStatuses] = useState<string[]>(['2xx', '3xx']);
    const [checkString, setCheckString] = useState<string>('');
    const [timeout, setTimeout] = useState<number>(20);

    const [currentStep, setCurrentStep] = useState<number>(0);
    const [error, setError] = useState<string>('');

    const [addMonitoredWebpage] = useAddMonitoredWebpageMutation();
    const [addScheduledCheck] = useAddScheduledCheckMutation();

    const handleFinishInputCollection = async () => {
        setError('');
        setCurrentStep((_) => _ + 1);

        try {
            await addMonitoredWebpage({ url }).unwrap();
            await addScheduledCheck({
                url,
                interval: frequency,
                days: dayFilter,
                zones: regions,
                check_string: checkString || null,
                accepted_status: responseStatuses,
                timeout: timeout * 1000,
            }).unwrap();
        } catch (error) {
            if (error.data?.message) {
                setError(error.data.message);
            } else {
                setError('An error occurred! Please try again');
            }

            setCurrentStep(2);
            return;
        }

        onFinishSetup();
    };

    return (
        <Steps.Root
            size="sm"
            variant="subtle"
            count={wizardSteps.length}
            step={currentStep}
        >
            <Steps.List>
                <For each={wizardSteps}>
                    {(step) => (
                        <Steps.Item
                            key={step.index}
                            index={step.index}
                        >
                            <Steps.Indicator />
                            <Steps.Title>{step.title}</Steps.Title>
                            <Steps.Separator />
                        </Steps.Item>
                    )}
                </For>
            </Steps.List>

            <Steps.Content index={0}>
                <UrlStep
                    url={url}
                    onUrlChange={setUrl}
                    onStepFinish={() => setCurrentStep((_) => _ + 1)}
                    showSkipButton={showSkipButton}
                />
            </Steps.Content>
            <Steps.Content index={1}>
                <RegionsFrequencyStep
                    regions={regions}
                    frequency={frequency}
                    dayFilter={dayFilter}
                    contentRef={contentRef}
                    onRegionsChange={setRegions}
                    onDayFilterChange={setDayFilter}
                    onFrequencyChange={setFrequency}
                    onStepFinish={() => setCurrentStep((_) => _ + 1)}
                    onStepBack={() => setCurrentStep((_) => _ - 1)}
                />
            </Steps.Content>
            <Steps.Content index={2}>
                <ValidationStep
                    responseStatuses={responseStatuses}
                    checkString={checkString}
                    timeout={timeout}
                    onResponseStatusesChange={setResponseStatuses}
                    onCheckStringChange={setCheckString}
                    onTimeoutChange={setTimeout}
                    contentRef={contentRef}
                    onStepFinish={handleFinishInputCollection}
                    onStepBack={() => setCurrentStep((_) => _ - 1)}
                />
            </Steps.Content>
            <Steps.CompletedContent>
                <CompleteStep />
            </Steps.CompletedContent>

            {error && <Text color="danger">{error}</Text>}
        </Steps.Root>
    );
}
