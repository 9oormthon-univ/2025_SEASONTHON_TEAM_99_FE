import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CommunityPage.module.css";
import PostItem from "./PostItem";
import plusIconUrl from "../../assets/plus.svg";
import CustomDropdown from "../../components/CustomDropdown";
import refreshIconUrl from "../../assets/redirect.svg";
import axiosInstance from "../../api/axiosInstance";

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
    />
    <path
      d="M16.6668 5.83325H3.3335V9.99992H16.6668V5.83325Z"
      stroke={isActive ? "#FFFFFF" : "#505050"}
      strokeWidth="1.25"
    />
    <path
      d="M5.8335 3.33325V5.83325"
      stroke={isActive ? "#FFFFFF" : "#505050"}
      strokeWidth="1.25"
    />
    <path
      d="M14.1665 3.33325V5.83325"
      stroke={isActive ? "#FFFFFF" : "#505050"}
      strokeWidth="1.25"
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
      fill="none"
    />
  </svg>
);

const REGION_OPTIONS = [
  { value: 0, label: "전체지역" },
  { value: 1, label: "서울특별시" },
  { value: 2, label: "부산광역시" },
  { value: 3, label: "대구광역시" },
  { value: 4, label: "인천광역시" },
  { value: 5, label: "광주광역시" },
  { value: 6, label: "대전광역시" },
  { value: 7, label: "울산광역시" },
  { value: 8, label: "세종특별자치시" },
  { value: 9, label: "경기도" },
  { value: 10, label: "강원도" },
  { value: 11, label: "충청북도" },
  { value: 12, label: "충청남도" },
  { value: 13, label: "전라북도" },
  { value: 14, label: "전라남도" },
  { value: 15, label: "경상북도" },
  { value: 16, label: "경상남도" },
  { value: 17, label: "제주특별자치도" },
];

const INITIAL_FILTERS = { region: 0, sort: "최신순" };

function CommunityPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        let response;
        const params = {
          page: currentPage,
        };

        if (filters.sort === "좋아요순") {
          response = await axiosInstance.get("/posts/like-ranking", { params });
        } else {
          if (filters.region === 0) {
            response = await axiosInstance.get("/posts/list", { params });
          } else {
            response = await axiosInstance.get(
              `/posts/region/${filters.region}`,
              { params }
            );
          }
        }

        if (response.data && response.data.isSuccess) {
          setPosts(response.data.result);
        } else {
          throw new Error(
            response.data.message || "데이터를 불러오는 데 실패했습니다."
          );
        }
      } catch (err) {
        setError(err);
        console.error("게시글 목록 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [filters, currentPage]);

  const handleNewPost = () => {
    navigate("/community/new");
  };

  const handleRegionChange = (regionValue) => {
    setFilters((prev) => ({ ...prev, region: parseInt(regionValue, 10) }));
    setCurrentPage(1);
  };

  const handleSortChange = (sortValue) => {
    setFilters((prev) => ({ ...prev, sort: sortValue }));
  };

  const handleReset = () => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  };

  if (loading)
    return (
      <div className={styles.container}>
        <p>로딩 중...</p>
      </div>
    );
  if (error)
    return (
      <div className={styles.container}>
        <p>{error.message}</p>
      </div>
    );

  return (
    <div className={styles.policyPage}>
      <div className={styles.policyCard}>
        <div className={styles.policyDisc}>
          <p className={styles.title}>커뮤니티</p>
          <p className={styles.subTitle}>생생한 경험과 정보를 공유해보세요.</p>
        </div>

        <div className={styles.headerActions}>
          <button onClick={handleNewPost} className={styles.postButton}>
            새글 작성 <img src={plusIconUrl} alt="새글" />
          </button>
        </div>

        <div className={styles.policyOptionBar}>
          <div className={styles.selection}>
            <div className={styles.dropdownContainer}>
              <CustomDropdown
                options={REGION_OPTIONS}
                currentRegion={filters.region}
                onRegionChange={handleRegionChange}
              />
            </div>
            <button
              className={styles.resetButton}
              aria-label="필터 초기화"
              onClick={handleReset}
            >
              <img src={refreshIconUrl} alt="필터 초기화" />
            </button>
          </div>
          <div className={styles.sortItem}>
            <button
              className={`${styles.sortButton} ${
                filters.sort === "최신순" ? styles.active : ""
              }`}
              onClick={() => handleSortChange("최신순")}
            >
              <CalIcon isActive={filters.sort === "최신순"} />
              최신순
            </button>
            <button
              className={`${styles.sortButton} ${
                filters.sort === "좋아요순" ? styles.active : ""
              }`}
              onClick={() => handleSortChange("좋아요순")}
            >
              <HeartIcon isActive={filters.sort === "좋아요순"} />
              좋아요순
            </button>
          </div>
        </div>

        <div className={styles.postListContainer}>
          {posts.length > 0 ? (
            posts.map((post) => <PostItem key={post.postId} post={post} />)
          ) : (
            <p className={styles.noPosts}>선택한 지역에 게시글이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
