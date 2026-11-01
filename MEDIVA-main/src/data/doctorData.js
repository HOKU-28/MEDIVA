import doctorSarahWijaya from "../assets/profiles/doctor-sarah-wijaya.jpg";
import doctorAndiPratama from "../assets/profiles/doctor-andi-pratama.jpg";
import doctorMayaPutri from "../assets/profiles/doctor-maya-putri.webp";
import doctorRinaLestari from "../assets/profiles/doctor-rina-lestari.jpg";
import doctorBudiSantoso from "../assets/profiles/doctor-budi-santoso.jpg";
import doctorKevinWijaya from "../assets/profiles/doctor-kevin-wijaya.jpg";

function toISO(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export const todayISO = toISO(0);

export const todayDayIndex = (new Date().getDay() + 6) % 7;

export function formatDate(iso) {
  if (!iso) return "-";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const STATUS_LABEL = {
  menunggu: "Menunggu",
  dikonfirmasi: "Dikonfirmasi",
  selesai: "Selesai",
  dibatalkan: "Dibatalkan",
};

export const initialDoctor = {
  id: 1,
  name: "Dr. Sarah Wijaya",
  initials: "SW",
  image: doctorSarahWijaya,
  specialty: "Dokter Umum",
  strNumber: "317400012018",
  education: "Universitas Indonesia",
  experience: "8 tahun pengalaman",
  location: "MEDIVA Clinic Jakarta",
  phone: "+6281234567890",
  email: "sarah.wijaya@mediva.id",
  rating: "4.9",
  bio: "Dokter umum yang berpengalaman dalam menangani berbagai keluhan kesehatan umum dan memberikan konsultasi kesehatan.",
};

export const initialSchedule = [
  { day: "Senin", active: true, start: "09:00", end: "15:00" },
  { day: "Selasa", active: true, start: "09:00", end: "15:00" },
  { day: "Rabu", active: true, start: "09:00", end: "15:00" },
  { day: "Kamis", active: true, start: "09:00", end: "15:00" },
  { day: "Jumat", active: true, start: "09:00", end: "15:00" },
  { day: "Sabtu", active: false, start: "09:00", end: "12:00" },
  { day: "Minggu", active: false, start: "09:00", end: "12:00" },
];

export const initialLeaves = [{ id: 1, date: toISO(14), reason: "Seminar kedokteran" }];

export const initialAppointments = [
  {
    id: 101,
    date: toISO(0),
    time: "09:00",
    status: "selesai",
    complaint: "Demam dan batuk sejak 3 hari yang lalu.",
    diagnosis: "ISPA (infeksi saluran pernapasan akut)",
    notes: "Disarankan istirahat cukup dan banyak minum air putih.",
    prescription: "Paracetamol 500 mg 3x1, Ambroxol 30 mg 3x1",
    patient: { id: 1, name: "Rizky Ananda", age: 27, gender: "Laki-laki", phone: "+6281211112222", bloodType: "O", allergy: "Tidak ada" },
  },
  {
    id: 102,
    date: toISO(0),
    time: "10:00",
    status: "dikonfirmasi",
    complaint: "Sakit kepala berulang dan sulit tidur.",
    diagnosis: "",
    notes: "",
    prescription: "",
    patient: { id: 2, name: "Dewi Lestari", age: 34, gender: "Perempuan", phone: "+6281333334444", bloodType: "A", allergy: "Alergi penisilin" },
  },
  {
    id: 103,
    date: toISO(0),
    time: "13:00",
    status: "menunggu",
    complaint: "Nyeri perut bagian atas setelah makan.",
    diagnosis: "",
    notes: "",
    prescription: "",
    patient: { id: 3, name: "Bagas Prasetyo", age: 41, gender: "Laki-laki", phone: "+6285755556666", bloodType: "B", allergy: "Tidak ada" },
  },
  {
    id: 104,
    date: toISO(1),
    time: "09:00",
    status: "menunggu",
    complaint: "Kontrol tekanan darah rutin.",
    diagnosis: "",
    notes: "",
    prescription: "",
    patient: { id: 4, name: "Siti Rahmawati", age: 58, gender: "Perempuan", phone: "+6282177778888", bloodType: "AB", allergy: "Tidak ada" },
  },
  {
    id: 105,
    date: toISO(1),
    time: "11:00",
    status: "dikonfirmasi",
    complaint: "Nyeri sendi lutut saat naik tangga.",
    diagnosis: "",
    notes: "",
    prescription: "",
    patient: { id: 1, name: "Rizky Ananda", age: 27, gender: "Laki-laki", phone: "+6281211112222", bloodType: "O", allergy: "Tidak ada" },
  },
  {
    id: 106,
    date: toISO(-3),
    time: "14:00",
    status: "selesai",
    complaint: "Flu dan hidung tersumbat.",
    diagnosis: "Common cold",
    notes: "Istirahat dan konsumsi vitamin C.",
    prescription: "Vitamin C 500 mg 1x1, Loratadine 10 mg 1x1",
    patient: { id: 2, name: "Dewi Lestari", age: 34, gender: "Perempuan", phone: "+6281333334444", bloodType: "A", allergy: "Alergi penisilin" },
  },
  {
    id: 107,
    date: toISO(-5),
    time: "10:00",
    status: "dibatalkan",
    complaint: "Konsultasi hasil laboratorium.",
    diagnosis: "",
    notes: "",
    prescription: "",
    patient: { id: 5, name: "Hendra Gunawan", age: 46, gender: "Laki-laki", phone: "+6285699990000", bloodType: "O", allergy: "Tidak ada" },
  },
];

export const doctorsList = [
  {
    id: 1,
    name: "Dr. Sarah Wijaya",
    initials: "SW",
    image: doctorSarahWijaya,
    specialty: "Dokter Umum",
    rating: "4.9",
    experience: "8 tahun pengalaman",
    education: "Universitas Indonesia",
    location: "MEDIVA Clinic Jakarta",
    description:
      "Dokter umum yang berpengalaman dalam menangani berbagai keluhan kesehatan umum dan memberikan konsultasi kesehatan.",
    schedule: "Senin - Jumat, 09.00 - 15.00",
    strNumber: "317400012018",
  },
  {
    id: 2,
    name: "Dr. Andi Pratama",
    initials: "AP",
    image: doctorAndiPratama,
    specialty: "Dokter Gigi",
    rating: "4.8",
    experience: "6 tahun pengalaman",
    education: "Universitas Gadjah Mada",
    location: "MEDIVA Clinic Jakarta",
    description:
      "Dokter gigi yang fokus pada perawatan dan konsultasi kesehatan gigi untuk pasien dewasa maupun anak.",
    schedule: "Senin - Sabtu, 10.00 - 16.00",
  },
  {
    id: 3,
    name: "Dr. Maya Putri",
    initials: "MP",
    image: doctorMayaPutri,
    specialty: "Dokter Anak",
    rating: "4.9",
    experience: "10 tahun pengalaman",
    education: "Universitas Airlangga",
    location: "MEDIVA Clinic Jakarta",
    description:
      "Dokter anak yang membantu memantau kesehatan, pertumbuhan, dan perkembangan anak.",
    schedule: "Senin - Jumat, 08.00 - 14.00",
  },
  {
    id: 4,
    name: "Dr. Rina Lestari",
    initials: "RL",
    image: doctorRinaLestari,
    specialty: "Dokter Kulit",
    rating: "4.8",
    experience: "7 tahun pengalaman",
    education: "Universitas Padjadjaran",
    location: "MEDIVA Clinic Jakarta",
    description:
      "Dokter spesialis kulit yang memberikan konsultasi dan perawatan berbagai masalah kulit.",
    schedule: "Selasa - Sabtu, 10.00 - 16.00",
  },
  {
    id: 5,
    name: "Dr. Budi Santoso",
    initials: "BS",
    image: doctorBudiSantoso,
    specialty: "Dokter Mata",
    rating: "4.7",
    experience: "9 tahun pengalaman",
    education: "Universitas Diponegoro",
    location: "MEDIVA Clinic Jakarta",
    description:
      "Dokter mata yang memberikan pemeriksaan dan konsultasi mengenai kesehatan mata.",
    schedule: "Senin - Jumat, 09.00 - 15.00",
  },
  {
    id: 6,
    name: "Dr. Kevin Wijaya",
    initials: "KW",
    image: doctorKevinWijaya,
    specialty: "Dokter Umum",
    rating: "4.8",
    experience: "5 tahun pengalaman",
    education: "Universitas Brawijaya",
    location: "MEDIVA Clinic Jakarta",
    description:
      "Dokter umum yang melayani konsultasi kesehatan dan pemeriksaan kondisi kesehatan umum.",
    schedule: "Senin - Sabtu, 09.00 - 15.00",
  },
];

export const doctorSpecialties = [
  "Semua Spesialisasi",
  "Dokter Umum",
  "Dokter Gigi",
  "Dokter Anak",
  "Dokter Kulit",
  "Dokter Mata",
];

export function getDoctorById(id) {
  if (!id) return null;
  const doctor = doctorsList.find((d) => d.id === Number(id));
  return doctor ? getSavedDoctorProfile(doctor) : null;
}

export function getSavedDoctorProfile(doctor) {
  if (!doctor || doctor.id !== initialDoctor.id) return doctor;

  try {
    const saved = localStorage.getItem("mediva_doctor_profile_demo-doctor");
    return saved ? { ...doctor, ...JSON.parse(saved) } : doctor;
  } catch {
    return doctor;
  }
}
