// components/SearchBar.js
import React from "react";
import styles from "../styles/SearchBar.module.css";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder="Search tasks by title or description"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchBar}
      />
    </div>
  );
};

export default SearchBar;
