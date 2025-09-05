import React, { useState, useEffect } from "react";
import styles from "./PostItem.module.css";
import locationIconUrl from "../../assets/location.svg";
import heartIconUrl from "../../assets/fullheart.svg";
import fullHeartIconUrl from "../../assets/fullheart.svg";

import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

function PostItem({ post }) {
  if (!post) {
    return null;
  }

  const formattedDate = post.createdAt.split("T")[0];

  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeToggle = async (e, postId) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await axiosInstance.post(`/posts/${postId}/like`);

      const response = await axiosInstance.get(`/posts/${postId}/like-count`);

      if (response.data && response.data.isSuccess) {
        const newLikeCount = response.data.result;
        setLikeCount(newLikeCount);
        setIsLiked(!isLiked);
        console.log(`[${postId}] 좋아요 수 업데이트 성공:`, newLikeCount);
      }
    } catch (err) {
      console.error("좋아요 처리 실패:", err.response);
      alert(
        err.response?.data?.message ||
          "좋아요 처리에 실패했습니다. 로그인이 필요할 수 있습니다."
      );
    }
  };

  return (
    <Link
      to={`/community/${post.postId}`}
      state={{
        likes: post.likeCount,
        regionName: post.regionName,
      }}
      className={styles.itemContainer}
    >
      <div className={styles.policyInfo}>
        <div className={styles.title}>{post.title}</div>
        <div className={styles.location}>
          <img src={locationIconUrl} alt="지역" className={styles.icon} />
          <span>{post.regionName}</span>
        </div>
      </div>
      <div className={styles.policyDetails}>
        <div className={styles.likes}>
          <button onClick={(e) => handleLikeToggle(e, post.postId)}>
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
        <div className={styles.dates}>{formattedDate}</div>
      </div>
    </Link>
  );
}

export default PostItem;
