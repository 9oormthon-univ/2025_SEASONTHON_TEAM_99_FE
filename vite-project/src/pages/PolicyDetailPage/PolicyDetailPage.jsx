import React, { useState, useEffect, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./PolicyDetailPage.module.css";
import axiosInstance from "../../api/axiosInstance";

import locationIconUrl from "../../assets/location.svg";
import heartIconUrl from "../../assets/fullheart.svg";
import s_cIconUrl from "../../assets/support_content.svg";
import s_sIconUrl from "../../assets/support_size.svg";
import calIconUrl from "../../assets/cal.svg";
import BacktoList from "../../components/BacktoList";
import CommentsSection from "../../components/CommentSection";
const DisplayData = ({ data, fallbackText = "등록된 정보 없음" }) => {
  // data가 존재하고(null, undefined가 아님) 공백을 제외한 문자열이 있을 때만 내용을 보여줌
  if (data && String(data).trim() !== "") {
    // pre-wrap 스타일을 적용하여 API 데이터의 줄바꿈 등을 유지
    return <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{data}</p>;
  }
  // 그렇지 않으면 fallback 텍스트를 보여줌
  return <p style={{ color: "#868e96", margin: 0 }}>{fallbackText}</p>;
};

// 재사용 가능한 상세 정보 카드 컴포넌트
const DetailIcon = ({ children }) => (
  <div className={styles.detailIcon}>{children}</div>
);

const DetailCard = ({ icon, title, children }) => (
  <div className={styles.detailCard}>
    <div className={styles.detailCardHeader}>
      {icon && <DetailIcon>{icon}</DetailIcon>}
      <h4>{title}</h4>
    </div>
    <div className={styles.detailCardContent}>{children}</div>
  </div>
);

// 심사 방법 파싱
const ScreeningSteps = ({ screeningData }) => {
  const steps = useMemo(() => {
    if (!screeningData) return [];
    return screeningData
      .split("\n")
      .map((line) => {
        const match = line.match(/^(\d+)\.\s*(.*?)\s*:\s*(.*)$/);
        if (match) {
          const [, number, title, content] = match;
          return { number, title, content };
        }
        return null;
      })
      .filter(Boolean);
  }, [screeningData]);

  if (steps.length === 0) {
    return <DisplayData data={screeningData} />;
  }

  return (
    <div className={styles.gridContainer}>
      {steps.map((step) => (
        <DetailCard key={step.number} icon={step.number}>
          <p className={styles.gridTitle}>{step.title}</p>
          <p>{step.content}</p>
        </DetailCard>
      ))}
    </div>
  );
};

function PolicyDetailPage() {
  const { policyName } = useParams();
  const location = useLocation();
  const { likes = "...", status = "확인중" } = location.state || {};

  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicyDetail = async () => {
      setLoading(true);
      setError(null);
      const decodedPolicyName = decodeURIComponent(policyName);

      try {
        const response = await axiosInstance.get("/youth/policies/detail", {
          params: { plcyNm: decodedPolicyName },
        });

        if (response.data && response.data.isSuccess) {
          setPolicy(response.data.result);
        } else {
          throw new Error(
            response.data.message || "정책 정보를 불러오지 못했습니다."
          );
        }
      } catch (e) {
        setError(e);
        console.error("API 호출 중 오류 발생:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicyDetail();
  }, [policyName]);

  const getStatusClassName = (currentStatus) => {
    if (currentStatus === "완료") return styles.completed;
    if (currentStatus === "진행중") return styles.inProgress;
    if (currentStatus === "진행전") return styles.beforeStart;
    return "";
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <p>정책 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p>오류가 발생했습니다: {error.message}</p>
        <BacktoList />
      </div>
    );
  }

  if (!policy) {
    return (
      <div className={styles.container}>
        <p>해당 정책 정보를 찾을 수 없습니다.</p>
        <BacktoList />
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <BacktoList />
      </header>
      <main className={styles.mainContent}>
        <section className={styles.titleCard}>
          <div className={styles.titleHeader}>
            <span
              className={`${styles.statusBadge} ${getStatusClassName(status)}`}
            >
              {status}
            </span>
            <h1>{policy.plcyNm}</h1>
            <div className={styles.titleMeta}>
              <div className={styles.location}>
                <img src={locationIconUrl} alt="지역" className={styles.icon} />
                <span>{policy.regions?.join(", ") || "전국"}</span>
              </div>
              <div className={styles.likes}>
                <img src={heartIconUrl} alt="좋아요" className={styles.icon} />
                <span>{likes}</span>
              </div>
            </div>
          </div>
          <a
            href={policy.aplyUrlAddr}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.applyButton}
          >
            신청하기
          </a>
        </section>
        <hr />
        <section className={styles.section}>
          <h2>정책 설명</h2>
          <DisplayData data={policy.plcyExplnCn} />
        </section>
        <section className={styles.section}>
          <h2>지원 내용</h2>
          <div className={styles.gridContainer}>
            <DetailCard icon={<img src={s_cIconUrl} alt="지원내용" />}>
              <p className={styles.gridTitle}>지원 내용</p>
              <DisplayData data={policy.plcySprtCn} />
            </DetailCard>
            <DetailCard icon={<img src={s_sIconUrl} alt="지원규모" />}>
              <p className={styles.gridTitle}>지원 규모</p>
              <p>{policy.sprtSclLmtYn === "Y" ? "제한 있음" : "제한 없음"}</p>
            </DetailCard>
          </div>
        </section>
        <section className={styles.section}>
          <h2>신청 정보</h2>
          <div className={styles.gridContainer}>
            <DetailCard icon={<img src={calIconUrl} alt="기간" />}>
              <p className={styles.gridTitle}>신청 기간</p>
              <DisplayData data={policy.aplyYmd} />
              <p className={styles.gridTitle} style={{ marginTop: "16px" }}>
                사업 기간
              </p>
              <DisplayData
                data={
                  policy.bizPrdBgngYmd &&
                  `${policy.bizPrdBgngYmd}~${policy.bizPrdEndYmd}`
                }
              />
            </DetailCard>
          </div>
        </section>
        <section className={styles.section}>
          <h2>자격 요건</h2>
          <div className={styles.grid3Container}>
            <DetailCard>
              <p className={styles.gridNTitle}>연령</p>
              <p style={{ whiteSpace: "pre-wrap" }}>
                <b>나이:</b> 만 {policy.sprtTrgtMinAge}세 ~ 만{" "}
                {policy.sprtTrgtMaxAge}세<br />
              </p>
            </DetailCard>
            <DetailCard>
              <p className={styles.gridNTitle}>지역</p>
              <DisplayData data={policy.zipCd} />
            </DetailCard>
            <DetailCard>
              <p className={styles.gridNTitle}>학력</p>
              <DisplayData data={policy.schoolCd} />
            </DetailCard>
            <DetailCard>
              <p className={styles.gridNTitle}>취업 상태</p>
              <DisplayData data={policy.jobCd} />
            </DetailCard>
            <DetailCard>
              <p className={styles.gridNTitle}>소득 조건</p>
              <DisplayData data={policy.earnCndSeCd} />
            </DetailCard>
            <DetailCard>
              <p className={styles.gridNTitle}>기타 조건</p>
              <DisplayData data={policy.addAplyQlfcCndCn} />
            </DetailCard>
          </div>
        </section>
        <section className={styles.section}>
          <h2>제출 서류</h2>
          <DisplayData data={policy.sbmsnDcmntCn} />
        </section>
        <section className={styles.section}>
          <h2>심사 방법</h2>
          <div className={styles.screeningDataCon}>
            <ScreeningSteps screeningData={policy.srngMthdCn} />
          </div>
        </section>
        <p>
          최초등록일 {policy.frstRegDt} 최종수정일 {policy.lastMdfcnDt}
        </p>
      </main>
      <CommentsSection
        type="policy"
        id={policy.plcyNo}
        metadata={{ plcyNm: policy.plcyNm }}
      />
    </div>
  );
}

export default PolicyDetailPage;
