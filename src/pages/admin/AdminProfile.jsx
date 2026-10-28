import { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";
import ProfilePhotoUpload from "../../components/ProfilePhotoUpload";
import styles from "./AdminProfile.module.css";
import {
  getIndonesianPhoneError,
  normalizeIndonesianPhone,
  sanitizePhoneInput,
} from "../../utils/phone";
import adminAvatarImg from "../../assets/profiles/admin-default.jpg";

export default function AdminProfile() {
  const { user, updateProfile, updateProfileImage } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: sanitizePhoneInput(user?.phone || "+6282288889988"),
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const initials = form.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: name === "phone" ? sanitizePhoneInput(value) : value,
    }));
    setError("");
    setSuccess("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const phoneError = getIndonesianPhoneError(form.phone);
    if (phoneError) {
      setError(phoneError);
      return;
    }

    try {
      updateProfile({
        ...user,
        name: form.name,
        email: form.email,
        phone: form.phone,
      });
      setForm((previous) => ({
        ...previous,
        phone: normalizeIndonesianPhone(form.phone),
      }));
      setSuccess("Profil admin berhasil diperbarui.");
    } catch (submitError) {
      setError(submitError.message || "Gagal memperbarui profil admin.");
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>AKUN ADMINISTRATOR</span>
        <h1>Profil Admin</h1>
        <p>Kelola nama, email, nomor telepon, dan foto profil akun admin.</p>
      </header>

      <section className={styles.card}>
        <div className={styles.photoSection}>
          <ProfilePhotoUpload
            src={user?.avatar || adminAvatarImg}
            name={form.name || "Admin"}
            initials={initials || "AD"}
            onChange={updateProfileImage}
          />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && (
            <div className={styles.error} role="alert">
              <AlertCircle size={17} />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className={styles.success} role="status">
              <CheckCircle2 size={17} />
              <span>{success}</span>
            </div>
          )}

          <label className={styles.field}>
            <span>Nama Lengkap</span>
            <input
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              maxLength={100}
              required
            />
          </label>

          <label className={styles.field}>
            <span>Email</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className={styles.field}>
            <span>Nomor Telepon</span>
            <input
              name="phone"
              type="text"
              inputMode="tel"
              maxLength={20}
              autoComplete="tel"
              placeholder="08... atau +62... (tanda hubung boleh)"
              value={form.phone}
              onChange={handleChange}
            />
            <small>Tanpa spasi, minimal 12 angka. Tanda hubung boleh; awalan kode negara +62.</small>
          </label>

          <button type="submit" className={styles.saveButton}>
            Simpan Perubahan
          </button>
        </form>
      </section>
    </main>
  );
}
