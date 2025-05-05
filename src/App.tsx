import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './auth/routes/LoginPage';
import RegisterPage from './auth/routes/RegisterPage';
import MapTest from './MapTest';
import ProtectedRoutes from './auth/ProtectedRoutes';
import Layout from './components/layout/Layout';
import DashboardPage from './dashboard/routes/DashboardPage';
import ScheduledChecksPage from './scheduledChecks/routes/ScheduledChecksPage';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
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
                            path="/map"
                            element={<MapTest />}
                        />
                        <Route
                            path="/monitors"
                            element={<ScheduledChecksPage />}
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
