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
  specialty: "Dokter Umum",
  strNumber: "STR-3174-0001-2018",
  education: "Universitas Indonesia",
  experience: "8 tahun pengalaman",
  location: "MEDIVA Clinic Jakarta",
  phone: "0812-3456-7890",
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
    patient: { id: 1, name: "Rizky Ananda", age: 27, gender: "Laki-laki", phone: "0812-1111-2222", bloodType: "O", allergy: "Tidak ada" },
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
    patient: { id: 2, name: "Dewi Lestari", age: 34, gender: "Perempuan", phone: "0813-3333-4444", bloodType: "A", allergy: "Alergi penisilin" },
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
    patient: { id: 3, name: "Bagas Prasetyo", age: 41, gender: "Laki-laki", phone: "0857-5555-6666", bloodType: "B", allergy: "Tidak ada" },
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
    patient: { id: 4, name: "Siti Rahmawati", age: 58, gender: "Perempuan", phone: "0821-7777-8888", bloodType: "AB", allergy: "Tidak ada" },
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
    patient: { id: 1, name: "Rizky Ananda", age: 27, gender: "Laki-laki", phone: "0812-1111-2222", bloodType: "O", allergy: "Tidak ada" },
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
    patient: { id: 2, name: "Dewi Lestari", age: 34, gender: "Perempuan", phone: "0813-3333-4444", bloodType: "A", allergy: "Alergi penisilin" },
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
    patient: { id: 5, name: "Hendra Gunawan", age: 46, gender: "Laki-laki", phone: "0856-9999-0000", bloodType: "O", allergy: "Tidak ada" },
  },
];
