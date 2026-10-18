import { useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { STATUS_LABEL, formatDate } from "../../data/doctorData";
import styles from "./doctor.module.css";

function PatientDetail() {
  const { id } = useParams();
  const { appointments, updateAppointment } = useOutletContext();
  const appointment = appointments.find((a) => a.id === Number(id));

  const [form, setForm] = useState({
    diagnosis: appointment?.diagnosis ?? "",
    notes: appointment?.notes ?? "",
    prescription: appointment?.prescription ?? "",
  });
  const [saved, setSaved] = useState(false);

  if (!appointment) {
    return (
      <>
        <h2>Appointment tidak ditemukan</h2>
        <Link to="/doctor/appointment">Kembali ke Daftar Appointment</Link>
      </>
    );
  }

  const { patient } = appointment;
  const history = appointments.filter(
    (a) => a.patient.id === patient.id && a.id !== appointment.id && a.status === "selesai",
  );
  const locked = appointment.status === "selesai" || appointment.status === "dibatalkan";
  const canWrite = appointment.status === "dikonfirmasi";

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setSaved(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.diagnosis.trim()) return;
    updateAppointment(appointment.id, { ...form, status: "selesai" });
    setSaved(true);
  }

  return (
    <>
      <Link to="/doctor/appointment" className={styles.back}>← Kembali ke Daftar Appointment</Link>

      <section className={styles.header}>
        <span className={styles.label}>DETAIL PASIEN</span>
        <h1>{patient.name}</h1>
        <p>
          {formatDate(appointment.date)} · {appointment.time}{" "}
          <span className={`${styles.badge} ${styles[appointment.status]}`}>{STATUS_LABEL[appointment.status]}</span>
        </p>
      </section>

      <section className={styles.twoCol}>
        <div className={styles.stack}>
          <div className={styles.card}>
            <h2>Data Pasien</h2>
            <div className={styles.infoGrid}>
              <div className={styles.info}><span>Usia</span><strong>{patient.age} tahun</strong></div>
              <div className={styles.info}><span>Jenis Kelamin</span><strong>{patient.gender}</strong></div>
              <div className={styles.info}><span>Golongan Darah</span><strong>{patient.bloodType}</strong></div>
              <div className={styles.info}><span>No. Telepon</span><strong>{patient.phone}</strong></div>
              <div className={styles.info}><span>Alergi</span><strong>{patient.allergy}</strong></div>
            </div>
          </div>

          <div className={styles.card}>
            <h2>Keluhan</h2>
            <p style={{ margin: 0 }}>{appointment.complaint}</p>
          </div>

          <div className={styles.card}>
            <h2>Riwayat Kunjungan</h2>
            {history.length > 0 ? (
              <div className={styles.list}>
                {history.map((h) => (
                  <div className={styles.item} key={h.id}>
                    <div className={styles.itemMain}>
                      <div>
                        <strong>{formatDate(h.date)}</strong>
                        <p>{h.diagnosis}</p>
                      </div>
                    </div>
                    <Link to={`/doctor/appointment/${h.id}`} className={styles.btnGhost}>Lihat</Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.empty}>Belum ada riwayat konsultasi sebelumnya.</div>
            )}
          </div>
        </div>

        <form className={styles.card} onSubmit={handleSubmit}>
          <h2>Hasil Konsultasi</h2>

          {saved && <div className={styles.notice}>Konsultasi ditandai selesai dan hasilnya tersimpan.</div>}

          {appointment.status === "menunggu" && (
            <div className={styles.item} style={{ marginBottom: 16 }}>
              <span>Terima janji ini terlebih dulu untuk mengisi hasil konsultasi.</span>
              <div className={styles.actions}>
                <button type="button" className={styles.btn} onClick={() => updateAppointment(appointment.id, { status: "dikonfirmasi" })}>Terima</button>
                <button type="button" className={styles.btnDanger} onClick={() => updateAppointment(appointment.id, { status: "dibatalkan" })}>Tolak</button>
              </div>
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="diagnosis">Diagnosis</label>
            <input id="diagnosis" className={styles.input} value={form.diagnosis} onChange={(e) => handleChange("diagnosis", e.target.value)} disabled={!canWrite} required />
          </div>
          <div className={styles.field}>
            <label htmlFor="notes">Catatan Dokter</label>
            <textarea id="notes" rows="4" className={styles.input} value={form.notes} onChange={(e) => handleChange("notes", e.target.value)} disabled={!canWrite} />
          </div>
          <div className={styles.field}>
            <label htmlFor="prescription">Resep Obat</label>
            <textarea id="prescription" rows="3" className={styles.input} value={form.prescription} onChange={(e) => handleChange("prescription", e.target.value)} disabled={!canWrite} />
          </div>

          {!locked && (
            <button type="submit" className={styles.btn} disabled={!canWrite}>Simpan & Selesaikan Konsultasi</button>
          )}
        </form>
      </section>
    </>
  );
}

export default PatientDetail;
