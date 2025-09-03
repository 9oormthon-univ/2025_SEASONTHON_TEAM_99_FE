import React, { useState, useMemo } from 'react';
import styles from './PolicyPage.module.css';

import SearchBar from '../../components/SearchBar';
import FilterSection from '../PolicyPage/FilterSection';
import PolicyList from '../PolicyPage/PolicyList'

// TODO : DB 연결
import allPolicies from '../../components/mock.js';

const INITIAL_FILTERS = {
  searchTerm: '',
  tags: [],
  region: '전체',
  sort: '최신순',
};

function PolicyPage() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const displayedPolicies = useMemo(() => {
    let filtered = [...allPolicies];

    // 1. 제목 검색어 필터링
    if (filters.searchTerm) {
      filtered = filtered.filter(policy =>
        policy.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // 2. 지역 필터링
    if (filters.region !== '전체') {
      filtered = filtered.filter(policy => policy.location === filters.region);
    }

    // 3. 태그 필터링 (중복 허용)
    if (filters.tags.length > 0) {
      filtered = filtered.filter(policy =>
        filters.tags.every(tag => policy.tags.includes(tag))
      );
    }

    // 4. 정렬
    if (filters.sort === '좋아요순') {
      filtered.sort((a, b) => b.likes - a.likes);
    } else { // TODO : db에서 기본이 최신순인지 확인하기
      
    }

    return filtered;
  }, [filters]);

  // 자식 컴포넌트로부터 받은 값으로 필터 상태를 업데이트
  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  };

  const handleTagClick = (tag) => {
    setFilters(prev => {
      // 태그 배열에서 선택된 태그를 추가하거나 제거
      const newTags = prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag) 
        : [...prev.tags, tag];
      return { ...prev, tags: newTags };
    });
  };

const handleRegionChange = (regionValue) => { 
  setFilters(prev => ({ ...prev, region: regionValue }));
};

  const handleSortChange = (sort) => {
    setFilters(prev => ({ ...prev, sort }));
  };

  const handleReset = () => {
    setFilters(INITIAL_FILTERS);
  };

  return (
    <div className={styles.policyPage}>
      <div className={styles.policyCard}>
        <div className={styles.policyDisc}>
          <p className={styles.title}>정책 모아보기</p>
          <p className={styles.subTitle}>청년을 위한 다양한 정책을 한눈에 확인하세요</p>
        </div>
        
        <div className={styles.policySearch}>
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <FilterSection
          activeTags={filters.tags}
          currentRegion={filters.region}
          onTagClick={handleTagClick}
          onRegionChange={handleRegionChange}
          onReset={handleReset}
        />
      </div>

      <PolicyList
        policies={displayedPolicies}
        activeSort={filters.sort}
        onSortChange={handleSortChange}
      />
      
      <div className={styles.pagenation}>
        1 2 3 4 5
      </div>
    </div>
  );
}

export default PolicyPage;

