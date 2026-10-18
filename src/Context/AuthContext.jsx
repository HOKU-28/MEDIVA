
import {
    createContext,
    useContext,
    useState,
} from "react";

const AuthContext = createContext(null);

const USERS_KEY = "mediva_demo_users";
const SESSION_KEY = "mediva_demo_session";

// Akun demo untuk development saja.
// Jangan menggunakan password atau penyimpanan ini di production.
const demoUsers = [
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
        // Abaikan data demo yang rusak.
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

        const account = [
            ...demoUsers,
            ...registeredUsers,
        ].find(
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

        // Simpan hanya informasi sesi, bukan password.
        const session = {
            id: account.id,
            name: account.name,
            email: account.email,
            role: account.role,
        };

        localStorage.setItem(
            SESSION_KEY,
            JSON.stringify(session)
        );

        setUser(session);

        return session;
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
