import React from "react";
import styles from "./PolicyList.module.css";
import PolicyItem from "../PolicyItem";

const CalIcon = ({ isActive }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M16.6668 5.83325H3.3335V16.6666H16.6668V5.83325Z"
      stroke={isActive ? "#FFFFFF" : "#505050"}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.6668 5.83325H3.3335V9.99992H16.6668V5.83325Z"
      stroke={isActive ? "#FFFFFF" : "#505050"}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.8335 3.33325V5.83325"
      stroke={isActive ? "#FFFFFF" : "#505050"}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.1665 3.33325V5.83325"
      stroke={isActive ? "#FFFFFF" : "#505050"}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HeartIcon = ({ isActive }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M10 16.6667L3.71974 10.806C2.09342 9.28753 2.09342 6.82411 3.71974 5.30562C5.34605 3.78712 7.98684 3.78712 9.61316 5.30562L10 5.66594L10.3868 5.30562C12.0132 3.78712 14.6539 3.78712 16.2803 5.30562C17.9066 6.82411 17.9066 9.28753 16.2803 10.806L10 16.6667Z"
      stroke={isActive ? "#FFFFFF" : "#505050"}
      strokeWidth="1.25"
      strokeMiterlimit="10"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

function PolicyList({ policies, activeSort, onSortChange }) {
  return (
    <div className={styles.policyList}>
      <div className={styles.listDisc}>
        <p>전체정책 ({policies.length})</p>
        {/* TODO : 정책 개수 색깔 다른 스타일 */}
        <div className={styles.sortItem}>
          <button
            className={activeSort === "최신순" ? styles.active : ""}
            onClick={() => onSortChange("최신순")}
          >
            <CalIcon isActive={activeSort === "최신순"} />
            최신순
          </button>
          <span>
            {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2"
                height="2"
                viewBox="0 0 2 2"
                fill="none"
              >
                <path
                  d="M1.12497 1.88184C0.64645 1.88184 0.236294 1.48535 0.249966 0.993164C0.236294 0.514648 0.64645 0.118164 1.12497 0.118164C1.60348 0.118164 1.99997 0.514648 1.99997 0.993164C1.99997 1.48535 1.60348 1.88184 1.12497 1.88184Z"
                  fill="#999999"
                />
              </svg>
            }
          </span>
          <button
            className={activeSort === "좋아요순" ? styles.active : ""}
            onClick={() => onSortChange("좋아요순")}
          >
            <HeartIcon isActive={activeSort === "좋아요순"} />
            좋아요순
          </button>
        </div>
      </div>
      <div className={styles.policyItemContainer}>
        {policies.length > 0 ? (
          policies.map((policy) => (
            <PolicyItem key={policy.id} policy={policy} />
          ))
        ) : (
          <p className={styles.noResults}>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default PolicyList;
