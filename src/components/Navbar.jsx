import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import medivaLogo from "../assets/branding/mediva-logo.png";
import styles from "./Navbar.module.css";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Cari Dokter", path: "/dokter" },
  { label: "Blogs", path: "/blogs" },
  { label: "Riwayat", path: "/riwayat" },
];

function getAccountPath(role) {
  if (role === "admin") return "/admin";
  if (role === "doctor") return "/doctor";
  return "/profil";
}

function Navbar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const accountPath = user ? getAccountPath(user.role) : "/login";
  const userInitials = user?.name
    ? user.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("")
    : "";

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo} onClick={() => setIsOpen(false)} aria-label="MEDIVA Beranda">
          <img src={medivaLogo} alt="MEDIVA" className={styles.logoImage} />
        </NavLink>

        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ""}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              {item.label}
            </NavLink>
          ))}

          <div className={styles.mobileAccount}>
            {user ? (
              <Link
                to={accountPath}
                className={styles.userPill}
                onClick={() => setIsOpen(false)}
              >
                <span className={styles.userAvatar}>
                  {user.avatar ? (
                    <img src={user.avatar} alt="" />
                  ) : (
                    userInitials
                  )}
                </span>
                <span className={styles.userName}>{user.name}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className={styles.loginButton}
                onClick={() => setIsOpen(false)}
              >
                Masuk
              </Link>
            )}
          </div>
        </nav>

        <div className={styles.desktopAccount}>
          {user ? (
            <Link to={accountPath} className={styles.userPill}>
              <span className={styles.userAvatar}>
                {user.avatar ? (
                  <img src={user.avatar} alt="" />
                ) : (
                  userInitials
                )}
              </span>
              <span className={styles.userName}>{user.name}</span>
            </Link>
          ) : (
            <Link to="/login" className={styles.loginButton}>
              Masuk
            </Link>
          )}
        </div>

        <button
          type="button"
          className={styles.menuToggle}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigasi"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
