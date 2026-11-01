import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { STATUS_LABEL, formatDate } from "../../data/doctorData";
import styles from "./doctor.module.css";

const tabs = ["semua", "menunggu", "dikonfirmasi", "selesai", "dibatalkan"];

function DoctorAppointments() {
  const { appointments, updateAppointment } = useOutletContext();
  const [tab, setTab] = useState("semua");
  const [search, setSearch] = useState("");

  const filtered = appointments
    .filter((a) => tab === "semua" || a.status === tab)
    .filter((a) => a.patient.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));

  return (
    <>
      <section className={styles.header}>
        <span className={styles.label}>APPOINTMENT</span>
        <h1>Daftar Appointment</h1>
        <p>Kelola janji konsultasi dari pasien Anda.</p>
      </section>

      <section className={styles.toolbar}>
        <div className={styles.tabs}>
          {tabs.map((t) => (
            <button
              key={t}
              className={tab === t ? `${styles.tab} ${styles.tabActive}` : styles.tab}
              onClick={() => setTab(t)}
            >
              {t === "semua" ? "Semua" : STATUS_LABEL[t]}
            </button>
          ))}
        </div>
        <input
          type="text"
          className={styles.search}
          placeholder="Cari nama pasien..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section className={styles.card}>
        <div className={styles.cardHead}>
          <h2>Janji Konsultasi</h2>
          <span>{filtered.length} appointment</span>
        </div>

        {filtered.length > 0 ? (
          <div className={styles.list}>
            {filtered.map((a) => (
              <div className={styles.item} key={a.id}>
                <div className={styles.itemMain}>
                  <span className={styles.time}>{a.time}</span>
                  <div>
                    <strong>{a.patient.name}</strong>
                    <p>{formatDate(a.date)} · {a.complaint}</p>
                  </div>
                </div>
                <div className={styles.actions}>
                  <span className={`${styles.badge} ${styles[a.status]}`}>{STATUS_LABEL[a.status]}</span>
                  {a.status === "menunggu" && (
                    <>
                      <button className={styles.btn} onClick={() => updateAppointment(a.id, { status: "dikonfirmasi" })}>Terima</button>
                      <button className={styles.btnDanger} onClick={() => updateAppointment(a.id, { status: "dibatalkan" })}>Tolak</button>
                    </>
                  )}
                  <Link to={`/doctor/appointment/${a.id}`} className={styles.btnGhost}>Detail</Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>Tidak ada appointment yang sesuai.</div>
        )}
      </section>
    </>
  );
}

export default DoctorAppointments;
