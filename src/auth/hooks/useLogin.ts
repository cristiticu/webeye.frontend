import { useCallback, useState } from 'react';
import { useLoginMutation } from '../service';
import { useAppDispatch } from '@/store';
import { login as loginActionCreator } from '../slice';

export default function useLogin() {
    const dispatch = useAppDispatch();
    const [loginError, setLoginError] = useState<string>('');

    const [loginTrigger, { isLoading: isLoggingIn }] = useLoginMutation();

    const login = useCallback(
        async (email: string, password: string) => {
            try {
                const response = await loginTrigger({ email, password }).unwrap();
                dispatch(loginActionCreator({ accessToken: response.access_token, refreshToken: response.refresh_token }));
            } catch (error) {
                if (error.status === 401) {
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
