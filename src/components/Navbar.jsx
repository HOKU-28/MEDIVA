import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Cari Dokter", path: "/dokter" },
  { label: "Riwayat", path: "/riwayat" },
  { label: "Profil", path: "/profil" },
];

function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          MEDIVA
        </NavLink>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;