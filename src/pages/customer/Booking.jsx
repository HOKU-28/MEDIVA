import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TriangleAlert, CheckCircle } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";
import {
  doctorsList,
  getSavedDoctorProfile,
  todayISO,
} from "../../data/doctorData";
import { readUserHistory, writeUserHistory } from "../../utils/userHistory";
import styles from "./Booking.module.css";

const timeSlots = ["09.00", "10.00", "11.00", "13.00", "14.00"];

function Booking() {
  const { id } = useParams();
  const { user } = useAuth();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [complaint, setComplaint] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedBookingId, setSubmittedBookingId] = useState(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const doctor = getSavedDoctorProfile(
    doctorsList.find((doc) => doc.id === Number(id))
  );

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

    if (!date) {
      setFormError("Tanggal konsultasi wajib dipilih.");
      return;
    }

    if (date < todayISO) {
      setFormError("Tanggal konsultasi tidak boleh sudah lewat.");
      return;
    }

    if (!time) {
      setFormError("Silakan pilih waktu konsultasi.");
      return;
    }
    setFormError("");

    const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const storedScheduled = readUserHistory(user.id, "scheduled");
    const bookingId = Date.now();
    const newOngoing = {
      id: bookingId,
      doctorId: doctor.id,
      doctorName: doctor.name,
      initials: doctor.initials,
      specialty: doctor.specialty,
      status: "Berlangsung",
      date: formattedDate,
      time: `${time} WIB`,
      complaint,
      chatId: bookingId,
    };
    const newScheduled = {
      id: bookingId,
      doctorId: doctor.id,
      doctorName: doctor.name,
      initials: doctor.initials,
      specialty: doctor.specialty,
      status: "Terjadwal",
      date: formattedDate,
      time: `${time} WIB`,
      complaint,
      chatId: bookingId,
    };
    writeUserHistory(user.id, "scheduled", [newScheduled, ...storedScheduled]);
    const storedOngoing = readUserHistory(user.id, "ongoing");
    writeUserHistory(user.id, "ongoing", [newOngoing, ...storedOngoing]);

    setSubmittedBookingId(bookingId);
    setSubmitted(true);
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
              to={`/konsultasi/${doctor.id}?sessionId=${submittedBookingId}`}
              className={styles.chatButton}
            >
              Chat dengan Dokter
            </Link>

            <Link
              to="/riwayat"
              state={{ tab: "Terjadwal" }}
              className={styles.historyButton}
            >
              Lihat Janji
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

          {formError && (
            <p className={styles.validationError} role="alert">
              {formError}
            </p>
          )}

          <div className={styles.field}>
            <label htmlFor="date">Tanggal Konsultasi</label>

            <input
              id="date"
              type="date"
              min={todayISO}
              value={date}
              aria-invalid={Boolean(formError && (!date || date < todayISO))}
              onChange={(event) => {
                setDate(event.target.value);
                setFormError("");
              }}
            />
          </div>

          <div className={styles.field}>
            <span id="time-label" className={styles.fieldLabel}>
              Waktu Konsultasi
            </span>

            <div
              className={styles.timeGrid}
              role="group"
              aria-labelledby="time-label"
              aria-required="true"
              aria-invalid={Boolean(formError && !time)}
            >
              {timeSlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  className={
                    time === slot
                      ? `${styles.timeButton} ${styles.selected}`
                      : styles.timeButton
                  }
                  aria-pressed={time === slot}
                  onClick={() => {
                    setTime(slot);
                    setFormError("");
                  }}
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