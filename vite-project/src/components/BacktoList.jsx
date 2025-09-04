import React from "react";
import { Link } from "react-router-dom";
import styles from "./BackToList.module.css";
import backIconUrl from "../assets/back.svg?react";

function BackToList() {
  return (
    <Link to="/policies" className={styles.backLink}>
      <img src={backIconUrl} alt="뒤로가기" className={styles.icon} />
      <span>목록으로</span>
    </Link>
  );
}

export default BackToList;
