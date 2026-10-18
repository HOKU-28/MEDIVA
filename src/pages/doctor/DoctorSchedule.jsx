import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { formatDate } from "../../data/doctorData";
import styles from "./doctor.module.css";

function DoctorSchedule() {
  const { schedule, setSchedule, leaves, setLeaves } = useOutletContext();
  const [draft, setDraft] = useState(schedule);
  const [saved, setSaved] = useState(false);
  const [leaveDate, setLeaveDate] = useState("");
  const [leaveReason, setLeaveReason] = useState("");

  function change(index, patch) {
    setDraft((rows) => rows.map((r, i) => (i === index ? { ...r, ...patch } : r)));
    setSaved(false);
  }

  const invalid = draft.some((r) => r.active && r.start >= r.end);

  function handleSave() {
    if (invalid) return;
    setSchedule(draft);
    setSaved(true);
  }

  function addLeave(e) {
    e.preventDefault();
    if (!leaveDate) return;
    setLeaves((list) => [...list, { id: Date.now(), date: leaveDate, reason: leaveReason || "Libur" }]);
    setLeaveDate("");
    setLeaveReason("");
  }

  return (
    <>
      <section className={styles.header}>
        <span className={styles.label}>JADWAL PRAKTIK</span>
        <h1>Atur Jadwal Praktik</h1>
        <p>Tentukan hari dan jam praktik yang tampil pada pasien saat membuat janji.</p>
      </section>

      <section className={styles.twoCol}>
        <div className={styles.card}>
          <h2>Jadwal Mingguan</h2>
          {saved && <div className={styles.notice}>Jadwal praktik berhasil disimpan.</div>}

          <div className={styles.list}>
            {draft.map((row, i) => (
              <div className={styles.item} key={row.day}>
                <label className={styles.itemMain}>
                  <input type="checkbox" checked={row.active} onChange={(e) => change(i, { active: e.target.checked })} />
                  <strong>{row.day}</strong>
                </label>

                {row.active ? (
                  <div className={styles.actions}>
                    <input type="time" className={styles.input} aria-label={`Jam mulai ${row.day}`} value={row.start} onChange={(e) => change(i, { start: e.target.value })} />
                    <input type="time" className={styles.input} aria-label={`Jam selesai ${row.day}`} value={row.end} onChange={(e) => change(i, { end: e.target.value })} />
                  </div>
                ) : (
                  <span className={styles.itemMain}>Libur</span>
                )}
              </div>
            ))}
          </div>

          {invalid && <p style={{ color: "#b91c1c", fontSize: "0.85rem" }}>Jam selesai harus lebih besar dari jam mulai.</p>}

          <div style={{ marginTop: 18 }}>
            <button className={styles.btn} onClick={handleSave} disabled={invalid}>Simpan Jadwal</button>
          </div>
        </div>

        <div className={styles.card}>
          <h2>Tanggal Cuti / Libur</h2>
          <form onSubmit={addLeave}>
            <div className={styles.field}>
              <label htmlFor="leaveDate">Tanggal</label>
              <input id="leaveDate" type="date" className={styles.input} value={leaveDate} onChange={(e) => setLeaveDate(e.target.value)} required />
            </div>
            <div className={styles.field}>
              <label htmlFor="leaveReason">Keterangan</label>
              <input id="leaveReason" type="text" className={styles.input} placeholder="Contoh: Seminar" value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)} />
            </div>
            <button type="submit" className={styles.btn}>Tambah Libur</button>
          </form>

          <div className={styles.list} style={{ marginTop: 20 }}>
            {leaves.length === 0 && <div className={styles.empty}>Belum ada tanggal libur.</div>}
            {leaves.map((l) => (
              <div className={styles.item} key={l.id}>
                <div className={styles.itemMain}>
                  <div>
                    <strong>{formatDate(l.date)}</strong>
                    <p>{l.reason}</p>
                  </div>
                </div>
                <button className={styles.btnDanger} aria-label="Hapus libur" onClick={() => setLeaves((list) => list.filter((x) => x.id !== l.id))}>
                  <Trash2 size={15} aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default DoctorSchedule;
