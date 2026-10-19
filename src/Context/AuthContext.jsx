import {
    createContext,
    useContext,
    useState,
} from "react";

const AuthContext = createContext(null);

const USERS_KEY = "mediva_demo_users";
const SESSION_KEY = "mediva_demo_session";

const demoUsers = [
    {
        id: "demo-customer",
        name: "Andi Pratama",
        email: "andi.pratama@mediva.test",
        password: "Customer123!",
        role: "customer",
        status: "Aktif",
        phone: "0812-3456-7890",
        address: "Jl. Merdeka No. 12, Jakarta Selatan",
        dob: "1995-08-15",
        bloodType: "O+",
        totalConsultations: 3,
    },
    {
        id: "demo-admin",
        name: "Admin MEDIVA",
        email: "admin@mediva.test",
        password: "Admin123!",
        role: "admin",
        status: "Aktif",
    },
    {
        id: "demo-doctor",
        name: "Dr. Sarah Wijaya",
        email: "doctor@mediva.test",
        password: "Doctor123!",
        role: "doctor",
        status: "Aktif",
    },
];

function readUsers() {
    try {
        const saved = localStorage.getItem(USERS_KEY);

        if (saved) {
            const parsed = JSON.parse(saved);

            if (Array.isArray(parsed)) {
                return parsed;
            }
        }
    } catch {
    }

    return [];
}

function readSession() {
    try {
        const saved = localStorage.getItem(SESSION_KEY);
        return saved ? JSON.parse(saved) : null;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [registeredUsers, setRegisteredUsers] = useState(readUsers);
    const [user, setUser] = useState(readSession);

    function register({ name, email, password }) {
        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();

        if (!cleanName || !cleanEmail || !password) {
            throw new Error("Semua kolom wajib diisi.");
        }

        const allUsers = [...demoUsers, ...registeredUsers];

        const emailExists = allUsers.some(
            (item) => item.email.toLowerCase() === cleanEmail
        );

        if (emailExists) {
            throw new Error("Email sudah terdaftar.");
        }

        const newUser = {
            id: `customer-${Date.now()}`,
            name: cleanName,
            email: cleanEmail,
            password,
            role: "customer",
            status: "Aktif",
        };

        const updatedUsers = [...registeredUsers, newUser];

        localStorage.setItem(
            USERS_KEY,
            JSON.stringify(updatedUsers)
        );

        setRegisteredUsers(updatedUsers);

        return true;
    }

    function login({ email, password }) {
        const cleanEmail = email.trim().toLowerCase();

        const allAccounts = [
            ...registeredUsers,
            ...demoUsers.filter(
                (d) => !registeredUsers.some((r) => r.id === d.id)
            ),
        ];

        const account = allAccounts.find(
            (item) =>
                item.email.toLowerCase() === cleanEmail &&
                item.password === password
        );

        if (!account) {
            throw new Error("Email atau password tidak sesuai.");
        }

        if (account.status !== "Aktif") {
            throw new Error("Akun ini sedang dinonaktifkan.");
        }

        const session = {
            id: account.id,
            name: account.name,
            email: account.email,
            role: account.role,
            phone: account.phone || "",
            dob: account.dob || "",
            address: account.address || "",
            bloodType: account.bloodType || "",
            totalConsultations: account.totalConsultations ?? 0,
        };

        localStorage.setItem(
            SESSION_KEY,
            JSON.stringify(session)
        );

        setUser(session);

        return session;
    }

    function updateProfile({ name, email, phone, dob, address }) {
        if (!user) {
            throw new Error("Tidak ada sesi pengguna yang aktif.");
        }

        const cleanName = (name || "").trim();
        const cleanEmail = (email || "").trim().toLowerCase();
        const cleanPhone = (phone || "").trim();
        const cleanDob = (dob || "").trim();
        const cleanAddress = (address || "").trim();

        if (!cleanName) {
            throw new Error("Nama lengkap wajib diisi.");
        }

        if (!cleanEmail) {
            throw new Error("Email wajib diisi.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanEmail)) {
            throw new Error("Format email tidak valid.");
        }

        const allUsers = [...demoUsers, ...registeredUsers];
        const emailExists = allUsers.some(
            (item) =>
                item.id !== user.id &&
                item.email.toLowerCase() === cleanEmail
        );

        if (emailExists) {
            throw new Error("Email sudah terdaftar pada akun lain.");
        }

        if (cleanDob) {
            const birthDate = new Date(`${cleanDob}T00:00:00`);
            const today = new Date();
            today.setHours(23, 59, 59, 999);
            if (birthDate > today) {
                throw new Error("Tanggal lahir tidak boleh di masa depan.");
            }
        }

        let foundInRegistered = false;
        const updatedUsers = registeredUsers.map((item) => {
            if (item.id === user.id) {
                foundInRegistered = true;
                return {
                    ...item,
                    name: cleanName,
                    email: cleanEmail,
                    phone: cleanPhone,
                    dob: cleanDob,
                    address: cleanAddress,
                };
            }
            return item;
        });

        if (foundInRegistered) {
            localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
            setRegisteredUsers(updatedUsers);
        } else {
            const demoAccount = demoUsers.find((item) => item.id === user.id);
            if (demoAccount) {
                const updatedDemoUser = {
                    ...demoAccount,
                    name: cleanName,
                    email: cleanEmail,
                    phone: cleanPhone,
                    dob: cleanDob,
                    address: cleanAddress,
                };
                const newRegisteredUsers = [...registeredUsers, updatedDemoUser];
                localStorage.setItem(
                    USERS_KEY,
                    JSON.stringify(newRegisteredUsers)
                );
                setRegisteredUsers(newRegisteredUsers);
            }
        }

        const updatedSession = {
            ...user,
            name: cleanName,
            email: cleanEmail,
            phone: cleanPhone,
            dob: cleanDob,
            address: cleanAddress,
        };

        localStorage.setItem(SESSION_KEY, JSON.stringify(updatedSession));
        setUser(updatedSession);

        return updatedSession;
    }

    function changePassword({ currentPassword, newPassword, confirmPassword }) {
        if (!user) {
            throw new Error("Tidak ada sesi pengguna yang aktif.");
        }

        if (!currentPassword) {
            throw new Error("Password saat ini wajib diisi.");
        }

        if (!newPassword) {
            throw new Error("Password baru wajib diisi.");
        }

        if (newPassword.length < 8) {
            throw new Error("Password baru minimal 8 karakter.");
        }

        if (newPassword === currentPassword) {
            throw new Error(
                "Password baru tidak boleh sama dengan password saat ini."
            );
        }

        if (confirmPassword !== undefined && newPassword !== confirmPassword) {
            throw new Error("Konfirmasi password tidak cocok.");
        }

        const allUsers = [...demoUsers, ...registeredUsers];
        const account = allUsers.find((item) => item.id === user.id);

        if (!account) {
            throw new Error("Akun pengguna tidak ditemukan.");
        }

        if (account.password !== currentPassword) {
            throw new Error("Password saat ini tidak sesuai.");
        }

        let foundInRegistered = false;
        const updatedUsers = registeredUsers.map((item) => {
            if (item.id === user.id) {
                foundInRegistered = true;
                return {
                    ...item,
                    password: newPassword,
                };
            }
            return item;
        });

        if (foundInRegistered) {
            localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
            setRegisteredUsers(updatedUsers);
        } else {
            const demoAccount = demoUsers.find((item) => item.id === user.id);
            if (demoAccount) {
                const updatedDemoUser = {
                    ...demoAccount,
                    password: newPassword,
                };
                const newRegisteredUsers = [...registeredUsers, updatedDemoUser];
                localStorage.setItem(
                    USERS_KEY,
                    JSON.stringify(newRegisteredUsers)
                );
                setRegisteredUsers(newRegisteredUsers);
            }
        }

        return true;
    }

    function logout() {
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                register,
                login,
                logout,
                updateProfile,
                changePassword,
                isAuthenticated: Boolean(user),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth harus digunakan di dalam AuthProvider."
        );
    }

    return context;
}
