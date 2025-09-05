import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import axios from "axios";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axiosInstance.post(
        "/user/doLogin",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.accessToken);
      console.log(response.data.nickname);

      const accessToken = response.data.token.accessToken;
      login(response.data.nickname, accessToken);
      console.log("로그인 성공:", response.data);
      alert("로그인에 성공했습니다!");
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      const message =
        error.response?.data?.message ||
        "로그인 중 오류가 발생했습니다. 아이디 또는 비밀번호를 확인해주세요.";
      setErrorMessage(message);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <div className={styles.loginPageContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2 className={styles.title}>로그인</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`${styles.input} ${
              errorMessage ? styles.errorInput : ""
            }`}
            placeholder="이메일을 입력해 주세요"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errorMessage && (
            <p className={styles.errorMessage}>
              로그인 정보가 일치하지 않습니다. 다시 입력해 주세요.
            </p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={`${styles.input} ${
              errorMessage ? styles.errorInput : ""
            }`}
            placeholder="비밀번호를 입력해 주세요"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errorMessage && (
            <p className={styles.errorMessage}>
              로그인 정보가 일치하지 않습니다. 다시 입력해 주세요.
            </p>
          )}
        </div>

        <button type="submit" className={styles.loginButton} disabled={loading}>
          {loading ? "로그인 중..." : "로그인"}
        </button>

        <div className={styles.signupPrompt}>
          <span>아직 회원이 아니신가요?</span>
          <Link to="/signup" className={styles.signupLink}>
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
