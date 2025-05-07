import { useAppDispatch, useAppSelector } from '@/store';
import { useFetchUserQuery } from '../service';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useEffect } from 'react';
import logout from '@/auth/utils/logout';

export default function useGetAuthenticatedUser() {
    const dispatch = useAppDispatch();
    const userGuid = useAppSelector((state) => state.auth.userGuid);

    const { data: user, error: userError, isLoading } = useFetchUserQuery(userGuid ? { guid: userGuid } : skipToken);

    useEffect(() => {
        if (userError) {
            dispatch(logout());
        }
    }, [dispatch, userError]);

    return {
        user,
        isLoadingUser: isLoading,
    };
}
