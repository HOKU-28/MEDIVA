
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import styles from "./LogoutButton.module.css";

function LogoutButton() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login", { replace: true });
    }

    return (
        <button
            type="button"
            onClick={handleLogout}
            className={styles.logoutButton}
        >
            <LogOut size={18} />
            <span>Logout</span>
        </button>
    );
}

export default LogoutButton;
