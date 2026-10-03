import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Booking.module.css";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Wijaya",
    initials: "SW",
    specialty: "Dokter Umum",
    experience: "8 tahun pengalaman",
    schedule: "Senin - Jumat, 09.00 - 15.00",
  },
  {
    id: 2,
    name: "Dr. Andi Pratama",
    initials: "AP",
    specialty: "Dokter Gigi",
    experience: "6 tahun pengalaman",
    schedule: "Senin - Sabtu, 10.00 - 16.00",
  },
  {
    id: 3,
    name: "Dr. Maya Putri",
    initials: "MP",
    specialty: "Dokter Anak",
    experience: "10 tahun pengalaman",
    schedule: "Senin - Jumat, 08.00 - 14.00",
  },
  {
    id: 4,
    name: "Dr. Rina Lestari",
    initials: "RL",
    specialty: "Dokter Kulit",
    experience: "7 tahun pengalaman",
    schedule: "Selasa - Sabtu, 10.00 - 16.00",
  },
  {
    id: 5,
    name: "Dr. Budi Santoso",
    initials: "BS",
    specialty: "Dokter Mata",
    experience: "9 tahun pengalaman",
    schedule: "Senin - Jumat, 09.00 - 15.00",
  },
  {
    id: 6,
    name: "Dr. Kevin Wijaya",
    initials: "KW",
    specialty: "Dokter Umum",
    experience: "5 tahun pengalaman",
    schedule: "Senin - Sabtu, 09.00 - 15.00",
  },
];

const timeSlots = ["09.00", "10.00", "11.00", "13.00", "14.00"];

function Booking() {
  const { id } = useParams();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [complaint, setComplaint] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const doctor = doctors.find((doctor) => doctor.id === Number(id));

  if (!doctor) {
    return (
      <main className={styles.page}>
        <h2>Dokter tidak ditemukan</h2>
        <Link to="/dokter">Kembali ke Cari Dokter</Link>
      </main>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (date && time) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <main className={styles.page}>
        <section className={styles.success}>
          <div className={styles.successIcon}>✓</div>

          <span className={styles.label}>JANJI BERHASIL DIBUAT</span>

          <h1>Booking Berhasil</h1>

          <p>
            Janji konsultasi Anda dengan <strong>{doctor.name}</strong>{" "}
            telah berhasil dibuat.
          </p>

          <div className={styles.summary}>
            <div>
              <span>Dokter</span>
              <strong>{doctor.name}</strong>
            </div>

            <div>
              <span>Tanggal</span>
              <strong>{date}</strong>
            </div>

            <div>
              <span>Waktu</span>
              <strong>{time}</strong>
            </div>
          </div>

          <Link to="/dokter" className={styles.backButton}>
            Kembali ke Cari Dokter
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <Link to={`/dokter/${doctor.id}`} className={styles.back}>
        ← Kembali ke Profil Dokter
      </Link>

      <section className={styles.bookingLayout}>
        <aside className={styles.doctorCard}>
          <div className={styles.avatar}>{doctor.initials}</div>

          <span className={styles.specialty}>{doctor.specialty}</span>

          <h2>{doctor.name}</h2>

          <p>{doctor.experience}</p>

          <div className={styles.schedule}>
            <span>Jadwal Praktik</span>
            <strong>{doctor.schedule}</strong>
          </div>
        </aside>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <span className={styles.label}>DETAIL JANJI</span>
            <h2>Pilih Jadwal</h2>
          </div>

          <div className={styles.field}>
            <label htmlFor="date">Tanggal Konsultasi</label>

            <input
              id="date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Waktu Konsultasi</label>

            <div className={styles.timeGrid}>
              {timeSlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  className={
                    time === slot
                      ? `${styles.timeButton} ${styles.selected}`
                      : styles.timeButton
                  }
                  onClick={() => setTime(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="complaint">
              Keluhan / Alasan Konsultasi
            </label>

            <textarea
              id="complaint"
              rows="5"
              placeholder="Tuliskan keluhan atau alasan konsultasi Anda..."
              value={complaint}
              onChange={(event) => setComplaint(event.target.value)}
            />
          </div>

          <div className={styles.formActions}>
            <Link
              to={`/dokter/${doctor.id}`}
              className={styles.cancelButton}
            >
              Batal
            </Link>

            <button type="submit" className={styles.submitButton}>
              Konfirmasi Janji
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Booking;