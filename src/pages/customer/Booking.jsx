import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TriangleAlert, CheckCircle } from "lucide-react";
import { doctorsList } from "../../data/doctorData";
import styles from "./Booking.module.css";

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

  const doctor = doctorsList.find((doc) => doc.id === Number(id));

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
      const formattedDate = new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const stored = JSON.parse(localStorage.getItem("riwayat") || "[]");
      const filtered = stored.filter((r) => r.doctorId !== doctor.id);
      const newEntry = {
        id: Date.now(),
        doctorId: doctor.id,
        doctorName: doctor.name,
        initials: doctor.initials,
        specialty: doctor.specialty,
        status: "Berlangsung",
        date: formattedDate || date,
        time: `${time} WIB`,
        complaint: complaint,
        chatId: doctor.id,
      };
      localStorage.setItem("riwayat", JSON.stringify([newEntry, ...filtered]));

      const storedScheduled = JSON.parse(
        localStorage.getItem("riwayat_terjadwal") || "[]"
      );
      const filteredScheduled = storedScheduled.filter(
        (s) => s.doctorId !== doctor.id
      );
      const newScheduled = {
        id: Date.now() + 1,
        doctorId: doctor.id,
        doctorName: doctor.name,
        initials: doctor.initials,
        specialty: doctor.specialty,
        status: "Terjadwal",
        date: formattedDate || date,
        time: `${time} WIB`,
        chatId: doctor.id,
      };
      localStorage.setItem(
        "riwayat_terjadwal",
        JSON.stringify([newScheduled, ...filteredScheduled])
      );

      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <main className={styles.page}>
        <section className={styles.success}>
          <div className={styles.successIcon}>
            <CheckCircle size={32} />
          </div>

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
              <strong>{time} WIB</strong>
            </div>
          </div>

          <div className={styles.successActions}>
            <Link
              to={`/konsultasi/${doctor.id}`}
              className={styles.chatButton}
            >
              Mulai Konsultasi
            </Link>

            <Link
              to="/riwayat"
              className={styles.historyButton}
            >
              Lihat di Riwayat
            </Link>

            <Link to="/dokter" className={styles.backButton}>
              Kembali ke Cari Dokter
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.headerArea}>
        <Link to={`/dokter/${doctor.id}`} className={styles.back}>
          ← Kembali ke Profil Dokter
        </Link>

        <div className={styles.emergencyAdvisory}>
          <TriangleAlert size={18} className={styles.emergencyIcon} />
          <div>
            <strong>Peringatan Medis Darurat:</strong> Layanan booking ini ditujukan untuk konsultasi terjadwal non-darurat. Jika Anda mengalami kondisi gawat darurat medis, segera hubungi 119 atau kunjungi IGD terdekat.
          </div>
        </div>
      </div>

      <section className={styles.bookingLayout}>
        <aside className={styles.doctorCard}>
          <div className={styles.avatar}>
            {doctor.image ? (
              <img src={doctor.image} alt={doctor.name} className={styles.avatarImg} />
            ) : (
              doctor.initials
            )}
          </div>

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