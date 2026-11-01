import { Link, useOutletContext } from "react-router-dom";
import { CalendarCheck, Hourglass, CircleCheck, Users } from "lucide-react";
import { STATUS_LABEL, formatDate, todayISO, todayDayIndex } from "../../data/doctorData";
import styles from "./doctor.module.css";

function DoctorDashboard() {
  const { doctor, appointments, schedule, updateAppointment } = useOutletContext();

  const todayList = appointments
    .filter((a) => a.date === todayISO)
    .sort((a, b) => a.time.localeCompare(b.time));
  const pending = appointments.filter((a) => a.status === "menunggu");
  const done = appointments.filter((a) => a.status === "selesai").length;
  const patients = new Set(appointments.map((a) => a.patient.id)).size;

  const today = schedule[todayDayIndex];

  const stats = [
    { label: "Janji hari ini", value: todayList.length, icon: CalendarCheck },
    { label: "Menunggu konfirmasi", value: pending.length, icon: Hourglass },
    { label: "Konsultasi selesai", value: done, icon: CircleCheck },
    { label: "Total pasien", value: patients, icon: Users },
  ];

  return (
    <>
      <section className={styles.header}>
        <span className={styles.label}>DASHBOARD</span>
        <h1>Selamat datang, {doctor.name}</h1>
        <p>
          {formatDate(todayISO)} ·{" "}
          {today?.active
            ? `Praktik ${today.start} - ${today.end}`
            : "Tidak ada jadwal praktik hari ini"}
        </p>
      </section>

      <section className={styles.stats}>
        {stats.map(({ label, value, icon: Icon }) => (
          <div className={styles.stat} key={label}>
            <div className={styles.statIcon}><Icon size={22} aria-hidden="true" /></div>
            <div>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          </div>
        ))}
      </section>

      <section className={styles.twoCol}>
        <div className={styles.card}>
          <div className={styles.cardHead}>
            <h2>Jadwal Hari Ini</h2>
            <Link to="/doctor/appointment" className={styles.btnGhost}>Lihat semua</Link>
          </div>

          {todayList.length > 0 ? (
            <div className={styles.list}>
              {todayList.map((a) => (
                <div className={styles.item} key={a.id}>
                  <div className={styles.itemMain}>
                    <span className={styles.time}>{a.time}</span>
                    <div>
                      <strong>{a.patient.name}</strong>
                      <p>{a.complaint}</p>
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <span className={`${styles.badge} ${styles[a.status]}`}>{STATUS_LABEL[a.status]}</span>
                    <Link to={`/doctor/appointment/${a.id}`} className={styles.btnGhost}>Detail</Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>Belum ada janji untuk hari ini.</div>
          )}
        </div>

        <div className={styles.card}>
          <h2>Menunggu Konfirmasi</h2>
          {pending.length > 0 ? (
            <div className={styles.list}>
              {pending.map((a) => (
                <div className={styles.item} key={a.id}>
                  <div className={styles.itemMain}>
                    <div>
                      <strong>{a.patient.name}</strong>
                      <p>{formatDate(a.date)} · {a.time}</p>
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <button className={styles.btn} onClick={() => updateAppointment(a.id, { status: "dikonfirmasi" })}>Terima</button>
                    <button className={styles.btnDanger} onClick={() => updateAppointment(a.id, { status: "dibatalkan" })}>Tolak</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>Tidak ada permintaan baru.</div>
          )}
        </div>
      </section>
    </>
  );
}

export default DoctorDashboard;
