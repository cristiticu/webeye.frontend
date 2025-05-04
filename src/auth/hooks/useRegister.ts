import { useCallback, useState } from 'react';
import { useLoginMutation, useRegisterMutation } from '../service';
import { useAppDispatch } from '@/store';
import { login as loginActionCreator } from '../slice';
import { setCookieJson } from '@/shared/utils';

export default function useRegister() {
    const dispatch = useAppDispatch();
    const [registerError, setRegisterError] = useState<string>('');

    const [registerTrigger, { isLoading: isRegistering }] = useRegisterMutation();
    const [loginTrigger, { isLoading: isLoggingIn }] = useLoginMutation();

    const register = useCallback(
        async (email: string, firstName: string, lastName: string | undefined, password: string) => {
            try {
                setRegisterError('');

                await registerTrigger({ email, f_name: firstName, l_name: lastName, password }).unwrap();

                const response = await loginTrigger({ email, password }).unwrap();
                dispatch(loginActionCreator({ accessToken: response.access_token, refreshToken: response.refresh_token }));
                setCookieJson('webeye.tokens', response, 30);
            } catch (error) {
                if (error?.status === 400) {
                    setRegisterError('User already registered');
                } else {
                    setRegisterError('An error has occurred');
                }

                throw error;
            }
        },
        [dispatch, loginTrigger, registerTrigger]
    );

    const isLoading = isRegistering || isLoggingIn;

    return {
        register,
        isLoading,
        registerError,
    };
}
