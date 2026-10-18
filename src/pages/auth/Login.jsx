
import { useState } from "react";
import {
    Link,
    Navigate,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { HeartPulse, Mail, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";
import styles from "./Auth.module.css";

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
            const destination = getHomeByRole(account.role);

            // Jangan izinkan redirect ke halaman role lain.
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
                <Link to="/" className={styles.brand}>
                    <span className={styles.brandIcon}>
                        <HeartPulse size={25} />
                    </span>
                    <span>MEDIVA</span>
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
                    <strong>Akun demo development</strong>
                    <span>Admin: admin@mediva.test / Admin123!</span>
                    <span>Dokter: doctor@mediva.test / Doctor123!</span>
                </div>
            </section>
        </main>
    );
}
