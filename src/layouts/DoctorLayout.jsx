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
import {
  initialDoctor,
  initialSchedule,
  initialLeaves,
  initialAppointments,
} from "../data/doctorData";
import medivaSymbol from "../assets/branding/mediva-symbol.png";
import styles from "./DoctorLayout.module.css";

const menu = [
  { label: "Dashboard", path: "/doctor", icon: LayoutDashboard, end: true },
  { label: "Jadwal Praktik", path: "/doctor/jadwal", icon: CalendarDays },
  { label: "Appointment", path: "/doctor/appointment", icon: ClipboardList },
  { label: "Profil", path: "/doctor/profil", icon: UserRound },
];

function DoctorLayout() {
  const [doctor, setDoctor] = useState(initialDoctor);
  const [schedule, setSchedule] = useState(initialSchedule);
  const [leaves, setLeaves] = useState(initialLeaves);
  const [appointments, setAppointments] = useState(initialAppointments);

  function updateAppointment(id, patch) {
    setAppointments((list) =>
      list.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  const context = {
    doctor,
    setDoctor,
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
          <div className={styles.avatar}>
            {doctor.image ? (
              <img src={doctor.image} alt={doctor.name} className={styles.avatarImg} />
            ) : (
              doctor.initials
            )}
          </div>
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