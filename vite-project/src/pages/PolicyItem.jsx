import React, { useState, useEffect } from "react";
import styles from "./PolicyItem.module.css";
import locationIconUrl from "../assets/location.svg";
import heartIconUrl from "../assets/heart.svg";
import fullHeartIconUrl from "../assets/fullheart.svg";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function PolicyItem({ policy }) {
  if (!policy) {
    return null;
  }
  const [likeCount, setLikeCount] = useState(policy.likeCount || 0);
  const [isLiked, setIsLiked] = useState(false);

  const getStatusClassName = (status) => {
    if (status === "완료") return styles.completed;
    if (status === "진행중") return styles.inProgress;
    if (status === "진행전") return styles.beforeStart;
    return "";
  };

  const handleLikeToggle = async (e, plcyNo) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await axiosInstance.post(`/youth/policies/${plcyNo}/like`);

      const response = await axiosInstance.get(
        `/youth/policies/${plcyNo}/likes`
      );

      if (response.data && response.data.isSuccess) {
        const newLikeCount = response.data.result;

        setLikeCount(newLikeCount);
        setIsLiked(!isLiked);

        console.log(`[${plcyNo}] 좋아요 :`, newLikeCount);
      }
    } catch (err) {
      console.error("좋아요 처리 실패:", err.response);
      alert(err.response?.data?.message || "좋아요 처리에 실패했습니다.");
    }
  };

  return (
    <Link
      to={`/policies/${encodeURIComponent(policy.plcyNm)}`}
      state={{ likes: likeCount, status: policy.status }}
      className={styles.itemContainer}
    >
      <div className={styles.policyInfo}>
        <div className={styles.title}>{policy.plcyNm}</div>
        <div className={styles.location}>
          <img src={locationIconUrl} alt="지역" className={styles.icon} />
          <span>{policy.regionNames?.join(", ") || "전체"}</span>
        </div>
      </div>

      <div className={styles.policyDetails}>
        <div
          className={`${styles.statusBadge} ${getStatusClassName(
            policy.status
          )}`}
        >
          {policy.status}
        </div>
        <div className={styles.likes}>
          <button onClick={(e) => handleLikeToggle(e, policy.plcyNo)}>
            <img
              src={likeCount ? fullHeartIconUrl : heartIconUrl}
              alt="좋아요"
              className={`${styles.icon} ${likeCount > 0 ? styles.liked : ""}`}
            />
          </button>
          <span
            className={`${styles.icon} ${likeCount > 0 ? styles.liked : ""}`}
          >
            {likeCount}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default PolicyItem;
