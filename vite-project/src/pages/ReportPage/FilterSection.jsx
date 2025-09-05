import React from "react";
import styles from "./FilterSection.module.css";
import refreshIconUrl from "../../assets/redirect.svg";
import CustomDropdown from "../../components/CustomDropdown";

const TAGS = ["일자리", "주거", "교육", "복지문화", "참여권리"];

const REGION_OPTIONS = [
  { value: "전체", label: "전체지역" },
  { value: "서울특별시", label: "서울특별시" },
  { value: "경기도", label: "경기도" },
  { value: "인천광역시", label: "인천광역시" },
  { value: "경상남도", label: "경상남도" },
  { value: "경상북도", label: "경상북도" },
  { value: "전라남도", label: "전라남도" },
  { value: "충청남도", label: "충청남도" },
  //TODO : api 따라 지역 더 추가
];

function FilterSection({
  activeTags,
  currentRegion,
  onTagClick,
  onRegionChange,
  onReset,
}) {
  return (
    <div className={styles.policyOptionBar}>
      <div className={styles.tag}>
        <button
          className={`${styles.tagButton} ${
            activeTags.length === 0 ? styles.active : ""
          }`}
          onClick={() => onTagClick("전체")} // 전체 클릭 시 모든 태그 필터 해제
          disabled
        >
          전체
        </button>
        {TAGS.map((tag) => (
          <button
            key={tag}
            className={`${styles.tagButton} ${
              activeTags.includes(tag) ? styles.active : ""
            }`}
            onClick={() => onTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className={styles.selection}>
        <CustomDropdown
          options={REGION_OPTIONS}
          currentRegion={currentRegion}
          onRegionChange={onRegionChange}
        />
        <button
          className={styles.resetButton}
          aria-label="필터 초기화"
          onClick={onReset}
        >
          <img src={refreshIconUrl} alt="필터 초기화" />
        </button>
      </div>
    </div>
  );
}

export default FilterSection;
