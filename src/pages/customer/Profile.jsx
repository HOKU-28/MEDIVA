import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Edit3,
  Settings,
  LogOut,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../../Context/AuthContext";
import EditProfileModal from "../../components/EditProfileModal";
import SettingsModal from "../../components/SettingsModal";
import styles from "./Profile.module.css";

const patient = {
  name: "Andi Pratama",
  initials: "AP",
  email: "andi.pratama@mediva.test",
  phone: "0812-3456-7890",
  address: "Jl. Merdeka No. 12, Jakarta Selatan",
  dob: "15 Agustus 1995",
  bloodType: "O+",
  totalConsultations: 3,
};

function formatBirthDate(val) {
  if (!val) return "";
  if (isNaN(Date.parse(val))) return val;
  const d = new Date(val.includes("T") ? val : `${val}T00:00:00`);
  if (isNaN(d.getTime())) return val;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showLogout, setShowLogout] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [successNotice, setSuccessNotice] = useState("");

  const displayName = user?.name || patient.name;
  const displayEmail = user?.email || patient.email;
  const displayPhone = user?.phone !== undefined ? user.phone : patient.phone;
  const displayDob = user?.dob !== undefined ? formatBirthDate(user.dob) : patient.dob;
  const displayAddress = user?.address !== undefined ? user.address : patient.address;
  const displayInitials =
    displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("") || patient.initials;
  const totalConsultations =
    user?.totalConsultations !== undefined
      ? user.totalConsultations
      : patient.totalConsultations;
  const bloodType = user?.bloodType || patient.bloodType;

  function handleLogout() {
    logout();
    setShowLogout(false);
    navigate("/login", { replace: true });
  }

  function handleProfileUpdated(message) {
    setSuccessNotice(message);
    setTimeout(() => {
      setSuccessNotice("");
    }, 4000);
  }

  return (
    <main className={styles.page}>
      {successNotice && (
        <div className={styles.successBanner} role="status">
          <CheckCircle2 size={18} />
          <span>{successNotice}</span>
        </div>
      )}

      <section className={styles.profileCard}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>{displayInitials}</div>
        </div>
        <div className={styles.profileInfo}>
          <span className={styles.label}>PASIEN</span>
          <h1>{displayName}</h1>
          <div className={styles.stats}>
            <div>
              <strong>{totalConsultations}</strong>
              <span>Konsultasi</span>
            </div>
            <div className={styles.divider} />
            <div>
              <strong>{bloodType}</strong>
              <span>Gol. Darah</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Informasi Pribadi</h2>
        <div className={styles.infoList}>
          <div className={styles.infoItem}>
            <Mail size={17} className={styles.infoIcon} />
            <div>
              <span>Email</span>
              <strong>{displayEmail}</strong>
            </div>
          </div>
          <div className={styles.infoItem}>
            <Phone size={17} className={styles.infoIcon} />
            <div>
              <span>Nomor Telepon</span>
              <strong>
                {displayPhone ? (
                  displayPhone
                ) : (
                  <span className={styles.unsetValue}>Belum diatur</span>
                )}
              </strong>
            </div>
          </div>
          <div className={styles.infoItem}>
            <Calendar size={17} className={styles.infoIcon} />
            <div>
              <span>Tanggal Lahir</span>
              <strong>
                {displayDob ? (
                  displayDob
                ) : (
                  <span className={styles.unsetValue}>Belum diatur</span>
                )}
              </strong>
            </div>
          </div>
          <div className={styles.infoItem}>
            <MapPin size={17} className={styles.infoIcon} />
            <div>
              <span>Alamat</span>
              <strong>
                {displayAddress ? (
                  displayAddress
                ) : (
                  <span className={styles.unsetValue}>Belum diatur</span>
                )}
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Pengaturan Akun</h2>
        <div className={styles.menuList}>
          <button
            className={styles.menuItem}
            onClick={() => setShowEditModal(true)}
            type="button"
          >
            <div className={styles.menuLeft}>
              <div className={styles.menuIcon}>
                <Edit3 size={18} />
              </div>
              <span>Edit Profil</span>
            </div>
            <ChevronRight size={18} className={styles.menuChevron} />
          </button>

          <button
            className={styles.menuItem}
            onClick={() => setShowSettingsModal(true)}
            type="button"
          >
            <div className={styles.menuLeft}>
              <div className={styles.menuIcon}>
                <Settings size={18} />
              </div>
              <span>Pengaturan</span>
            </div>
            <ChevronRight size={18} className={styles.menuChevron} />
          </button>

          <button
            className={`${styles.menuItem} ${styles.menuLogout}`}
            onClick={() => setShowLogout(true)}
            type="button"
          >
            <div className={styles.menuLeft}>
              <div className={`${styles.menuIcon} ${styles.menuIconRed}`}>
                <LogOut size={18} />
              </div>
              <span>Keluar</span>
            </div>
            <ChevronRight size={18} className={styles.menuChevron} />
          </button>
        </div>
      </section>

      {showEditModal && (
        <EditProfileModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          currentUser={user}
          onSuccess={handleProfileUpdated}
        />
      )}

      {showSettingsModal && (
        <SettingsModal
          isOpen={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
          currentUser={user}
          onLogout={handleLogout}
        />
      )}

      {showLogout && (
        <div className={styles.overlay} onClick={() => setShowLogout(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon}>
              <LogOut size={28} />
            </div>
            <h3>Keluar dari Akun?</h3>
            <p>Anda akan keluar dari akun MEDIVA Anda.</p>
            <div className={styles.modalActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowLogout(false)}
                type="button"
              >
                Batal
              </button>
              <button
                className={styles.logoutBtn}
                onClick={handleLogout}
                type="button"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Profile;
