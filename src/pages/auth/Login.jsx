import { useState } from "react";
import {
    Link,
    Navigate,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";
import medivaLogo from "../../assets/branding/mediva-logo.png";
import adminAvatar from "../../assets/profiles/admin-rinaldy.jpg";
import doctorAvatar from "../../assets/profiles/doctor-sarah-wijaya.jpg";
import styles from "./Auth.module.css";

const demoAccounts = [
    {
        role: "Pasien",
        name: "Andi Pratama",
        email: "andi.pratama@mediva.test",
        password: "Customer123!",
        initials: "AP",
    },
    {
        role: "Dokter",
        name: "Dr. Sarah Wijaya",
        email: "doctor@mediva.test",
        password: "Doctor123!",
        avatar: doctorAvatar,
    },
    {
        role: "Admin",
        name: "Rinaldy",
        email: "admin@mediva.test",
        password: "Admin123!",
        avatar: adminAvatar,
    },
];

function getHomeByRole(role) {
    const routes = {
        admin: "/admin",
        doctor: "/doctor",
        customer: "/",
    };

    return routes[role] || "/login";
}

export default function Login() {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    if (user) {
        return (
            <Navigate
                to={getHomeByRole(user.role)}
                replace
            />
        );
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
    }

    function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const account = login(form);

            const requestedPath = location.state?.from?.pathname;
            const defaultHome = getHomeByRole(account.role);
            let destination = defaultHome;

            if (
                account.role === "customer" &&
                requestedPath &&
                !requestedPath.startsWith("/doctor") &&
                !requestedPath.startsWith("/admin")
            ) {
                destination = requestedPath;
            }

            navigate(destination, { replace: true });
        } catch (err) {
            setError(err.message || "Login gagal.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className={styles.authPage}>
            <section className={styles.authCard}>
                <Link to="/" className={styles.brand} aria-label="MEDIVA Beranda">
                    <img src={medivaLogo} alt="MEDIVA" className={styles.brandLogo} />
                </Link>

                <div className={styles.heading}>
                    <span className={styles.eyebrow}>
                        SELAMAT DATANG KEMBALI
                    </span>
                    <h1>Login ke MEDIVA</h1>
                    <p>
                        Masuk untuk mengakses akun dan layanan kesehatan Anda.
                    </p>
                </div>

                {error && (
                    <div className={styles.errorMessage} role="alert">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >
                    <div className={styles.formGroup}>
                        <label htmlFor="login-email">Email</label>
                        <div className={styles.inputWrap}>
                            <Mail size={18} />
                            <input
                                id="login-email"
                                name="email"
                                type="email"
                                placeholder="nama@email.com"
                                value={form.email}
                                onChange={handleChange}
                                autoComplete="username"
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="login-password">Password</label>
                        <div className={styles.inputWrap}>
                            <Lock size={18} />
                            <input
                                id="login-password"
                                name="password"
                                type="password"
                                placeholder="Masukkan password"
                                value={form.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        className={styles.submitButton}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Memproses..." : "Login"}
                    </button>
                </form>

                <p className={styles.switchText}>
                    Belum punya akun?{" "}
                    <Link to="/register">Daftar sebagai pasien</Link>
                </p>

                <div className={styles.demoNotice}>
                    <strong className={styles.demoTitle}>Akun demo development</strong>
                    <div className={styles.demoList}>
                        {demoAccounts.map((account) => (
                            <div key={account.role} className={styles.demoRow}>
                                {account.avatar ? (
                                    <img
                                        src={account.avatar}
                                        alt={account.name}
                                        className={styles.demoAvatar}
                                    />
                                ) : (
                                    <div
                                        className={styles.demoAvatarInitials}
                                        aria-label={account.name}
                                    >
                                        {account.initials}
                                    </div>
                                )}
                                <div className={styles.demoInfo}>
                                    <span className={styles.demoRole}>{account.role}</span>
                                    <span className={styles.demoEmail}>{account.email}</span>
                                    <span className={styles.demoPassword}>{account.password}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
