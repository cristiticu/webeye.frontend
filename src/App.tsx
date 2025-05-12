import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import LoginPage from './auth/routes/LoginPage';
import RegisterPage from './auth/routes/RegisterPage';
import ProtectedRoutes from './auth/ProtectedRoutes';
import Layout from './components/layout/Layout';
import DashboardPage from './dashboard/routes/DashboardPage';
import ScheduledChecksPage from './scheduledChecks/routes/ScheduledChecksPage';
import AddScheduledCheckPage from './scheduledChecks/routes/AddScheduledCheckPage';

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/dashboard" />}
                    />
                    <Route
                        path="/auth/login"
                        element={<LoginPage />}
                    />
                    <Route
                        path="/register"
                        element={<RegisterPage />}
                    />

                    <Route element={<ProtectedRoutes />}>
                        <Route element={<Layout />}>
                            <Route
                                path="/dashboard"
                                element={<DashboardPage />}
                            />
                            <Route
                                path="/monitors"
                                element={<ScheduledChecksPage />}
                            />
                            <Route
                                path="/monitors/add"
                                element={<AddScheduledCheckPage />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
            <Toaster />
        </>
    );
}
