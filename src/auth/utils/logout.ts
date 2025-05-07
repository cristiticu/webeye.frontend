import { AppDispatch } from '@/store';
import { logout as logoutActionCreator } from '../slice';
import { authApi } from '../service';
import { userApi } from '@/user/service';
import { monitoredWebpagesApi } from '@/monitoredWebpages/service';
import { scheduledChecksApi } from '@/scheduledChecks/service';
import { eraseCookie } from '@/shared/cookie';

export default function logout() {
    return (dispatch: AppDispatch) => {
        dispatch(logoutActionCreator());
        dispatch(authApi.util.resetApiState());
        dispatch(userApi.util.resetApiState());
        dispatch(monitoredWebpagesApi.util.resetApiState());
        dispatch(scheduledChecksApi.util.resetApiState());
        eraseCookie('webeye.tokens');
    };
}
