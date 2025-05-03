import { Button, Field, Fieldset, Input, Link, Stack, Text } from '@chakra-ui/react';
import { AuthCard } from './AuthCard';
import { Link as RouterLink } from 'react-router-dom';
import useLogin from './hooks/useLogin';
import { ChangeEvent, useState } from 'react';
import { validate } from 'validate.js';
import { loginValidationRule } from './utils';

const initialValidationErrors = {
    email: [],
    password: [],
};

export default function LoginForm() {
    const [validationErrors, setValidationErrors] = useState(initialValidationErrors);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { login, isLoggingIn, loginError } = useLogin();

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setValidationErrors((_) => ({ ..._, email: [] }));
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setValidationErrors((_) => ({ ..._, password: [] }));
    };

    const handleLoginButtonClick = async () => {
        const validationErrors = validate({ email, password }, loginValidationRule);

        if (validationErrors) {
            setValidationErrors((_) => ({ ..._, ...validationErrors }));
            return;
        }

        await login(email, password);
    };

    return (
        <AuthCard title="Login">
            <Stack className="auth-field-stack">
                <Fieldset.Root invalid={!!loginError}>
                    <Fieldset.Content>
                        <Field.Root invalid={validationErrors.email?.length > 0}>
                            <Field.Label>Email</Field.Label>
                            <Input
                                type="email"
                                placeholder="email@address.com"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <Field.ErrorText>{validationErrors.email[0]}</Field.ErrorText>
                        </Field.Root>
                        <Field.Root invalid={validationErrors.password?.length > 0}>
                            <Field.Label>Password</Field.Label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <Field.ErrorText>{validationErrors.password[0]}</Field.ErrorText>
                        </Field.Root>
                    </Fieldset.Content>
                    <Fieldset.ErrorText>{loginError}</Fieldset.ErrorText>
                </Fieldset.Root>

                <Button
                    colorScheme="brand"
                    w="100%"
                    loading={isLoggingIn}
                    onClick={handleLoginButtonClick}
                >
                    Log In
                </Button>
            </Stack>
            <Text
                fontSize="sm"
                color="gray.600"
                textAlign="center"
            >
                Don&apos;t have an account?{' '}
                <Link
                    asChild
                    color="brand.500"
                >
                    <RouterLink to="/register"> Register now!</RouterLink>
                </Link>
            </Text>
        </AuthCard>
    );
}
