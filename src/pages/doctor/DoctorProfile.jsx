import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Star } from "lucide-react";
import ProfilePhotoUpload from "../../components/ProfilePhotoUpload";
import {
  getIndonesianPhoneError,
  normalizeIndonesianPhone,
  sanitizePhoneInput,
} from "../../utils/phone";
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
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const strNumber = form.strNumber.trim();
    if (!strNumber || !/^\d+$/.test(strNumber)) {
      setError("Nomor STR wajib diisi dengan angka saja.");
      return;
    }

    const phone = form.phone.trim();
    const phoneError = phone
      ? getIndonesianPhoneError(phone, "Nomor telepon dokter")
      : "Nomor telepon dokter wajib diisi.";
    if (phoneError) {
      setError(phoneError);
      return;
    }

    const initials = form.name
      .replace(/^dr\.?\s*/i, "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("");
    setDoctor({
      ...form,
      strNumber,
      phone: normalizeIndonesianPhone(phone),
      initials: initials || doctor.initials,
    });
    setEditing(false);
    setSaved(true);
  }

  function startEdit() {
    setForm(doctor);
    setError("");
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
              {error && <div className={styles.formError} role="alert">{error}</div>}
              <div className={styles.formGrid}>
                {fields.map(({ key, label, type }) => (
                  <div className={styles.field} key={key}>
                    <label htmlFor={key}>{label}</label>
                    <input
                      id={key}
                      type={type ?? "text"}
                      inputMode={key === "phone" ? "tel" : key === "strNumber" ? "numeric" : undefined}
                      pattern={key === "strNumber" ? "[0-9]*" : undefined}
                      className={styles.input}
                      value={form[key]}
                      onChange={(e) => {
                        const value = key === "phone"
                          ? sanitizePhoneInput(e.target.value)
                          : key === "strNumber"
                            ? e.target.value.replace(/\D/g, "")
                            : e.target.value;
                        setForm({ ...form, [key]: value });
                        setError("");
                      }}
                      required
                    />
                    {key === "strNumber" && <small>Nomor STR berupa angka saja, sesuai form admin.</small>}
                    {key === "phone" && <small>Minimal 12 angka; gunakan format 08... atau +62.... Tanda hubung boleh, spasi tidak.</small>}
                  </div>
                ))}
              </div>
              <div className={styles.field}>
                <label htmlFor="bio">Tentang Dokter</label>
                <textarea id="bio" rows="4" className={styles.input} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
              </div>
              <div className={styles.actions}>
                <button type="submit" className={styles.btn}>Simpan</button>
                <button type="button" className={styles.btnGhost} onClick={() => { setEditing(false); setError(""); }}>Batal</button>
              </div>
            </form>
          ) : (
            <>
              <div className={styles.infoGrid}>
                {fields.map(({ key, label }) => (
                  <div className={styles.info} key={key}>
                    <span>{label}</span>
                    <strong>{doctor[key] || "—"}</strong>
                  </div>
                ))}
              </div>
              <h2 style={{ marginTop: 22 }}>Tentang Dokter</h2>
              <p style={{ margin: 0 }}>{doctor.bio}</p>
            </>
          )}
        </div>

        <div className={styles.card} style={{ textAlign: "center" }}>
          <ProfilePhotoUpload
            src={doctor.image}
            name={doctor.name}
            initials={doctor.initials}
            onChange={(image) => setDoctor({ ...doctor, image })}
          />
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
