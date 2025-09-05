import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import styles from "./CommentSection.module.css";
import heartIconUrl from "../assets/heart.svg";
import fullHeartIconUrl from "../assets/fullheart.svg";

function CommentItem({ comment, onLikeToggle, onUpdate, onDelete }) {
  const { user } = useAuth();
  const authorName = comment.writer;
  const isMyComment = user && user.nickname === authorName;
  const commentId = comment.id || comment.replyId;

  const likeCount = comment.likeCount;

  return (
    <div className={styles.commentItem}>
      <div className={styles.commentItemArea}>
        <div className={styles.commentItemInfo}>
          <span>
            {comment.writer && !comment.anonymous ? comment.writer : "익명"}
          </span>
          {comment.createdAt && (
            <span style={{ fontSize: "12px", color: "#888" }}>
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          )}
        </div>
        <div className={styles.commentItemSub}>
          <button disabled={!user} onClick={() => onLikeToggle(commentId)}>
            <img
              src={likeCount > 0 ? fullHeartIconUrl : heartIconUrl}
              alt="좋아요"
              className={`${styles.icon} ${likeCount > 0 ? styles.liked : ""}`}
            />
            <span className={`${likeCount > 0 ? styles.liked : ""}`}>
              {likeCount}
            </span>
          </button>
          {isMyComment && (
            <div>
              <button onClick={() => onUpdate(commentId, comment.content)}>
                수정
              </button>
              <button onClick={() => onDelete(commentId)}>삭제</button>
            </div>
          )}
        </div>
      </div>
      <p className={styles.commentItemContent}>{comment.content}</p>
    </div>
  );
}

function CommentsSection({ type, id, metadata }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      let response;
      if (type === "policy") {
        response = await axiosInstance.get("/youth/policies/reply-list", {
          params: { plcyNo: id },
        });
      } else if (type === "post") {
        response = await axiosInstance.get(`/posts/replies/${id}`);
      } else {
        throw new Error("유효하지 않은 댓글 타입입니다.");
      }
      if (response.data && response.data.isSuccess) {
        setComments(response.data.result || []);
      }
    } catch (err) {
      console.error("댓글 로딩 실패:", err);
      setError("댓글을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id, type]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      let url = "";
      let requestBody = {};
      let config = {};
      if (type === "policy") {
        url = "/youth/policies/create";
        requestBody = {
          content: newComment,
          plcyNo: id,
          plcyNm: metadata?.plcyNm,
        };
        config = { params: { isAnonymous } };
      } else if (type === "post") {
        url = `/posts/replies/${id}`;
        requestBody = { content: newComment };
        config = { params: { isAnonymous } };
      } else {
        throw new Error("유효하지 않은 댓글 타입입니다.");
      }
      await axiosInstance.post(url, requestBody, config);
      setNewComment("");
      setIsAnonymous(false);
      fetchComments();
    } catch (err) {
      console.error("댓글 등록 실패:", err);
      alert(err.response?.data?.message || "댓글 등록에 실패했습니다.");
    }
  };

  const handleLikeToggle = async (commentId) => {
    try {
      let toggleUrl = "";
      let getCountUrl = "";
      if (type === "policy") {
        toggleUrl = `/youth/policies/replies/${commentId}/like`;
        getCountUrl = `/youth/policies/replies/${commentId}/likes`;
      } else if (type === "post") {
        toggleUrl = `/posts/replies/${commentId}/like`;
        getCountUrl = `/posts/replies/${commentId}/like-count`;
      } else {
        throw new Error("유효하지 않은 댓글 타입입니다.");
      }
      await axiosInstance.post(toggleUrl);
      const response = await axiosInstance.get(getCountUrl);
      if (response.data && response.data.isSuccess) {
        const newLikeCount = response.data.result;
        setComments((currentComments) =>
          currentComments.map((comment) => {
            const currentCommentId = comment.id || comment.replyId;
            if (currentCommentId === commentId) {
              return { ...comment, likeCount: newLikeCount };
            }
            return comment;
          })
        );
      }
    } catch (err) {
      console.error("좋아요 처리 실패:", err.response);
    }
  };

  const handleCommentDelete = async (commentId) => {
    alert("삭제 API 연동 필요");
  };
  const handleCommentUpdate = async (commentId, currentContent) => {
    alert("수정 API 연동 필요");
  };

  return (
    <section className={styles.commentContainer}>
      <h2 className={styles.commentTitle}>댓글 ({comments.length})</h2>
      <div className={styles.commentFormArea}>
        {user ? (
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="의견을 남겨주세요."
            />
            <div className={styles.commentExtraArea}>
              <button type="submit">작성하기</button>
            </div>
          </form>
        ) : (
          <p>
            댓글을 작성하려면 <a href="/login">로그인</a>이 필요합니다.
          </p>
        )}
      </div>
      <div>
        {loading && <p>로딩 중...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading &&
          !error &&
          (comments.length > 0
            ? comments.map((comment) => (
                <CommentItem
                  key={comment.id || comment.replyId}
                  comment={comment}
                  onLikeToggle={handleLikeToggle}
                  onDelete={handleCommentDelete}
                  onUpdate={handleCommentUpdate}
                />
              ))
            : "")}
      </div>
    </section>
  );
}

export default CommentsSection;
