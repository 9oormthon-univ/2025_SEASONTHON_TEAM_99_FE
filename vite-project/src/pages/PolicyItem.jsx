import React from 'react';
import styles from './PolicyItem.module.css';
import locationIconUrl from '../assets/location.svg?react';
import heartIconUrl from '../assets/fullheart.svg?react';
import { Link } from 'react-router-dom';


function PolicyItem({ policy }) {
  const getStatusClassName = (status) => {
    if (status === '완료') return styles.completed;
    if (status === '진행중') return styles.inProgress;
    if (status === '진행전') return styles.beforeStart;
    return '';
  };

  return (
    <Link to={`/policies/${policy.id}`} className={styles.itemContainer}>
      <div className={styles.policyInfo}>
        <div className={styles.title}>{policy.title}</div>
        <div className={styles.location}>
          <img src={locationIconUrl} alt="지역" className={styles.icon} />
          <span>{policy.location}</span>
        </div>
      </div>

      <div className={styles.policyDetails}>
        <div className={`${styles.statusBadge} ${getStatusClassName(policy.status)}`}>
          {policy.status}
        </div>
        <div className={styles.likes}>
          <img src={heartIconUrl} alt="좋아요" className={styles.icon} />
          <span>{policy.likes}</span>
        </div>
      </div>
    </Link>
  );
}

export default PolicyItem;

