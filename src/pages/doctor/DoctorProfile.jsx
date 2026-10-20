import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Star } from "lucide-react";
import styles from "./doctor.module.css";

const fields = [
  { key: "name", label: "Nama Lengkap" },
  { key: "specialty", label: "Spesialisasi" },
  { key: "strNumber", label: "Nomor STR" },
  { key: "education", label: "Pendidikan" },
  { key: "experience", label: "Pengalaman" },
  { key: "location", label: "Lokasi Praktik" },
  { key: "phone", label: "No. Telepon" },
  { key: "email", label: "Email", type: "email" },
];

function DoctorProfile() {
  const { doctor, setDoctor } = useOutletContext();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(doctor);
  const [saved, setSaved] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const initials = form.name
      .replace(/^dr\.?\s*/i, "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("");
    setDoctor({ ...form, initials: initials || doctor.initials });
    setEditing(false);
    setSaved(true);
  }

  function startEdit() {
    setForm(doctor);
    setSaved(false);
    setEditing(true);
  }

  return (
    <>
      <section className={styles.header}>
        <span className={styles.label}>PROFIL</span>
        <h1>Profil Dokter</h1>
        <p>Informasi ini ditampilkan kepada pasien pada halaman profil dokter.</p>
      </section>

      {saved && <div className={styles.notice}>Profil berhasil diperbarui.</div>}

      <section className={styles.twoCol}>
        <div className={styles.card}>
          <div className={styles.cardHead}>
            <h2>Informasi Dokter</h2>
            {!editing && <button className={styles.btnGhost} onClick={startEdit}>Edit Profil</button>}
          </div>

          {editing ? (
            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                {fields.map(({ key, label, type }) => (
                  <div className={styles.field} key={key}>
                    <label htmlFor={key}>{label}</label>
                    <input id={key} type={type ?? "text"} className={styles.input} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required />
                  </div>
                ))}
              </div>
              <div className={styles.field}>
                <label htmlFor="bio">Tentang Dokter</label>
                <textarea id="bio" rows="4" className={styles.input} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
              </div>
              <div className={styles.actions}>
                <button type="submit" className={styles.btn}>Simpan</button>
                <button type="button" className={styles.btnGhost} onClick={() => setEditing(false)}>Batal</button>
              </div>
            </form>
          ) : (
            <>
              <div className={styles.infoGrid}>
                {fields.map(({ key, label }) => (
                  <div className={styles.info} key={key}>
                    <span>{label}</span>
                    <strong>{doctor[key]}</strong>
                  </div>
                ))}
              </div>
              <h2 style={{ marginTop: 22 }}>Tentang Dokter</h2>
              <p style={{ margin: 0 }}>{doctor.bio}</p>
            </>
          )}
        </div>

        <div className={styles.card} style={{ textAlign: "center" }}>
          <div className={styles.statIcon} style={{ width: 84, height: 84, margin: "0 auto 14px", borderRadius: "9999px", background: "var(--color-primary)", color: "#fff", fontSize: "1.6rem", fontWeight: 700, overflow: "hidden" }}>
            {doctor.image ? (
              <img src={doctor.image} alt={doctor.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            ) : (
              doctor.initials
            )}
          </div>
          <h2 style={{ marginBottom: 4 }}>{doctor.name}</h2>
          <p style={{ margin: "0 0 12px" }}>{doctor.specialty}</p>
          <span className={`${styles.badge} ${styles.menunggu}`}>
            <Star size={13} fill="currentColor" aria-hidden="true" style={{ verticalAlign: "-2px" }} /> {doctor.rating}
          </span>
        </div>
      </section>
    </>
  );
}

export default DoctorProfile;
