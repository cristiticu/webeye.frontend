import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './auth/routes/LoginPage';
import RegisterPage from './auth/routes/RegisterPage';
import MapTest from './MapTest';
import ProtectedRoutes from './auth/ProtectedRoutes';
import Layout from './Layout';
import DashboardPage from './dashboard/routes/DashboardPage';

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
                            element={<>Monitors</>}
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
