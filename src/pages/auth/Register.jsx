import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
    UserRound,
    Mail,
    Lock,
    AlertCircle,
    ShieldCheck,
    Eye,
    EyeOff,
} from "lucide-react";
import { useAuth } from "../../Context/AuthContext";
import medivaLogo from "../../assets/branding/mediva-logo.png";
import styles from "./Auth.module.css";

export default function Register() {
    const { user, register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [visiblePasswords, setVisiblePasswords] = useState({});

    if (user) {
        return <Navigate to="/" replace />;
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
    }

    function togglePasswordVisibility(name) {
        setVisiblePasswords((previous) => ({
            ...previous,
            [name]: !previous[name],
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (form.password.length < 8) {
            setError("Password minimal 8 karakter.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Konfirmasi password tidak cocok.");
            return;
        }

        try {
            register({
                name: form.name,
                email: form.email,
                password: form.password,
            });

            navigate("/login", {
                replace: true,
                state: { registered: true },
            });
        } catch (err) {
            setError(err.message || "Registrasi gagal.");
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
                        DAFTAR AKUN PASIEN
                    </span>
                    <h1>Buat akun baru</h1>
                    <p>
                        Daftar untuk membuat janji temu dan mengakses layanan
                        MEDIVA.
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
                        <label htmlFor="register-name">
                            Nama lengkap
                        </label>
                        <div className={styles.inputWrap}>
                            <UserRound size={18} />
                            <input
                                id="register-name"
                                name="name"
                                type="text"
                                placeholder="Masukkan nama lengkap"
                                value={form.name}
                                onChange={handleChange}
                                autoComplete="name"
                                maxLength={100}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="register-email">Email</label>
                        <div className={styles.inputWrap}>
                            <Mail size={18} />
                            <input
                                id="register-email"
                                name="email"
                                type="email"
                                placeholder="nama@email.com"
                                value={form.email}
                                onChange={handleChange}
                                autoComplete="email"
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="register-password">
                            Password
                        </label>
                        <div className={styles.inputWrap}>
                            <Lock size={18} />
                            <input
                                id="register-password"
                                name="password"
                                type={visiblePasswords.password ? "text" : "password"}
                                placeholder="Minimal 8 karakter"
                                value={form.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                                minLength={8}
                                required
                            />
                            <button
                                type="button"
                                className={styles.passwordVisibilityButton}
                                onClick={() => togglePasswordVisibility("password")}
                                aria-label={visiblePasswords.password ? "Sembunyikan password" : "Lihat password"}
                            >
                                {visiblePasswords.password ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="register-confirm-password">
                            Konfirmasi password
                        </label>
                        <div className={styles.inputWrap}>
                            <Lock size={18} />
                            <input
                                id="register-confirm-password"
                                name="confirmPassword"
                                type={visiblePasswords.confirmPassword ? "text" : "password"}
                                placeholder="Ulangi password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                autoComplete="new-password"
                                minLength={8}
                                required
                            />
                            <button
                                type="button"
                                className={styles.passwordVisibilityButton}
                                onClick={() => togglePasswordVisibility("confirmPassword")}
                                aria-label={visiblePasswords.confirmPassword ? "Sembunyikan konfirmasi password" : "Lihat konfirmasi password"}
                            >
                                {visiblePasswords.confirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className={styles.infoNotice}>
                        <ShieldCheck size={18} />
                        <span>
                            Pendaftaran ini khusus pasien. Role akun otomatis
                            ditetapkan sebagai Customer.
                        </span>
                    </div>

                    <button
                        className={styles.submitButton}
                        type="submit"
                    >
                        Daftar Sekarang
                    </button>
                </form>

                <p className={styles.switchText}>
                    Sudah punya akun?{" "}
                    <Link to="/login">Login di sini</Link>
                </p>
            </section>
        </main>
    );
}
