import { Button, Field, Flex, Input, Link } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { validate } from 'validate.js';
import { urlValidationRule } from './validation';
import { normalizeUrl } from '@/shared/utils';
import { useFetchMonitoredWebpagesQuery } from '../service';

type Props = {
    url: string;
    showSkipButton?: boolean;
    onUrlChange: (_: string) => void;
    onStepFinish: () => void;
};

export default function UrlStep({ url, showSkipButton, onUrlChange, onStepFinish }: Props) {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const { data: webpages } = useFetchMonitoredWebpagesQuery();

    const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
        onUrlChange(event.target.value);
        setValidationErrors([]);
    };

    const handleNextButtonClick = () => {
        const normalizedUrl = normalizeUrl(url);
        const errors = validate({ webpage: normalizedUrl }, urlValidationRule);

        if (errors) {
            setValidationErrors(errors.webpage);
            return;
        }

        if (!webpages) {
            return;
        }

        const urls = webpages.map((webpage) => webpage.url);

        if (urls.includes(normalizedUrl)) {
            setValidationErrors(['Webpage already monitored']);
            return;
        }

        onUrlChange(normalizedUrl);
        onStepFinish();
    };

    return (
        <Flex
            marginTop={8}
            flexDirection="column"
            gap={8}
        >
            <Field.Root invalid={validationErrors?.length > 0}>
                <Field.Label>Enter the URL of your webpage</Field.Label>
                <Input
                    name="url"
                    placeholder="https://your-url.com"
                    type="text"
                    value={url}
                    onChange={handleUrlChange}
                />
                <Field.ErrorText>{validationErrors[0]}</Field.ErrorText>
            </Field.Root>

            <Flex>
                {showSkipButton && (
                    <Link
                        asChild
                        color="brand.500"
                    >
                        <RouterLink to="/dashboard">Skip setup</RouterLink>
                    </Link>
                )}
                <Button
                    width={28}
                    marginLeft="auto"
                    onClick={handleNextButtonClick}
                >
                    Next
                </Button>
            </Flex>
        </Flex>
    );
}
