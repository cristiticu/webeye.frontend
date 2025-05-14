import { useAppDispatch } from '@/store';
import { useDeleteUserMutation } from '../service';
import logout from '@/auth/utils/logout';
import { toaster } from '@/components/ui/toaster';

export default function useDeleteUser() {
    const dispatch = useAppDispatch();
    const [deleteUserTrigger, { isLoading: isDeletingUser }] = useDeleteUserMutation();

    const deleteUser = async () => {
        try {
            await deleteUserTrigger().unwrap();
            dispatch(logout());

            toaster.create({
                type: 'success',
                title: 'Your account was deleted',
            });
        } catch (_) {
            toaster.create({
                type: 'error',
                title: 'Something went wrong! Please try again',
            });
        }
    };

    return {
        deleteUser,
        isDeletingUser,
    };
}
