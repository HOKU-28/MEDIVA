import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  UserRound,
  ArrowLeft,
} from "lucide-react";
import {
  initialDoctor,
  initialSchedule,
  initialLeaves,
  initialAppointments,
} from "../data/doctorData";
import styles from "./DoctorLayout.module.css";

const menu = [
  { label: "Dashboard", path: "/doctor", icon: LayoutDashboard, end: true },
  { label: "Jadwal Praktik", path: "/doctor/jadwal", icon: CalendarDays },
  { label: "Appointment", path: "/doctor/appointment", icon: ClipboardList },
  { label: "Profil", path: "/doctor/profil", icon: UserRound },
];

function DoctorLayout() {
  // State dibagikan ke semua halaman dokter lewat Outlet context
  const [doctor, setDoctor] = useState(initialDoctor);
  const [schedule, setSchedule] = useState(initialSchedule);
  const [leaves, setLeaves] = useState(initialLeaves);
  const [appointments, setAppointments] = useState(initialAppointments);

  function updateAppointment(id, patch) {
    setAppointments((list) =>
      list.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
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
          <span className={styles.logo}>MEDIVA</span>
          <span className={styles.badge}>Dokter</span>
        </div>

        <div className={styles.user}>
          <div className={styles.avatar}>{doctor.initials}</div>
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

        <NavLink to="/" className={styles.exit}>
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Kembali ke situs</span>
        </NavLink>
      </aside>

      <main className={styles.content}>
        <Outlet context={context} />
      </main>
    </div>
  );
}

export default DoctorLayout;
