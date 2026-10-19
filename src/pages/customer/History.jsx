import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageCircle, Calendar, CheckCircle, Trash2, X } from "lucide-react";
import styles from "./History.module.css";

const TABS = ["Berlangsung", "Terjadwal", "Selesai"];

const initialScheduled = [
  {
    id: 101,
    doctorId: 2,
    doctorName: "Dr. Andi Pratama",
    initials: "AP",
    specialty: "Dokter Gigi",
    status: "Terjadwal",
    date: "25 Oktober 2026",
    time: "10.00 WIB",
    chatId: 2,
  },
  {
    id: 102,
    doctorId: 5,
    doctorName: "Dr. Budi Santoso",
    initials: "BS",
    specialty: "Dokter Mata",
    status: "Terjadwal",
    date: "28 Oktober 2026",
    time: "09.00 WIB",
    chatId: 5,
  },
];

const initialDone = [
  {
    id: 201,
    doctorId: 6,
    doctorName: "Dr. Kevin Wijaya",
    initials: "KW",
    specialty: "Dokter Umum",
    status: "Selesai",
    date: "10 Oktober 2026",
    summary: "Pasien didiagnosa ISPA ringan. Diresepkan antibiotik 5 hari.",
    chatId: 6,
  },
  {
    id: 202,
    doctorId: 4,
    doctorName: "Dr. Rina Lestari",
    initials: "RL",
    specialty: "Dokter Kulit",
    status: "Selesai",
    date: "3 Oktober 2026",
    summary: "Konsultasi kulit sensitif. Disarankan pemakaian pelembap non-fragrance.",
    chatId: 4,
  },
];

function History() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.tab || "Berlangsung"
  );
  const [ongoing, setOngoing] = useState([]);
  const [scheduled, setScheduled] = useState(initialScheduled);
  const [done, setDone] = useState(initialDone);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  useEffect(() => {
    const load = () => {
      const stored = JSON.parse(localStorage.getItem("riwayat") || "[]");
      console.log("[History] loaded dari localStorage:", stored);
      setOngoing(stored);

      const storedScheduled = JSON.parse(
        localStorage.getItem("riwayat_terjadwal") || "null"
      );
      if (storedScheduled !== null) {
        setScheduled(storedScheduled);
      } else {
        setScheduled(initialScheduled);
        localStorage.setItem(
          "riwayat_terjadwal",
          JSON.stringify(initialScheduled)
        );
      }
      const storedDone = JSON.parse(
        localStorage.getItem("riwayat_selesai") || "null"
      );
      if (storedDone !== null) {
        setDone(storedDone);
      } else {
        setDone(initialDone);
        localStorage.setItem("riwayat_selesai", JSON.stringify(initialDone));
      }
    };

    load();

    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, [activeTab]);

  function askDelete(id, type) {
    setDeleteTarget({ id, type });
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    const { id, type } = deleteTarget;

    if (type === "ongoing") {
      const updated = ongoing.filter((item) => item.id !== id);
      setOngoing(updated);
      localStorage.setItem("riwayat", JSON.stringify(updated));
    } else if (type === "scheduled") {
      const updated = scheduled.filter((item) => item.id !== id);
      setScheduled(updated);
      localStorage.setItem("riwayat_terjadwal", JSON.stringify(updated));
    } else if (type === "done") {
      const updated = done.filter((item) => item.id !== id);
      setDone(updated);
      localStorage.setItem("riwayat_selesai", JSON.stringify(updated));
    }

    setDeleteTarget(null);
  }

  const renderList = () => {
    if (activeTab === "Berlangsung") {
      if (ongoing.length === 0) {
        return (
          <div className={styles.empty}>
            <MessageCircle size={40} strokeWidth={1.5} />
            <p>Tidak ada konsultasi yang sedang berlangsung.</p>
          </div>
        );
      }
      return ongoing.map((item) => (
        <div key={item.id} className={styles.card}>
          <div className={styles.cardLeft}>
            <div className={styles.avatar}>{item.initials}</div>
            <div>
              <strong>{item.doctorName}</strong>
              <span className={styles.specialty}>{item.specialty}</span>
              <span className={styles.date}>Dimulai: {item.date}</span>
            </div>
          </div>
          <div className={styles.cardRight}>
            <span className={`${styles.badge} ${styles.badgeActive}`}>
              Berlangsung
            </span>
            <Link
              to={`/konsultasi/${item.chatId}`}
              className={styles.continueBtn}
            >
              <MessageCircle size={15} />
              Lanjutkan Konsultasi
            </Link>
            <button
              className={styles.deleteBtn}
              onClick={() => askDelete(item.id, "ongoing")}
            >
              <Trash2 size={14} />
              Hapus
            </button>
          </div>
        </div>
      ));
    }

    if (activeTab === "Terjadwal") {
      if (scheduled.length === 0) {
        return (
          <div className={styles.empty}>
            <Calendar size={40} strokeWidth={1.5} />
            <p>Tidak ada konsultasi yang terjadwal.</p>
          </div>
        );
      }
      return scheduled.map((item) => (
        <div key={item.id} className={styles.card}>
          <div className={styles.cardLeft}>
            <div className={styles.avatar}>{item.initials}</div>
            <div>
              <strong>{item.doctorName}</strong>
              <span className={styles.specialty}>{item.specialty}</span>
              <span className={styles.date}>
                <Calendar size={13} /> {item.date} — {item.time}
              </span>
            </div>
          </div>
          <div className={styles.cardRight}>
            <span className={`${styles.badge} ${styles.badgeScheduled}`}>
              Terjadwal
            </span>
            <Link
              to={`/konsultasi/${item.chatId}`}
              className={styles.continueBtn}
            >
              <MessageCircle size={15} />
              Mulai Konsultasi
            </Link>
            <button
              className={styles.deleteBtn}
              onClick={() => askDelete(item.id, "scheduled")}
            >
              <Trash2 size={14} />
              Hapus
            </button>
          </div>
        </div>
      ));
    }

    if (activeTab === "Selesai") {
      if (done.length === 0) {
        return (
          <div className={styles.empty}>
            <CheckCircle size={40} strokeWidth={1.5} />
            <p>Tidak ada riwayat konsultasi selesai.</p>
          </div>
        );
      }
      return done.map((item) => (
        <div key={item.id} className={styles.card}>
          <div className={styles.cardLeft}>
            <div className={styles.avatar}>{item.initials}</div>
            <div>
              <strong>{item.doctorName}</strong>
              <span className={styles.specialty}>{item.specialty}</span>
              <span className={styles.date}>
                <CheckCircle size={13} /> {item.date}
              </span>
              {item.summary && (
                <p className={styles.summary}>{item.summary}</p>
              )}
            </div>
          </div>
          <div className={styles.cardRight}>
            <span className={`${styles.badge} ${styles.badgeDone}`}>
              Selesai
            </span>
            <Link
              to={`/konsultasi/${item.chatId}`}
              className={styles.detailBtn}
            >
              Lihat Detail
            </Link>
            <button
              className={styles.deleteBtn}
              onClick={() => askDelete(item.id, "done")}
            >
              <Trash2 size={14} />
              Hapus
            </button>
          </div>
        </div>
      ));
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <span className={styles.label}>RIWAYAT</span>
        <h1>Riwayat Konsultasi</h1>
        <p>Pantau semua konsultasi Anda di satu tempat.</p>
      </div>

      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${
              activeTab === tab ? styles.tabActive : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {tab === "Berlangsung" && ongoing.length > 0 && (
              <span className={styles.count}>{ongoing.length}</span>
            )}
            {tab === "Terjadwal" && scheduled.length > 0 && (
              <span className={styles.count}>{scheduled.length}</span>
            )}
            {tab === "Selesai" && done.length > 0 && (
              <span className={styles.count}>{done.length}</span>
            )}
          </button>
        ))}
      </div>

      <div className={styles.list}>{renderList()}</div>

      {deleteTarget && (
        <div
          className={styles.overlay}
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              onClick={() => setDeleteTarget(null)}
            >
              <X size={18} />
            </button>
            <div className={styles.modalIcon}>
              <Trash2 size={26} />
            </div>
            <h3>Hapus Riwayat?</h3>
            <p>
              Riwayat konsultasi ini akan dihapus dari daftar. Tindakan ini
              tidak bisa dibatalkan.
            </p>
            <div className={styles.modalActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setDeleteTarget(null)}
              >
                Batal
              </button>
              <button
                className={styles.confirmDeleteBtn}
                onClick={confirmDelete}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default History;
