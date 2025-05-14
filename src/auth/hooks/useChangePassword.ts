import { useAppDispatch } from '@/store';
import { useChangePasswordMutation } from '../service';
import { login as loginActionCreator } from '../slice';
import { setCookieJson } from '@/shared/utils';

export default function useChangePassword() {
    const dispatch = useAppDispatch();

    const [changePasswordTrigger, { isLoading: isChangingPassword }] = useChangePasswordMutation();

    const changePassword = async (oldPassword: string, newPassword: string) => {
        const response = await changePasswordTrigger({ old_password: oldPassword, new_password: newPassword }).unwrap();
        dispatch(loginActionCreator({ accessToken: response.access_token, refreshToken: response.refresh_token }));
        setCookieJson('webeye.tokens', response, 30);
    };

    return {
        changePassword,
        isChangingPassword,
    };
}
