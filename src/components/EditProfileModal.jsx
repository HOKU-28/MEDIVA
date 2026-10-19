import { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import styles from "../pages/customer/Profile.module.css";

function getTodayISO() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  currentUser,
  onSuccess,
}) {
  const { updateProfile } = useAuth();
  const [form, setForm] = useState(() => ({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    dob: currentUser?.dob || "",
    address: currentUser?.address || "",
  }));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const todayISO = getTodayISO();

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen && !loading) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const cleanName = form.name.trim();
    const cleanEmail = form.email.trim().toLowerCase();
    const cleanPhone = form.phone.trim();
    const cleanDob = form.dob.trim();
    const cleanAddress = form.address.trim();

    if (!cleanName) {
      setError("Nama lengkap wajib diisi.");
      return;
    }

    if (!cleanEmail) {
      setError("Email wajib diisi.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setError("Format email tidak valid (contoh: nama@email.com).");
      return;
    }

    if (cleanPhone) {
      const digitsOnly = cleanPhone.replace(/[\s-]/g, "");
      if (!/^(\+?62|0)[0-9]{8,14}$/.test(digitsOnly)) {
        setError(
          "Nomor telepon tidak valid. Gunakan format yang benar (contoh: 081234567890)."
        );
        return;
      }
    }

    if (cleanDob) {
      const birthDate = new Date(`${cleanDob}T00:00:00`);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      if (birthDate > today) {
        setError("Tanggal lahir tidak boleh di masa depan.");
        return;
      }
    }

    setLoading(true);

    try {
      updateProfile({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        dob: cleanDob,
        address: cleanAddress,
      });

      if (onSuccess) {
        onSuccess("Profil berhasil diperbarui.");
      }
      onClose();
    } catch (err) {
      setError(err.message || "Gagal memperbarui profil.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.overlay} onClick={() => !loading && onClose()}>
      <div
        className={`${styles.modal} ${styles.editModal}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
      >
        <div className={styles.modalHeader}>
          <div>
            <h3 id="edit-profile-title" className={styles.modalTitle}>
              Edit Informasi Pribadi
            </h3>
            <p className={styles.modalSubtitle}>
              Perbarui data diri Anda untuk layanan konsultasi MEDIVA.
            </p>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            disabled={loading}
            aria-label="Tutup modal"
          >
            <X size={19} />
          </button>
        </div>

        {error && (
          <div className={styles.errorAlert} role="alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.editForm}>
          <div className={styles.formGroup}>
            <label htmlFor="edit-name">
              Nama Lengkap <span className={styles.required}>*</span>
            </label>
            <input
              id="edit-name"
              name="name"
              type="text"
              className={styles.input}
              value={form.name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              required
              disabled={loading}
              maxLength={100}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="edit-email">
              Email <span className={styles.required}>*</span>
            </label>
            <input
              id="edit-email"
              name="email"
              type="email"
              className={styles.input}
              value={form.email}
              onChange={handleChange}
              placeholder="nama@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="edit-phone">Nomor Telepon</label>
            <input
              id="edit-phone"
              name="phone"
              type="tel"
              className={styles.input}
              value={form.phone}
              onChange={handleChange}
              placeholder="Contoh: 0812-3456-7890"
              disabled={loading}
              maxLength={20}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="edit-dob">Tanggal Lahir</label>
            <input
              id="edit-dob"
              name="dob"
              type="date"
              className={styles.input}
              value={form.dob}
              onChange={handleChange}
              max={todayISO}
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="edit-address">Alamat Domisili</label>
            <textarea
              id="edit-address"
              name="address"
              rows={3}
              className={styles.textarea}
              value={form.address}
              onChange={handleChange}
              placeholder="Masukkan alamat domisili lengkap"
              disabled={loading}
              maxLength={255}
            />
          </div>

          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className={styles.saveBtn}
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
