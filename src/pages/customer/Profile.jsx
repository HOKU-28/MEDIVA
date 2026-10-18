import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Edit3,
  Settings,
  LogOut,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
} from "lucide-react";
import styles from "./Profile.module.css";

const patient = {
  name: "Budi Raharjo",
  initials: "BR",
  email: "budi.raharjo@email.com",
  phone: "0812-3456-7890",
  address: "Jl. Merdeka No. 12, Jakarta Selatan",
  dob: "15 Agustus 1992",
  bloodType: "O+",
  totalConsultations: 5,
};

function Profile() {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  function handleLogout() {
    setShowLogout(false);
    navigate("/");
  }

  return (
    <main className={styles.page}>
      {/* Header Profil */}
      <section className={styles.profileCard}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>{patient.initials}</div>
        </div>
        <div className={styles.profileInfo}>
          <span className={styles.label}>PASIEN</span>
          <h1>{patient.name}</h1>
          <div className={styles.stats}>
            <div>
              <strong>{patient.totalConsultations}</strong>
              <span>Konsultasi</span>
            </div>
            <div className={styles.divider} />
            <div>
              <strong>{patient.bloodType}</strong>
              <span>Gol. Darah</span>
            </div>
          </div>
        </div>
      </section>

      {/* Info Dasar */}
      <section className={styles.section}>
        <h2>Informasi Pribadi</h2>
        <div className={styles.infoList}>
          <div className={styles.infoItem}>
            <Mail size={17} className={styles.infoIcon} />
            <div>
              <span>Email</span>
              <strong>{patient.email}</strong>
            </div>
          </div>
          <div className={styles.infoItem}>
            <Phone size={17} className={styles.infoIcon} />
            <div>
              <span>Nomor Telepon</span>
              <strong>{patient.phone}</strong>
            </div>
          </div>
          <div className={styles.infoItem}>
            <Calendar size={17} className={styles.infoIcon} />
            <div>
              <span>Tanggal Lahir</span>
              <strong>{patient.dob}</strong>
            </div>
          </div>
          <div className={styles.infoItem}>
            <MapPin size={17} className={styles.infoIcon} />
            <div>
              <span>Alamat</span>
              <strong>{patient.address}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className={styles.section}>
        <h2>Pengaturan Akun</h2>
        <div className={styles.menuList}>
          <button className={styles.menuItem}>
            <div className={styles.menuLeft}>
              <div className={styles.menuIcon}>
                <Edit3 size={18} />
              </div>
              <span>Edit Profil</span>
            </div>
            <ChevronRight size={18} className={styles.menuChevron} />
          </button>

          <button className={styles.menuItem}>
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

      {/* Modal Konfirmasi Logout */}
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
              >
                Batal
              </button>
              <button className={styles.logoutBtn} onClick={handleLogout}>
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
