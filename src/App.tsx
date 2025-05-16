import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import LoginPage from './auth/routes/LoginPage';
import RegisterPage from './auth/routes/RegisterPage';
import ProtectedRoutes from './auth/ProtectedRoutes';
import Layout from './components/layout/Layout';
import DashboardPage from './dashboard/routes/DashboardPage';
import ScheduledChecksPage from './scheduledChecks/routes/ScheduledChecksPage';
import AddScheduledCheckPage from './scheduledChecks/routes/AddScheduledCheckPage';
import UserAccountPage from './user/routes/UserAccountPage';
import EventsPage from './monitoringEvents/routes/EventsPage';
import DowntimesPage from './monitoringEvents/routes/DowntimesPage';
import EventDetailsPage from './monitoringEvents/routes/EventDetailsPage';

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
                                path="/event"
                                element={<EventsPage />}
                            />
                            <Route
                                path="/event/:region/:createdAt"
                                element={<EventDetailsPage />}
                            />
                            <Route
                                path="/downtimes"
                                element={<DowntimesPage />}
                            />
                            <Route
                                path="/monitors"
                                element={<ScheduledChecksPage />}
                            />
                            <Route
                                path="/monitors/add"
                                element={<AddScheduledCheckPage />}
                            />
                            <Route
                                path="/account"
                                element={<UserAccountPage />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
            <Toaster />
        </>
    );
}
