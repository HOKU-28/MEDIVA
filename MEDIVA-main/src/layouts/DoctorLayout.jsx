import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  UserRound,
  LogOut,
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import ProfilePhotoUpload from "../components/ProfilePhotoUpload";
import {
  initialDoctor,
  initialSchedule,
  initialLeaves,
  initialAppointments,
} from "../data/doctorData";
import {
  getIndonesianPhoneError,
  normalizeIndonesianPhone,
} from "../utils/phone";
import medivaSymbol from "../assets/branding/mediva-symbol.png";
import styles from "./DoctorLayout.module.css";

const menu = [
  { label: "Dashboard", path: "/doctor", icon: LayoutDashboard, end: true },
  { label: "Jadwal Praktik", path: "/doctor/jadwal", icon: CalendarDays },
  { label: "Appointment", path: "/doctor/appointment", icon: ClipboardList },
  { label: "Profil", path: "/doctor/profil", icon: UserRound },
];

function DoctorLayout() {
  const { logout, user, updateProfileImage } = useAuth();
  const storageKey = `mediva_doctor_profile_${user?.id || "demo-doctor"}`;
  const [doctor, setDoctor] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      const profile = saved
        ? { ...initialDoctor, ...JSON.parse(saved) }
        : initialDoctor;
      const phone = profile.phone || "";
      return {
        ...profile,
        strNumber: (profile.strNumber || "").replace(/\D/g, ""),
        phone:
          phone && !getIndonesianPhoneError(phone)
            ? normalizeIndonesianPhone(phone)
            : "",
      };
    } catch {
      return {
        ...initialDoctor,
        strNumber: initialDoctor.strNumber.replace(/\D/g, ""),
        phone: normalizeIndonesianPhone(initialDoctor.phone),
      };
    }
  });
  const [schedule, setSchedule] = useState(initialSchedule);
  const [leaves, setLeaves] = useState(initialLeaves);
  const [appointments, setAppointments] = useState(initialAppointments);

  function updateDoctor(profile) {
    localStorage.setItem(storageKey, JSON.stringify(profile));
    setDoctor(profile);
    if (
      profile.image !== doctor.image &&
      profile.image?.startsWith("data:image/")
    ) {
      updateProfileImage(profile.image);
    }
  }

  function updateAppointment(id, patch) {
    setAppointments((list) =>
      list.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  const context = {
    doctor,
    setDoctor: updateDoctor,
    schedule,
    setSchedule,
    leaves,
    setLeaves,
    appointments,
    updateAppointment,
  };

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <img src={medivaSymbol} alt="MEDIVA" className={styles.brandSymbol} />
          <div className={styles.brandText}>
            <span className={styles.logo}>MEDIVA</span>
            <span className={styles.badge}>Dokter</span>
          </div>
        </div>

        <div className={styles.user}>
          <ProfilePhotoUpload
            src={doctor.image}
            name={doctor.name}
            initials={doctor.initials}
            size={42}
            compact
            onChange={(image) => updateDoctor({ ...doctor, image })}
          />
          <div>
            <strong>{doctor.name}</strong>
            <span>{doctor.specialty}</span>
          </div>
        </div>

        <nav className={styles.nav}>
          {menu.map(({ label, path, icon: Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className={styles.exit}
          aria-label="Keluar dari akun dokter"
        >
          <LogOut size={16} aria-hidden="true" />
          <span>Keluar</span>
        </button>
      </aside>

      <main className={styles.content}>
        <Outlet context={context} />
      </main>
    </div>
  );
}

export default DoctorLayout;