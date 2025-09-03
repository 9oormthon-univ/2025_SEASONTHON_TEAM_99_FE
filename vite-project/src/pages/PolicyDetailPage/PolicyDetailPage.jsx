import React from 'react';
import { useParams, Link } from 'react-router-dom';
import allPolicies from '../../components/mock.js';
import styles from './PolicyDetailPage.module.css';
import locationIconUrl from '../../assets/location.svg?react';
import heartIconUrl from '../../assets/fullheart.svg?react';
import s_cIconUrl from '../../assets/support_content.svg?react';
import s_sIconUrl from '../../assets/support_size.svg?react';
import backIconUrl from '../../assets/back.svg?react';
// 재사용 가능한 상세 정보 카드 컴포넌트
const DetailIcon = ({ children }) => <div className={styles.detailIcon}>{children}</div>;

const DetailCard = ({ icon, title, children }) => (
    <div className={styles.detailCard}>
        <div className={styles.detailCardHeader}>
            <DetailIcon>{icon}</DetailIcon>
            <h4>{title}</h4>
        </div>
        <div className={styles.detailCardContent}>
            {children}
        </div>
    </div>
);


function PolicyDetailPage() {
    const { policyId } = useParams();
    const policy = allPolicies.find(p => p.id === parseInt(policyId));

    const getStatusClassName = (status) => {
        if (status === '완료') return styles.completed;
        if (status === '진행중') return styles.inProgress;
        if (status === '진행전') return styles.beforeStart;
        return '';
    };

    if (!policy) {
        return (
            <div className={styles.container}>
                <p>해당 정책 정보를 찾을 수 없습니다.</p>
                <Link to="/policies" className={styles.backLink}>
                    <img src={backIconUrl} alt="뒤로가기" className={styles.icon} />
                    <span>목록으로</span>
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <Link to="/policies" className={styles.backLink}>
                    <img src={backIconUrl} alt="뒤로가기" className={styles.icon} />
                    <span>목록으로</span>
                </Link>
            </header>

            <main className={styles.mainContent}>
                {/* 상단 정보 카드 */}
                <section className={styles.titleCard}>
                    <div className={styles.titleHeader}>
                        <span className={`${styles.statusBadge} ${getStatusClassName(policy.status)}`}>
                            {policy.status}
                        </span>
                        <h1>{policy.title}</h1>
                    
                    <div className={styles.titleMeta}>
                        <div className={styles.locatin}>
                            <img src={locationIconUrl} alt="지역" className={styles.icon} />
          <span>{policy.location}</span>
                        </div>
                        <div className={styles.likes}>
                                      <img src={heartIconUrl} alt="좋아요" className={styles.icon} />

                            <span>{policy.likes}</span>
                        </div>
                    </div>
                    </div>
                    <a href={policy.applicationUrl} target="_blank" rel="noopener noreferrer" className={styles.applyButton}>
                        신청하기
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M10.0832 0.583496C9.66895 0.583496 9.33317 0.919284 9.33317 1.3335C9.33317 1.74771 9.66895 2.0835 10.0832 2.0835H12.8558L4.96952 9.96984C4.67663 10.2627 4.67663 10.7376 4.96952 11.0305C5.26241 11.3234 5.73728 11.3234 6.03018 11.0305L13.9165 3.14416V5.91683C13.9165 6.33104 14.2523 6.66683 14.6665 6.66683C15.0807 6.66683 15.4165 6.33104 15.4165 5.91683V1.3335C15.4165 0.919284 15.0807 0.583496 14.6665 0.583496H10.0832Z" fill="white"/>
  <path d="M15.4026 13.9419C15.4165 13.772 15.4165 13.5703 15.4165 13.3583L15.4165 9.66683L13.9165 9.66748V13.8341C13.9165 13.8802 13.8792 13.9175 13.8332 13.9175H2.16657C2.12055 13.9175 2.08324 13.8802 2.08324 13.8341V2.16748C2.08324 2.12146 2.12055 2.08415 2.16657 2.08415H6.33322L6.33318 0.583501L2.64173 0.583499C2.4298 0.583478 2.22809 0.583458 2.05813 0.597345C1.87279 0.612488 1.6602 0.647809 1.44772 0.756074C1.14979 0.907873 0.907576 1.15009 0.755777 1.44802C0.647513 1.6605 0.612191 1.87309 0.597049 2.05843C0.583162 2.2284 0.583182 2.4301 0.583203 2.64204V13.3583C0.583182 13.5702 0.583162 13.7719 0.597049 13.9419C0.612191 14.1272 0.647513 14.3398 0.755777 14.5523C0.907576 14.8502 1.14979 15.0925 1.44772 15.2443C1.6602 15.3525 1.87279 15.3878 2.05813 15.403C2.22808 15.4169 2.42977 15.4169 2.64169 15.4168H13.358C13.5699 15.4169 13.7716 15.4169 13.9416 15.403C14.1269 15.3878 14.3395 15.3525 14.552 15.2443C14.8499 15.0925 15.0921 14.8502 15.2439 14.5523C15.3522 14.3398 15.3875 14.1272 15.4026 13.9419Z" fill="white"/>
</svg>
                    </a>
                </section>
<hr/>
                {/* 정책 설명 */}
                <section className={styles.section}>
                    <h2>정책 설명</h2>
                    <p>{policy.description}</p>
                </section>

                {/* 지원 내용/규모 */}
                <section className={styles.section}>
                    <div className={styles.gridContainer}>
                      <DetailCard icon={<img src={s_cIconUrl}/>}>
                          <p className={styles.gridTitle}>지원 내용</p>
                          <p>{policy.supportContent}</p>
                        </DetailCard>
                                              <DetailCard icon={<img src={s_sIconUrl}/>}>
                        <p className={styles.gridTitle}>지원 규모</p>
                            <p>{policy.supportScale}</p>
                        </DetailCard>
                    </div>
                </section>
                
                {/* 신청 정보 */}
                <section className={styles.section}>
                    <h2>신청 정보</h2>
                    <div className={styles.gridContainer}>
                        <DetailCard icon={'📅'}>
                         <p className={styles.gridTitle}>신청 기간</p>
                            <p>{policy.applicationPeriod}</p>
                        </DetailCard>
                         <DetailCard icon={'📄'}>
                        <p className={styles.gridTitle}>신청 방법</p>
                            <p>{policy.requiredDocuments}</p>
                        </DetailCard>
                    </div>
                </section>

                 {/* 자격 요건 */}
                <section className={styles.section}>
                     <h2>자격 요건</h2>
                     <p>{policy.eligibility}</p>
                </section>

                {/* 제출 서류 */}
                <section className={styles.section}>
                     <h2>제출 서류</h2>
                     <p>{policy.eligibility}</p>
                </section>

                {/* 심사 방법 */}
                <section className={styles.section}>
                     <h2>심사 방법</h2>
                     <p>{policy.eligibility}</p>
                </section>

            </main>
            댓글 컴포넌트 재사용
        </div>
    );
}

export default PolicyDetailPage;

