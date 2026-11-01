
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function ProtectedRoute({ allowedRoles }) {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    if (!allowedRoles.includes(user.role)) {
        const homeByRole = {
            admin: "/admin",
            doctor: "/doctor",
            customer: "/",
        };

        return (
            <Navigate
                to={homeByRole[user.role] || "/login"}
                replace
            />
        );
    }

    return <Outlet />;
}
