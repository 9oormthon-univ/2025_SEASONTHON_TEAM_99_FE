import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import CommentsSection from "../../components/CommentSection";
import styles from "./PostDetail.module.css";
import locationIconUrl from "../../assets/location.svg?react";

function PostDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("요청하려는 postId:", postId);

        const response = await axiosInstance.get(`/posts/${postId}`);
        setPost(response.data.result);
      } catch (err) {
        setError(err);
        console.error("게시글 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error.message}</p>;
  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContent}>
        <div className={styles.policydetail}>
          <div className={styles.title}>
            <h1>{post.title}</h1>
            <div className={styles.titleMeta}>
              <div className={styles.location}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10 16.6668C12.5 14.0002 15 11.6123 15 8.66683C15 5.72131 12.7614 3.3335 10 3.3335C7.23858 3.3335 5 5.72131 5 8.66683C5 11.6123 7.5 14.0002 10 16.6668Z"
                    stroke="#F5F5F5"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <circle
                    cx="9.99992"
                    cy="8.33317"
                    r="1.66667"
                    fill="#F5F5F5"
                  />
                </svg>
                <span>{post.regionName}</span>
              </div>
              <div className={styles.date}>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.content}>{post.content}</div>
            <div>
              {/* TODO : 이미지를 조회 api에서 제공 안 하고 있음 */}
              {post.images &&
                post.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`post image ${index + 1}`}
                  />
                ))}
            </div>
          </div>
          <hr />
        </div>
        {/* 댓글 컴포넌트 */}
        <CommentsSection type="post" id={postId} />
      </div>
    </div>
  );
}

export default PostDetailPage;
