import { useMemo, useState } from "react";
import {
    Eye,
    Pencil,
    Trash2,
    X,
    CalendarDays,
    Clock,
    UserRound,
    Stethoscope,
    ClipboardList,
    AlertCircle,
    Plus,
    Search,
    Phone,
    HeartPulse,
    FileText,
} from "lucide-react";

import {
    initialDoctor,
    STATUS_LABEL,
    formatDate,
} from "../../data/doctorData";

import { useAppointments } from "../../Context/AppointmentContext";
import styles from "./Admin.module.css";

const statusOptions = [
    "menunggu",
    "dikonfirmasi",
    "selesai",
    "dibatalkan",
];

const emptyForm = {
    patient: "",
    doctor: initialDoctor.name,
    service: initialDoctor.specialty,
    date: "",
    time: "",
    complaint: "",
    status: "menunggu",
};

function AdminDashboard() {
    const {
        appointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,
    } = useAppointments();

    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("semua");
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState(emptyForm);
    const [errorMessage, setErrorMessage] = useState("");

    const today = new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const filteredAppointments = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        return appointments
            .filter((appointment) => {
                const patientName =
                    appointment.patient?.name?.toLowerCase() || "";

                const doctorName =
                    appointment.doctor?.toLowerCase() || initialDoctor.name.toLowerCase();

                const complaint =
                    appointment.complaint?.toLowerCase() || "";

                const matchesSearch =
                    patientName.includes(keyword) ||
                    doctorName.includes(keyword) ||
                    complaint.includes(keyword);

                const matchesStatus =
                    filterStatus === "semua" ||
                    appointment.status === filterStatus;

                return matchesSearch && matchesStatus;
            })
            .sort((a, b) =>
                `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)
            );
    }, [appointments, search, filterStatus]);

    const stats = [
        {
            label: "Total Dokter",
            value: 1,
            description: "Dokter terdaftar",
            icon: Stethoscope,
        },
        {
            label: "Total Pasien",
            value: new Set(
                appointments
                    .map((appointment) => appointment.patient?.id)
                    .filter((id) => id != null)
            ).size,
            description: "Pasien unik",
            icon: UserRound,
        },
        {
            label: "Total Appointment",
            value: appointments.length,
            description: "Semua janji temu",
            icon: ClipboardList,
        },
        {
            label: "Menunggu",
            value: appointments.filter(
                (appointment) => appointment.status === "menunggu"
            ).length,
            description: "Perlu ditindaklanjuti",
            icon: Clock,
        },
    ];

    function openCreate() {
        setFormData({
            ...emptyForm,
            date: getTodayISO(),
        });
        setEditingAppointment(null);
        setSelectedAppointment(null);
        setIsCreating(true);
        setErrorMessage("");
    }

    function openEdit(appointment) {
        setEditingAppointment(appointment);
        setFormData({
            patient: appointment.patient?.name || "",
            doctor: appointment.doctor || initialDoctor.name,
            service: appointment.service || initialDoctor.specialty,
            date: appointment.date || "",
            time: appointment.time || "",
            complaint: appointment.complaint || "",
            status: appointment.status || "menunggu",
        });
        setSelectedAppointment(null);
        setIsCreating(false);
        setErrorMessage("");
    }

    function closeForm() {
        setIsCreating(false);
        setEditingAppointment(null);
        setFormData(emptyForm);
        setErrorMessage("");
    }

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleSave(event) {
        event.preventDefault();

        if (
            !formData.patient.trim() ||
            !formData.doctor.trim() ||
            !formData.service.trim() ||
            !formData.date ||
            !formData.time ||
            !formData.status
        ) {
            setErrorMessage("Mohon lengkapi semua data wajib.");
            return;
        }

        if (isCreating) {
            addAppointment({
                date: formData.date,
                time: formData.time,
                status: formData.status,
                complaint: formData.complaint.trim(),
                diagnosis: "",
                notes: "",
                prescription: "",
                doctor: formData.doctor.trim(),
                service: formData.service.trim(),
                patient: {
                    id: Date.now(),
                    name: formData.patient.trim(),
                    age: null,
                    gender: "",
                    phone: "",
                    bloodType: "",
                    allergy: "",
                },
            });
        } else if (editingAppointment) {
            updateAppointment(editingAppointment.id, {
                date: formData.date,
                time: formData.time,
                status: formData.status,
                complaint: formData.complaint.trim(),
                doctor: formData.doctor.trim(),
                service: formData.service.trim(),
                patient: {
                    ...editingAppointment.patient,
                    name: formData.patient.trim(),
                },
            });
        }

        closeForm();
    }

    function handleDelete(appointment) {
        const confirmed = window.confirm(
            `Yakin ingin menghapus appointment ${appointment.patient?.name || "ini"}?`
        );

        if (!confirmed) return;

        deleteAppointment(appointment.id);

        setSelectedAppointment(null);
        setEditingAppointment(null);
    }

    function getTodayISO() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    function showDetail(appointment) {
        setSelectedAppointment(appointment);
    }

    return (
        <div className={styles.dashboard}>
            <section className={styles.welcome}>
                <div>
                    <span className={styles.eyebrow}>
                        MEDIVA ADMINISTRATION
                    </span>
                    <h2>Selamat datang, Rinaldy!</h2>
                    <p>
                        Kelola appointment dan pantau aktivitas klinik
                        melalui dashboard admin.
                    </p>
                </div>

                <div className={styles.today}>
                    <CalendarDays size={18} />
                    <span>{today}</span>
                </div>
            </section>

            <section className={styles.summaryGrid}>
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <article
                            className={styles.summaryCard}
                            key={stat.label}
                        >
                            <div className={styles.summaryTop}>
                                <span>{stat.label}</span>
                                <div className={styles.summaryIcon}>
                                    <Icon size={21} />
                                </div>
                            </div>

                            <h3>{stat.value}</h3>
                            <p>{stat.description}</p>
                        </article>
                    );
                })}
            </section>

            <section className={styles.tableSection}>
                <div className={styles.sectionHeader}>
                    <div>
                        <h2>Kelola Appointment</h2>
                        <p>
                            Lihat dan kelola janji temu serta detail pasien.
                        </p>
                    </div>

                    <button
                        type="button"
                        className={styles.primaryButton}
                        onClick={openCreate}
                    >
                        <Plus size={17} />
                        Tambah Appointment
                    </button>
                </div>

                <div className={styles.toolbar}>
                    <div className={styles.searchBox}>
                        <Search size={18} />

                        <input
                            type="text"
                            placeholder="Cari pasien, dokter, atau keluhan..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </div>

                    <select
                        className={styles.filterSelect}
                        value={filterStatus}
                        onChange={(event) => setFilterStatus(event.target.value)}
                    >
                        <option value="semua">Semua status</option>

                        {statusOptions.map((status) => (
                            <option key={status} value={status}>
                                {STATUS_LABEL[status]}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Pasien</th>
                                <th>Dokter</th>
                                <th>Layanan</th>
                                <th>Tanggal</th>
                                <th>Waktu</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredAppointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>
                                        <div className={styles.patientCell}>
                                            <div className={styles.patientAvatar}>
                                                {(appointment.patient?.name || "?")
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>

                                            <strong>
                                                {appointment.patient?.name || "-"}
                                            </strong>
                                        </div>
                                    </td>

                                    <td>
                                        {appointment.doctor || initialDoctor.name}
                                    </td>

                                    <td>
                                        {appointment.service || initialDoctor.specialty}
                                    </td>

                                    <td>{formatDate(appointment.date)}</td>
                                    <td>{appointment.time || "-"}</td>

                                    <td>
                                        <span
                                            className={`${styles.statusBadge} ${styles[appointment.status] || ""}`}
                                        >
                                            {STATUS_LABEL[appointment.status] ||
                                                appointment.status}
                                        </span>
                                    </td>

                                    <td>
                                        <div className={styles.actions}>
                                            <button
                                                type="button"
                                                className={styles.viewButton}
                                                title="Lihat detail"
                                                onClick={() => showDetail(appointment)}
                                            >
                                                <Eye size={17} />
                                            </button>

                                            <button
                                                type="button"
                                                className={styles.iconButton}
                                                title="Edit appointment"
                                                onClick={() => openEdit(appointment)}
                                            >
                                                <Pencil size={17} />
                                            </button>

                                            <button
                                                type="button"
                                                className={`${styles.iconButton} ${styles.deleteButton}`}
                                                title="Hapus appointment"
                                                onClick={() => handleDelete(appointment)}
                                            >
                                                <Trash2 size={17} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredAppointments.length === 0 && (
                                <tr>
                                    <td colSpan="7" className={styles.emptyState}>
                                        Tidak ada appointment yang cocok.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {selectedAppointment && (
                <div
                    className={styles.modalOverlay}
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setSelectedAppointment(null);
                        }
                    }}
                >
                    <section
                        className={`${styles.modal} ${styles.detailModal}`}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="detail-title"
                    >
                        <div className={styles.modalHeader}>
                            <div>
                                <h2 id="detail-title">Detail Appointment</h2>
                                <p>
                                    Informasi pasien dan hasil konsultasi.
                                </p>
                            </div>

                            <button
                                type="button"
                                className={styles.closeButton}
                                onClick={() => setSelectedAppointment(null)}
                                aria-label="Tutup detail"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className={styles.detailSectionTitle}>
                            <UserRound size={18} />
                            <h3>Data Pasien</h3>
                        </div>

                        <div className={styles.detailGrid}>
                            <DetailItem
                                label="Nama Pasien"
                                value={selectedAppointment.patient?.name}
                            />
                            <DetailItem
                                label="Usia"
                                value={
                                    selectedAppointment.patient?.age != null
                                        ? `${selectedAppointment.patient.age} tahun`
                                        : "-"
                                }
                            />
                            <DetailItem
                                label="Jenis Kelamin"
                                value={selectedAppointment.patient?.gender}
                            />
                            <DetailItem
                                label="No. Telepon"
                                value={selectedAppointment.patient?.phone}
                            />
                            <DetailItem
                                label="Golongan Darah"
                                value={selectedAppointment.patient?.bloodType}
                            />
                            <DetailItem
                                label="Alergi"
                                value={selectedAppointment.patient?.allergy}
                            />
                        </div>

                        <div className={styles.detailSectionTitle}>
                            <CalendarDays size={18} />
                            <h3>Informasi Appointment</h3>
                        </div>

                        <div className={styles.detailGrid}>
                            <DetailItem
                                label="Dokter"
                                value={
                                    selectedAppointment.doctor || initialDoctor.name
                                }
                            />
                            <DetailItem
                                label="Layanan"
                                value={
                                    selectedAppointment.service ||
                                    initialDoctor.specialty
                                }
                            />
                            <DetailItem
                                label="Tanggal"
                                value={formatDate(selectedAppointment.date)}
                            />
                            <DetailItem
                                label="Waktu"
                                value={selectedAppointment.time}
                            />
                            <DetailItem
                                label="Status"
                                value={STATUS_LABEL[selectedAppointment.status]}
                            />
                        </div>

                        <div className={styles.medicalSection}>
                            <div className={styles.detailSectionTitle}>
                                <HeartPulse size={18} />
                                <h3>Keluhan Pasien</h3>
                            </div>
                            <p>
                                {selectedAppointment.complaint ||
                                    "Belum ada keluhan."}
                            </p>
                        </div>

                        <div className={styles.medicalSection}>
                            <div className={styles.detailSectionTitle}>
                                <FileText size={18} />
                                <h3>Diagnosis</h3>
                            </div>
                            <p>
                                {selectedAppointment.diagnosis ||
                                    "Belum ada diagnosis."}
                            </p>
                        </div>

                        <div className={styles.medicalSection}>
                            <div className={styles.detailSectionTitle}>
                                <FileText size={18} />
                                <h3>Catatan Dokter</h3>
                            </div>
                            <p>
                                {selectedAppointment.notes ||
                                    "Belum ada catatan dokter."}
                            </p>
                        </div>

                        <div className={styles.medicalSection}>
                            <div className={styles.detailSectionTitle}>
                                <ClipboardList size={18} />
                                <h3>Resep Obat</h3>
                            </div>
                            <p>
                                {selectedAppointment.prescription ||
                                    "Belum ada resep obat."}
                            </p>
                        </div>

                        <div className={styles.modalFooter}>
                            <button
                                type="button"
                                className={styles.secondaryButton}
                                onClick={() => setSelectedAppointment(null)}
                            >
                                Tutup
                            </button>

                            <button
                                type="button"
                                className={styles.primaryButton}
                                onClick={() => openEdit(selectedAppointment)}
                            >
                                <Pencil size={16} />
                                Edit Appointment
                            </button>
                        </div>
                    </section>
                </div>
            )}

            {(isCreating || editingAppointment) && (
                <div
                    className={styles.modalOverlay}
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            closeForm();
                        }
                    }}
                >
                    <section
                        className={styles.modal}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="form-title"
                    >
                        <div className={styles.modalHeader}>
                            <div>
                                <h2 id="form-title">
                                    {isCreating
                                        ? "Tambah Appointment"
                                        : "Edit Appointment"}
                                </h2>
                                <p>
                                    Lengkapi informasi janji temu pasien.
                                </p>
                            </div>

                            <button
                                type="button"
                                className={styles.closeButton}
                                onClick={closeForm}
                                aria-label="Tutup formulir"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave}>
                            {errorMessage && (
                                <div className={styles.errorMessage}>
                                    <AlertCircle size={18} />
                                    <span>{errorMessage}</span>
                                </div>
                            )}

                            <div className={styles.formGrid}>
                                <label className={styles.formField}>
                                    Nama Pasien *
                                    <input
                                        name="patient"
                                        value={formData.patient}
                                        onChange={handleInputChange}
                                        placeholder="Masukkan nama pasien"
                                        required
                                    />
                                </label>

                                <label className={styles.formField}>
                                    Dokter *
                                    <input
                                        name="doctor"
                                        value={formData.doctor}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>

                                <label className={styles.formField}>
                                    Layanan *
                                    <input
                                        name="service"
                                        value={formData.service}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>

                                <label className={styles.formField}>
                                    Tanggal *
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>

                                <label className={styles.formField}>
                                    Waktu *
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>

                                <label className={styles.formField}>
                                    Status *
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {STATUS_LABEL[status]}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label
                                    className={`${styles.formField} ${styles.fullWidth}`}
                                >
                                    Keluhan Pasien
                                    <textarea
                                        name="complaint"
                                        value={formData.complaint}
                                        onChange={handleInputChange}
                                        placeholder="Masukkan keluhan pasien..."
                                        rows="4"
                                    />
                                </label>
                            </div>

                            <div className={styles.modalFooter}>
                                <button
                                    type="button"
                                    className={styles.secondaryButton}
                                    onClick={closeForm}
                                >
                                    Batal
                                </button>

                                <button
                                    type="submit"
                                    className={styles.primaryButton}
                                >
                                    {isCreating
                                        ? "Tambah Appointment"
                                        : "Simpan Perubahan"}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </div>
    );
}

function DetailItem({ label, value }) {
    return (
        <div className={styles.detailItem}>
            <span>{label}</span>
            <strong>{value || "-"}</strong>
        </div>
    );
}

export default AdminDashboard;
