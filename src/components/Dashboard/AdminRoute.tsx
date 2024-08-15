import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAdmin from '../../hooks/useAdmin';

interface AdminRouteProps {
    children: React.ReactElement;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    console.log('User:', user);
    console.log('Is Admin:', isAdmin);
    console.log('Loading:', loading, 'IsAdminLoading:', isAdminLoading);

    if (loading || isAdminLoading) {
        return <span className="loading loading-ring loading-lg"></span>;
    }

    if (user && isAdmin) {
        return <>{children}</>;
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
