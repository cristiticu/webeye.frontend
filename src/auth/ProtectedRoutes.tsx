import { useAppSelector } from '@/store';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoutes() {
    const auth = useAppSelector((state) => state.auth);

    const isLoggedIn = auth.accessToken && auth.refreshToken && auth.userGuid;

    return (
        <>
            {isLoggedIn && <Outlet />}
            {!isLoggedIn && <Navigate to="/auth/login" />}
        </>
    );
}
