import React, { useState, useEffect, useCallback } from "react";
import styles from "./PolicyPage.module.css";
import SearchBar from "../../components/SearchBar";
import FilterSection from "../PolicyPage/FilterSection";
import PolicyList from "../PolicyPage/PolicyList";
import axiosInstance from "../../api/axiosInstance";
import qs from "qs";

const INITIAL_FILTERS = {
  plcyNm: "",
  categories: [],
  regions: [],
  sort: "최신순",
};

function PolicyPage() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [policies, setPolicies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageSize = 50;

  useEffect(() => {
    const fetchPolicies = async () => {
      setLoading(true);
      setError(null);

      try {
        let response;

        if (filters.sort === "좋아요순") {
          const params = {
            pageNum: currentPage,
            pageSize: pageSize,
          };
          response = await axiosInstance.get("/youth/policies/likes", {
            params,
          });
        } else {
          const params = {
            plcyNm: filters.plcyNm,
            categories: filters.categories,
            regions: filters.regions,
            pageNum: currentPage,
            pageSize: pageSize,
          };

          response = await axiosInstance.get("/youth/policies/search", {
            params,
            paramsSerializer: (params) => {
              // qs.stringify를 사용하여 배열을 'key=value1&key=value2' 형식으로 변환
              return qs.stringify(params, { arrayFormat: "repeat" });
            },
          });
        }

        if (response.data && response.data.isSuccess && response.data.result) {
          setPolicies(response.data.result.policies);
        } else {
          throw new Error(
            response.data.message || "데이터를 불러오는 데 실패했습니다."
          );
        }
      } catch (e) {
        if (e.response && e.response.data?.statusCode === "POLICY_4001") {
          setError(new Error("존재하지 않는 정책입니다."));
          setPolicies([]);
          setTotalCount(0);
        } else {
          setError(new Error("데이터를 불러오는 중 오류가 발생했습니다."));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [filters, currentPage]);

  // 모든 핸들러 함수를 useCallback으로 감싸서 불필요한 재생성을 방지
  const handleSearchChange = useCallback((searchTerm) => {
    setFilters((prev) => ({ ...prev, plcyNm: searchTerm }));
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setFilters((prev) => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories: newCategories };
    });
    setCurrentPage(1);
  }, []);

  const handleRegionChange = useCallback((regionName) => {
    setFilters((prev) => ({
      ...prev,
      regions: regionName === "전체지역" ? [] : [regionName],
    }));
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((sort) => {
    setFilters((prev) => ({ ...prev, sort }));
    setCurrentPage(1);
  }, []);

  const handleReset = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  }, []);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1); //total 몰라서 그냥 실행
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.policyPage}>
      <div className={styles.policyCard}>
        <div className={styles.policyDisc}>
          <p className={styles.title}>정책 모아보기</p>
          <p className={styles.subTitle}>
            청년을 위한 다양한 정책을 한눈에 확인하세요
          </p>
        </div>

        <div className={styles.policySearch}>
          <SearchBar onSearch={handleSearchChange} />
        </div>

        <FilterSection
          activeTags={filters.categories}
          currentRegion={filters.regions[0] || "전체"}
          onTagClick={handleCategoryChange}
          onRegionChange={handleRegionChange}
          onReset={handleReset}
        />
      </div>

      {loading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <PolicyList
          policies={policies}
          activeSort={filters.sort}
          onSortChange={handleSortChange}
        />
      )}

      <div className={styles.pagenation}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          {"<"}
        </button>
        <button onClick={handleNextPage}>{">"}</button>
      </div>
    </div>
  );
}

export default PolicyPage;
