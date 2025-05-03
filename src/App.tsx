import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './auth/routes/LoginPage';
import RegisterPage from './auth/routes/RegisterPage';
import MapTest from './MapTest';

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
                <Route
                    path="/map"
                    element={<MapTest />}
                />
            </Routes>
        </BrowserRouter>
    );
}
