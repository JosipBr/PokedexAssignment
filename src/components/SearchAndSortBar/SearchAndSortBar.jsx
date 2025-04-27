import { useState } from "react";
import styles from "./SearchAndSortBar.module.css";

export default function SearchAndSortBar({ onSearch, onSortChange }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          🔍
        </button>
      </div>

      <div className={styles.sortSection}>
        <label className={styles.sortLabel}>Sort By</label>
        <select
          className={styles.sortDropdown}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="number-asc">Lowest Number (First)</option>
          <option value="number-desc">Highest Number (First)</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </select>
      </div>
    </div>
  );
}
