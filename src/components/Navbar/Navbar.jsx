import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import pokedexLogo from "../../assets/images/pokedex-logo.png";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link to="/">
          <img src={pokedexLogo} alt="Pokédex Logo" className={styles.logo} />
        </Link>
      </div>
      <div className={styles.links}>
        <Link
          to="/"
          className={`${styles.link} ${
            location.pathname === "/" ? styles.active : ""
          }`}
        >
          Pokédex
        </Link>
        <Link
          to="/about"
          className={`${styles.link} ${
            location.pathname === "/about" ? styles.active : ""
          }`}
        >
          About
        </Link>
      </div>
    </nav>
  );
}
