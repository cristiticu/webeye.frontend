import { Button, Field, Fieldset, Input, Link, Stack, Text } from '@chakra-ui/react';
import { AuthCard } from './AuthCard';
import { Link as RouterLink } from 'react-router-dom';

export default function RegisterForm() {
    return (
        <AuthCard title="Create an account">
            <Stack className="auth-field-stack">
                <Fieldset.Root invalid>
                    <Fieldset.Content>
                        <Field.Root required>
                            <Field.Label>
                                Your email <Field.RequiredIndicator />
                            </Field.Label>

                            <Input
                                type="email"
                                placeholder="email@address.com"
                            />
                        </Field.Root>
                        <Field.Root required>
                            <Field.Label>
                                First name <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                                type="text"
                                placeholder=""
                            />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Last Name</Field.Label>
                            <Input
                                type="text"
                                placeholder=""
                            />
                        </Field.Root>
                        <Field.Root required>
                            <Field.Label>
                                Enter a password <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                            />
                        </Field.Root>
                    </Fieldset.Content>
                    <Fieldset.ErrorText>Missing required fields</Fieldset.ErrorText>
                </Fieldset.Root>

                <Button
                    colorScheme="brand"
                    w="100%"
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
                    <RouterLink to="/auth/login"> Log in now</RouterLink>
                </Link>
            </Text>
        </AuthCard>
    );
}
