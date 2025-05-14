import { useAppDispatch } from '@/store';
import { useFetchUserQuery } from '../service';
import { useEffect } from 'react';
import logout from '@/auth/utils/logout';
import { toaster } from '@/components/ui/toaster';

export default function useGetAuthenticatedUser() {
    const dispatch = useAppDispatch();

    const { data: user, error: userError, isLoading } = useFetchUserQuery();

    useEffect(() => {
        if (userError) {
            dispatch(logout());
            toaster.create({
                type: 'error',
                title: 'Error retrieving user',
            });
        }
    }, [dispatch, userError]);

    return {
        user,
        isLoadingUser: isLoading,
    };
}
