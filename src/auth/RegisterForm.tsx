import { Button, Field, Fieldset, Input, Link, Stack, Text } from '@chakra-ui/react';
import AuthCard from './AuthCard';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { loginValidationRule } from './utils/validation';
import validate from 'validate.js';
import useRegister from './hooks/useRegister';

const initialValidationErrors = {
    email: [],
    password: [],
    passwordVerify: [],
    firstName: [],
    lastName: [],
};

export default function RegisterForm() {
    const navigate = useNavigate();

    const [validationErrors, setValidationErrors] = useState(initialValidationErrors);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordVerify, setPasswordVerify] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');

    const { register, isLoading, registerError } = useRegister();

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setValidationErrors((_) => ({ ..._, email: [] }));
    };

    const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
        setValidationErrors((_) => ({ ..._, firstName: [] }));
    };

    const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
        setValidationErrors((_) => ({ ..._, lastName: [] }));
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setValidationErrors((_) => ({ ..._, password: [] }));
    };

    const handlePasswordVerifyChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordVerify(event.target.value);
        setValidationErrors((_) => ({ ..._, passwordVerify: [] }));
    };

    const handleRegisterButtonClick = async () => {
        let hasErrors = false;

        const validationErrors = validate({ email, password, firstName, lastName: lastName || undefined }, loginValidationRule);

        if (validationErrors) {
            setValidationErrors((_) => ({ ..._, ...validationErrors }));
            hasErrors = true;
        }

        if (passwordVerify !== password) {
            setValidationErrors((_) => ({ ..._, passwordVerify: ["Passwords don't match"] }));
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        await register(email, firstName, lastName || undefined, password);
        navigate('/dashboard');
    };

    return (
        <AuthCard title="Create an account">
            <Stack className="auth-field-stack">
                <Fieldset.Root invalid={!!registerError}>
                    <Fieldset.Content>
                        <Field.Root
                            required
                            invalid={validationErrors.email?.length > 0}
                        >
                            <Field.Label>
                                Your email <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                                type="email"
                                placeholder="email@address.com"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <Field.ErrorText>{validationErrors.email[0]}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root
                            required
                            invalid={validationErrors.firstName?.length > 0}
                        >
                            <Field.Label>
                                First name <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                                type="text"
                                placeholder=""
                                value={firstName}
                                onChange={handleFirstNameChange}
                            />
                            <Field.ErrorText>{validationErrors.firstName[0]}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={validationErrors.lastName?.length > 0}>
                            <Field.Label>Last Name</Field.Label>
                            <Input
                                type="text"
                                placeholder=""
                                value={lastName}
                                onChange={handleLastNameChange}
                            />
                            <Field.ErrorText>{validationErrors.lastName[0]}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root
                            required
                            invalid={validationErrors.password?.length > 0}
                        >
                            <Field.Label>
                                Enter a password <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <Field.ErrorText>{validationErrors.password[0]}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root
                            required
                            invalid={validationErrors.passwordVerify?.length > 0}
                        >
                            <Field.Label>
                                Verify your password <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                                name="password-verify"
                                type="password"
                                placeholder="••••••••"
                                value={passwordVerify}
                                onChange={handlePasswordVerifyChange}
                            />
                            <Field.ErrorText>{validationErrors.passwordVerify[0]}</Field.ErrorText>
                        </Field.Root>
                    </Fieldset.Content>
                    <Fieldset.ErrorText>{registerError}</Fieldset.ErrorText>
                </Fieldset.Root>

                <Button
                    colorScheme="brand"
                    w="100%"
                    loading={isLoading}
                    onClick={handleRegisterButtonClick}
                >
                    Register
                </Button>
            </Stack>
            <Text
                fontSize="sm"
                color="gray.600"
                textAlign="center"
            >
                Already have an account?{' '}
                <Link
                    asChild
                    color="brand.500"
                >
                    <RouterLink to="/auth/login"> Log in</RouterLink>
                </Link>
            </Text>
        </AuthCard>
    );
}
