import React from "react";
import { Link } from "react-router-dom";
import styles from "./LoginPage.module.css";

function LoginPage() {
  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginForm}>
        <h2 className={styles.title}>로그인</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="username" className={styles.label}>
            아이디
          </label>
          <input
            type="text"
            id="username"
            className={styles.input}
            placeholder="아이디를 입력해 주세요"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            className={styles.input}
            placeholder="비밀번호를 입력해 주세요"
          />
        </div>

        <button type="submit" className={styles.loginButton}>
          로그인
        </button>

        <div className={styles.signupPrompt}>
          <span>아직 회원이 아니신가요?</span>
          <Link to="/signup" className={styles.signupLink}>
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
