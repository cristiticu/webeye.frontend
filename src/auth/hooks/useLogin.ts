import { useCallback, useState } from 'react';
import { useLoginMutation } from '../service';
import { useAppDispatch } from '@/store';
import { login as loginActionCreator } from '../slice';
import { setCookieJson } from '@/shared/utils';

export default function useLogin() {
    const dispatch = useAppDispatch();
    const [loginError, setLoginError] = useState<string>('');

    const [loginTrigger, { isLoading: isLoggingIn }] = useLoginMutation();

    const login = useCallback(
        async (email: string, password: string) => {
            try {
                setLoginError('');

                const response = await loginTrigger({ email, password }).unwrap();
                dispatch(loginActionCreator({ accessToken: response.access_token, refreshToken: response.refresh_token }));
                setCookieJson('webeye.tokens', response, 30);
            } catch (error) {
                if (error?.status === 401) {
                    setLoginError('Incorrect credentials');
                } else {
                    setLoginError('An error has occurred');
                }
            }
        },
        [dispatch, loginTrigger]
    );

    return {
        login,
        isLoggingIn,
        loginError,
    };
}
