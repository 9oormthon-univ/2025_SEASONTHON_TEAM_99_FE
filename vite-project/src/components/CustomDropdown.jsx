import React, { useState, useEffect, useRef } from 'react';
import styles from './CustomDropdown.module.css';


const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M10 16.6667C12.5 14 15 11.6122 15 8.66671C15 5.72119 12.7614 3.33337 10 3.33337C7.23858 3.33337 5 5.72119 5 8.66671C5 11.6122 7.5 14 10 16.6667Z" stroke="#111111" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  <circle cx="10.0002" cy="8.33329" r="1.66667" fill="#111111"/>
</svg>
);

const ArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
  <path d="M11.3332 1.33329L5.99984 6.66663L0.666504 1.33329" stroke="#111111" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
);

const ArrowUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M2.66683 10.6667L8.00016 5.33337L13.3335 10.6667" stroke="#111111" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
);

function CustomDropdown({ options, currentRegion, onRegionChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleOptionClick = (optionValue) => {
        onRegionChange(optionValue); // 부모 컴포넌트로 선택된 값 전달
        setIsOpen(false); // 드롭다운 닫기
    };

    // 드롭다운 외부를 클릭했을 때 닫히도록 하는 로직
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const selectedLabel = options.find(option => option.value === currentRegion)?.label || '전체지역';

    return (
        <div className={styles.dropdownContainer} ref={dropdownRef}>
            <button className={`${styles.dropdownButton} ${isOpen ? styles.open : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <LocationIcon />
                <span>{selectedLabel}</span>
                {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </button>
            {isOpen && (
                <ul className={styles.dropdownList}>
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={styles.dropdownItem}
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CustomDropdown;

