import React, { useState } from 'react';
import styles from './SearchBar.module.css';

import searchIconUrl from '../assets/search.svg?react';

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    onSearch(inputValue); 
  };

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <img 
        src={searchIconUrl} 
        alt="검색" 
        className={styles.icon} 
      />
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

