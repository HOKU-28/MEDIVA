import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import styles from "./Chat.module.css";

const doctors = [
  { id: 1, name: "Dr. Sarah Wijaya", initials: "SW", specialty: "Dokter Umum", experience: "8 tahun" },
  { id: 2, name: "Dr. Andi Pratama", initials: "AP", specialty: "Dokter Gigi", experience: "6 tahun" },
  { id: 3, name: "Dr. Maya Putri", initials: "MP", specialty: "Dokter Anak", experience: "10 tahun" },
  { id: 4, name: "Dr. Rina Lestari", initials: "RL", specialty: "Dokter Kulit", experience: "7 tahun" },
  { id: 5, name: "Dr. Budi Santoso", initials: "BS", specialty: "Dokter Mata", experience: "9 tahun" },
  { id: 6, name: "Dr. Kevin Wijaya", initials: "KW", specialty: "Dokter Umum", experience: "5 tahun" },
];

const specialtyOptions = {
  "Dokter Umum": [
    "🤒 Demam & Sakit Kepala",
    "🤧 Batuk Berdahak & Flu",
    "🤢 Sakit Perut & Mual",
    "😴 Badan Lemas & Pegal",
  ],
  "Dokter Gigi": [
    "🦷 Gigi Berlubang & Ngilu",
    "🩸 Gusi Bengkak & Berdarah",
    "⚡ Nyeri Gigi Berdenyut",
    "🛠️ Tambalan Gigi Lepas",
  ],
  "Dokter Anak": [
    "🌡️ Si kecil demam tinggi",
    "👶 Batuk, pilek & grok-grok",
    "🥣 Susah makan & lemas",
    "🔴 Muncul ruam merah",
  ],
  "Dokter Kulit": [
    "✨ Gatal & ruam kemerahan",
    "💆 Jerawat meradang",
    "🧴 Kulit kering & mengelupas",
    "🍤 Alergi makanan / debu",
  ],
  "Dokter Mata": [
    "👁️ Mata merah & perih",
    "👓 Pandangan buram / kabur",
    "💧 Mata berair & gatal",
    "⚠️ Terasa mengganjal di mata",
  ],
};

const durationOptions = [
  "Baru hari ini terasa",
  "Sudah 2 - 3 hari",
  "Sudah lebih dari 1 minggu",
];

const treatmentOptions = [
  "Belum minum obat apapun",
  "Sudah minum Parasetamol",
  "Sudah minum obat warung biasa",
];

const followUpOptions = [
  "💊 Rekomendasi obat yang tepat apa ya Dok?",
  "🏥 Apakah perlu pemeriksaan fisik ke klinik?",
  "🙏 Terima kasih banyak atas sarannya, Dok!",
];

const completedOptions = [
  "🔄 Tanya keluhan lain",
  "✅ Akhiri Konsultasi",
];

function getTime() {
  return new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function readStorageList(key, fallback = []) {
  try {
    const stored = localStorage.getItem(key);
    if (stored === null || stored === "") return fallback;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function generateDoctorReply(text, doctor, stage) {
  const lower = text.toLowerCase();

  if (lower.includes("terima kasih") || lower.includes("makasih")) {
    return `Sama-sama! Senang bisa membantu Anda. Tetap jaga kesehatan dan istirahat yang cukup ya. Jika sesi sudah selesai, silakan tekan tombol 'Akhiri Konsultasi' di kanan atas.`;
  }

  if (lower.includes("demam") || lower.includes("panas")) {
    return `Baik, keluhan demam biasanya merupakan respons tubuh melawan infeksi atau peradangan. Sudah berapa lama demam ini dirasakan dan apakah disertai gejala menggigil?`;
  }
  if (lower.includes("batuk") || lower.includes("flu") || lower.includes("pilek")) {
    return `Baik, untuk batuk dan flu, perhatikan apakah dahaknya berwarna bening atau kekuningan ya. Sejak kapan keluhan batuk ini mulai terasa?`;
  }
  if (lower.includes("perut") || lower.includes("mual") || lower.includes("diare")) {
    return `Baik, untuk keluhan perut, apakah rasa nyerinya seperti melilit, perih seperti maag, atau kembung? Sudah berapa hari Anda rasakan?`;
  }
  if (lower.includes("lemas") || lower.includes("pegal") || lower.includes("pusing")) {
    return `Baik, pusing dan badan lemas sering terkait kurang tidur, dehidrasi, atau tanda awal infeksi virus. Sejak kapan Anda merasakan badan drop seperti ini?`;
  }
  if (lower.includes("gigi") || lower.includes("gusi")) {
    return `Baik, untuk keluhan gigi dan gusi, apakah nyerinya terasa ngilu tajam saat terkena air dingin/manis, atau berdenyut tanpa henti?`;
  }
  if (lower.includes("anak") || lower.includes("kecil") || lower.includes("bayi")) {
    return `Baik Bunda/Ayah, bagaimana dengan asupan cairan dan nafsu makan si kecil saat ini? Sudah berapa hari kondisi ini berlangsung?`;
  }
  if (lower.includes("kulit") || lower.includes("gatal") || lower.includes("ruam") || lower.includes("jerawat")) {
    return `Baik, untuk keluhan kulit tersebut, apakah terasa gatal sekali, perih, atau panas? Sudah berapa lama gejalanya muncul?`;
  }
  if (lower.includes("mata") || lower.includes("buram") || lower.includes("perih")) {
    return `Baik, hindari mengucek mata ya. Apakah matanya mengeluarkan kotoran berlebih atau terasa peka terhadap cahaya? Sejak kapan keluhan ini dirasakan?`;
  }

  if (lower.includes("hari") || lower.includes("minggu") || lower.includes("baru")) {
    return `Terima kasih atas informasinya. Sebelum berkonsultasi ke saya, apakah sudah sempat mengonsumsi obat tertentu untuk meredakan gejalanya?`;
  }

  if (lower.includes("belum") || lower.includes("parasetamol") || lower.includes("warung") || lower.includes("obat")) {
    return `Baik, saya pahami. Untuk penanganan awal: pastikan istirahat cukup, minum air putih hangat minimal 2 liter sehari, dan hindari pemicu stres/makanan iritan. Anda bisa mengonsumsi obat penurun gejala sesuai aturan dosis. Ada hal spesifik yang ingin ditanyakan terkait pengobatan?`;
  }

  if (lower.includes("rekomendasi") || lower.includes("resep")) {
    return `Untuk penanganan mandiri awal, Anda bisa gunakan Paracetamol 500mg (1 tablet tiap 6-8 jam setelah makan bila nyeri/demam), serta vitamin C 500mg untuk daya tahan tubuh. Bila dalam 3 hari keluhan tidak berkurang, disarankan datang ke klinik ya.`;
  }

  if (lower.includes("klinik") || lower.includes("periksa") || lower.includes("lab")) {
    return `Jika dalam 3 hari ke depan gejala tidak membaik, demam mencapai lebih dari 38.5°C, atau timbul rasa sesak/nyeri berat, sebaiknya segera periksa langsung ke klinik terdekat agar dapat dilakukan pemeriksaan fisik dan laboratorium ya.`;
  }

  return `Baik, saya catat penjelasannya. Langkah awal yang paling penting adalah cukup istirahat dan hidrasi cairan ya. Silakan ceritakan jika ada gejala tambahan lainnya.`;
}

function Chat() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const id = Number(doctorId);
  const doctor = doctors.find((d) => d.id === id);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatStage, setChatStage] = useState(0); // 0: keluhan, 1: durasi, 2: obat, 3: saran, 4: selesai
  const [showEndModal, setShowEndModal] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!doctor) return;

    const stored = readStorageList("riwayat");
    const filtered = stored.filter((r) => r.doctorId !== id);
    const newEntry = {
      id: Date.now(),
      doctorId: id,
      doctorName: doctor.name,
      initials: doctor.initials,
      specialty: doctor.specialty,
      status: "Berlangsung",
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      chatId: id,
    };
    localStorage.setItem("riwayat", JSON.stringify([newEntry, ...filtered]));

    const openings = {
      "Dokter Umum": `Halo! Saya ${doctor.name}. Silakan ceritakan keluhan kesehatan Anda, atau pilih salah satu keluhan umum di bawah ini ya.`,
      "Dokter Gigi": `Selamat datang! Saya ${doctor.name}. Ada keluhan seputar gigi atau mulut yang ingin dikonsultasikan hari ini?`,
      "Dokter Anak": `Halo Bunda/Ayah! Saya ${doctor.name}. Ada yang bisa saya bantu terkait kondisi kesehatan si kecil?`,
      "Dokter Kulit": `Halo! Saya ${doctor.name}, spesialis kulit. Ceritakan keluhan kulit yang sedang dialami ya.`,
      "Dokter Mata": `Halo! Saya ${doctor.name}. Ada keluhan terkait penglihatan atau mata yang ingin ditanyakan?`,
    };

    const opening = openings[doctor.specialty] || `Halo! Saya ${doctor.name}. Ada yang bisa saya bantu?`;

    setIsTyping(true);
    const timer = setTimeout(() => {
      setMessages([{ id: Date.now(), from: "doctor", text: opening, time: getTime() }]);
      setIsTyping(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!doctor) {
    return (
      <main className={styles.page}>
        <p>Dokter tidak ditemukan.</p>
        <button onClick={() => navigate(-1)}>Kembali</button>
      </main>
    );
  }

  const getQuickOptions = () => {
    if (chatStage === 0) {
      return specialtyOptions[doctor.specialty] || specialtyOptions["Dokter Umum"];
    }
    if (chatStage === 1) {
      return durationOptions;
    }
    if (chatStage === 2) {
      return treatmentOptions;
    }
    if (chatStage === 3) {
      return followUpOptions;
    }
    return completedOptions;
  };

  function handleSendText(text) {
    if (!text || !text.trim() || isTyping) return;

    const trimmed = text.trim();
    setInput("");

    if (trimmed.includes("Akhiri Konsultasi")) {
      setShowEndModal(true);
      return;
    }

    const nextStage = trimmed.includes("keluhan lain")
      ? 0
      : Math.min(chatStage + 1, 4);

    setChatStage(nextStage);

    const userMsg = { id: Date.now(), from: "user", text: trimmed, time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const replyText = generateDoctorReply(trimmed, doctor, nextStage);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "doctor", text: replyText, time: getTime() },
      ]);
      setIsTyping(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }, 700);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    handleSendText(input);
  }

  function handleEndConsultation() {
    const lastUserMsg = [...messages].reverse().find((m) => m.from === "user")?.text;
    const summaryText = lastUserMsg
      ? `Keluhan: "${lastUserMsg.slice(0, 80)}${lastUserMsg.length > 80 ? "..." : ""}". Sesi konsultasi selesai.`
      : `Konsultasi telah selesai bersama ${doctor.name}.`;

    const stored = readStorageList("riwayat");
    const updatedOngoing = stored.filter((r) => r.doctorId !== id);
    localStorage.setItem("riwayat", JSON.stringify(updatedOngoing));

    const storedScheduled = readStorageList("riwayat_terjadwal");
    const updatedScheduled = storedScheduled.filter((s) => s.doctorId !== id);
    localStorage.setItem("riwayat_terjadwal", JSON.stringify(updatedScheduled));

    const storedDone = (() => {
      try {
        const value = localStorage.getItem("riwayat_selesai");
        return value === null ? null : JSON.parse(value);
      } catch {
        return null;
      }
    })();
    const baseDone =
      storedDone !== null
        ? storedDone
        : [
            {
              id: 201,
              doctorId: 6,
              doctorName: "Dr. Kevin Wijaya",
              initials: "KW",
              specialty: "Dokter Umum",
              status: "Selesai",
              date: "10 Oktober 2026",
              summary:
                "Pasien didiagnosa ISPA ringan. Diresepkan antibiotik 5 hari.",
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
              summary:
                "Konsultasi kulit sensitif. Disarankan pemakaian pelembap non-fragrance.",
              chatId: 4,
            },
          ];

    const newDone = {
      id: Date.now(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      initials: doctor.initials,
      specialty: doctor.specialty,
      status: "Selesai",
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      summary: summaryText,
      chatId: doctor.id,
    };

    const updatedDone = [
      newDone,
      ...baseDone.filter((d) => d.doctorId !== doctor.id),
    ];
    localStorage.setItem("riwayat_selesai", JSON.stringify(updatedDone));

    setShowEndModal(false);
    navigate("/riwayat", { state: { tab: "Selesai" } });
  }

  const currentOptions = getQuickOptions();

  return (
    <div className={styles.chatPage}>
      <header className={styles.chatHeader}>
        <button className={styles.backBtn} onClick={() => navigate(-1)} aria-label="Kembali">
          <ArrowLeft size={20} />
        </button>

        <div className={styles.doctorInfo}>
          <div className={styles.avatar}>{doctor.initials}</div>
          <div>
            <strong>{doctor.name}</strong>
            <span>{doctor.specialty}</span>
          </div>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.onlineWrap}>
            <div className={styles.statusDot} />
            <span className={styles.statusText}>Online</span>
          </div>
          <button
            type="button"
            className={styles.endChatBtn}
            onClick={() => setShowEndModal(true)}
          >
            Akhiri Konsultasi
          </button>
        </div>
      </header>

      <div className={styles.statusBar}>
        <span className={styles.statusBadge}>● Konsultasi Sedang Berlangsung</span>
        <span className={styles.aiActiveBadge}>💬 Chat Dokter Aktif</span>
      </div>

      <div className={styles.messages}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.msgRow} ${msg.from === "user" ? styles.msgUser : styles.msgDoctor}`}
          >
            {msg.from === "doctor" && (
              <div className={styles.msgAvatar}>{doctor.initials}</div>
            )}
            <div className={styles.msgBubble}>
              <p>{msg.text}</p>
              <div className={styles.msgFooter}>
                {msg.from === "doctor" && (
                  <span className={styles.aiTag}>💬 Dokter</span>
                )}
                <span className={styles.msgTime}>{msg.time}</span>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className={`${styles.msgRow} ${styles.msgDoctor}`}>
            <div className={styles.msgAvatar}>{doctor.initials}</div>
            <div className={`${styles.msgBubble} ${styles.typingBubble}`}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {currentOptions && currentOptions.length > 0 && (
        <div className={styles.quickBar}>
          <span className={styles.quickLabel}>
            <Sparkles size={14} /> Pilihan Cepat:
          </span>
          <div className={styles.quickScroll}>
            {currentOptions.map((opt, i) => (
              <button
                key={i}
                type="button"
                className={styles.quickChip}
                disabled={isTyping}
                onClick={() => handleSendText(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      <form className={styles.inputArea} onSubmit={handleFormSubmit}>
        <input
          ref={inputRef}
          type="text"
          className={styles.msgInput}
          placeholder="Tulis pesan atau pilih tombol di atas..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
          disabled={isTyping}
        />
        <button
          type="submit"
          className={styles.sendBtn}
          disabled={!input.trim() || isTyping}
          aria-label="Kirim Pesan"
        >
          <Send size={18} />
        </button>
      </form>

      {showEndModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowEndModal(false)}
        >
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalIcon}>
              <CheckCircle size={32} />
            </div>
            <h3>Akhiri Konsultasi?</h3>
            <p>
              Apakah Anda yakin ingin mengakhiri sesi percakapan dengan{" "}
              <strong>{doctor.name}</strong>? Konsultasi ini akan dipindahkan
              ke tab <strong>Selesai</strong>.
            </p>
            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => setShowEndModal(false)}
              >
                Batal
              </button>
              <button
                type="button"
                className={styles.confirmEndBtn}
                onClick={handleEndConsultation}
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
