import { Navigate, Outlet, useLocation } from 'react-router';
import { LandingPage } from './LandingPage/LandingPage';
import route from '@route';

export function ProtectedRoutes() {
    const location = useLocation();
    const token = localStorage.getItem('authToken');

    if (!token) {
        if (location.pathname === route.landing) return <LandingPage />;
        return <Navigate to={route.login} />;
    }

    return <Outlet />;
}
