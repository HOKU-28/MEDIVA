import { useState, useEffect } from "react";
import {
  X,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  LogOut,
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import styles from "../pages/customer/Profile.module.css";

export default function SettingsModal({
  isOpen,
  onClose,
  currentUser,
  onLogout,
}) {
  const { changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState("keamanan");

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen && !passwordLoading) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, passwordLoading, onClose]);

  if (!isOpen) return null;

  function handlePasswordChange(e) {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
    setPasswordError("");
    setPasswordSuccess("");
  }

  function togglePasswordVisibility(name) {
    setVisiblePasswords((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));
  }

  function handlePasswordSubmit(e) {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!passwordForm.currentPassword) {
      setPasswordError("Password saat ini wajib diisi.");
      return;
    }

    if (!passwordForm.newPassword) {
      setPasswordError("Password baru wajib diisi.");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError("Password baru minimal 8 karakter.");
      return;
    }

    if (passwordForm.newPassword === passwordForm.currentPassword) {
      setPasswordError(
        "Password baru tidak boleh sama dengan password saat ini."
      );
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Konfirmasi password tidak cocok.");
      return;
    }

    setPasswordLoading(true);

    try {
      changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword,
      });

      setPasswordSuccess("Password berhasil diubah. Gunakan password baru untuk login berikutnya.");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setPasswordError(err.message || "Gagal mengubah password.");
    } finally {
      setPasswordLoading(false);
    }
  }

  return (
    <div className={styles.overlay} onClick={() => !passwordLoading && onClose()}>
      <div
        className={`${styles.modal} ${styles.settingsModal}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <div className={styles.modalHeader}>
          <div>
            <h3 id="settings-title" className={styles.modalTitle}>
              Pengaturan Akun
            </h3>
            <p className={styles.modalSubtitle}>
              Kelola keamanan akun dan preferensi peramban Anda.
            </p>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            disabled={passwordLoading}
            aria-label="Tutup pengaturan"
          >
            <X size={19} />
          </button>
        </div>

        <div className={styles.settingsTabs} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "keamanan"}
            className={`${styles.tabBtn} ${
              activeTab === "keamanan" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("keamanan")}
          >
            <KeyRound size={16} />
            <span>Keamanan</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "sesi"}
            className={`${styles.tabBtn} ${
              activeTab === "sesi" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("sesi")}
          >
            <ShieldCheck size={16} />
            <span>Informasi Sesi</span>
          </button>
        </div>

        {activeTab === "keamanan" && (
          <div className={styles.tabContent} role="tabpanel">
            {passwordError && (
              <div className={styles.errorAlert} role="alert">
                <AlertCircle size={16} />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className={styles.successAlert} role="status">
                <CheckCircle2 size={16} />
                <span>{passwordSuccess}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className={styles.editForm}>
              <div className={styles.formGroup}>
                <label htmlFor="current-password">Password Saat Ini</label>
                <div className={styles.passwordFieldWrap}>
                  <input
                    id="current-password"
                    name="currentPassword"
                    type={visiblePasswords.currentPassword ? "text" : "password"}
                    className={styles.input}
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Masukkan password saat ini"
                    autoComplete="current-password"
                    disabled={passwordLoading}
                    required
                  />
                  <button
                    type="button"
                    className={styles.passwordVisibilityButton}
                    onClick={() => togglePasswordVisibility("currentPassword")}
                    aria-label={visiblePasswords.currentPassword ? "Sembunyikan password saat ini" : "Lihat password saat ini"}
                  >
                    {visiblePasswords.currentPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="new-password">Password Baru</label>
                <div className={styles.passwordFieldWrap}>
                  <input
                    id="new-password"
                    name="newPassword"
                    type={visiblePasswords.newPassword ? "text" : "password"}
                    className={styles.input}
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Minimal 8 karakter"
                    autoComplete="new-password"
                    disabled={passwordLoading}
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    className={styles.passwordVisibilityButton}
                    onClick={() => togglePasswordVisibility("newPassword")}
                    aria-label={visiblePasswords.newPassword ? "Sembunyikan password baru" : "Lihat password baru"}
                  >
                    {visiblePasswords.newPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="confirm-password">Konfirmasi Password Baru</label>
                <div className={styles.passwordFieldWrap}>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type={visiblePasswords.confirmPassword ? "text" : "password"}
                    className={styles.input}
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Ulangi password baru"
                    autoComplete="new-password"
                    disabled={passwordLoading}
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    className={styles.passwordVisibilityButton}
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    aria-label={visiblePasswords.confirmPassword ? "Sembunyikan konfirmasi password" : "Lihat konfirmasi password"}
                  >
                    {visiblePasswords.confirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>

              <p className={styles.helperText}>
                Password harus terdiri dari minimal 8 karakter dan berbeda dari password saat ini.
              </p>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={onClose}
                  disabled={passwordLoading}
                >
                  Tutup
                </button>
                <button
                  type="submit"
                  className={styles.saveBtn}
                  disabled={passwordLoading}
                >
                  {passwordLoading ? "Menyimpan..." : "Simpan Password Baru"}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "sesi" && (
          <div className={styles.tabContent} role="tabpanel">
            <div className={styles.sessionCard}>
              <div className={styles.sessionRow}>
                <span>Peran Akun</span>
                <strong>
                  {currentUser?.role === "customer"
                    ? "Pasien (Customer)"
                    : currentUser?.role || "Pengguna"}
                </strong>
              </div>

              <div className={styles.sessionRow}>
                <span>Email Akun</span>
                <strong>{currentUser?.email || "-"}</strong>
              </div>

              <div className={styles.sessionRow}>
                <span>ID Pengguna</span>
                <code className={styles.sessionCode}>{currentUser?.id || "-"}</code>
              </div>

              <div className={styles.sessionRow}>
                <span>Penyimpanan Sesi</span>
                <strong>Browser localStorage</strong>
              </div>

              <div className={styles.sessionRow}>
                <span>Status Sesi</span>
                <span className={styles.statusBadgeActive}>Aktif</span>
              </div>
            </div>

            <div className={styles.infoNoteBox}>
              <p>
                Sesi Anda hanya tersimpan secara lokal di peramban perangkat ini. MEDIVA prototipe berjalan tanpa server manajemen sesi terpusat.
              </p>
            </div>

            <div className={styles.sessionActions}>
              <button
                type="button"
                className={styles.logoutSessionBtn}
                onClick={() => {
                  onClose();
                  if (onLogout) onLogout();
                }}
              >
                <LogOut size={16} />
                <span>Keluar dari Sesi Ini</span>
              </button>

              <button
                type="button"
                className={styles.cancelBtn}
                onClick={onClose}
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
