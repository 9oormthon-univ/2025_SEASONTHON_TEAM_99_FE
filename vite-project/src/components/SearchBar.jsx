import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";
import searchIconUrl from "../assets/search.svg";

function SearchBar({ onSearch, initialSearchTerm = "" }) {
  const [inputValue, setInputValue] = useState(initialSearchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(inputValue);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, onSearch]);

  useEffect(() => {
    setInputValue(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <img src={searchIconUrl} alt="검색" className={styles.icon} />
      <input
        type="text"
        className={styles.searchInput}
        placeholder="검색어를 입력하세요."
        value={inputValue}
        onChange={handleInputChange}
      />
    </form>
  );
}

export default SearchBar;
