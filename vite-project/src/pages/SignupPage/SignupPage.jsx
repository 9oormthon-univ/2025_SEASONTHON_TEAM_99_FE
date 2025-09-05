import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignupPage.module.css";
import ProfileImageUpload from "./ProfileImageUpload";
import CustomDropdown from "../../components/CustomDropdown";
import axiosInstance from "../../api/axiosInstance";
import defaultProfileImagePath from "../../assets/Shape.svg";

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

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
function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    password: "",
    regionId: "",
  });

  const [validation, setValidation] = useState({
    email: null,
    nickname: null,
    password: null,
    regionId: null,
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [defaultImageFile, setDefaultImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadDefaultImageAsFile = async () => {
      try {
        const response = await fetch(defaultProfileImagePath);
        const blob = await response.blob();
        const file = new File([blob], "Shape.svg", { type: blob.type });
        setDefaultImageFile(file);
      } catch (error) {
        console.error("기본 프로필 이미지를 불러오는 데 실패했습니다:", error);
      }
    };
    loadDefaultImageAsFile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 실시간 validation
    if (name === "email")
      setValidation((prev) => ({ ...prev, email: validateEmail(value) }));
    if (name === "password")
      setValidation((prev) => ({ ...prev, password: validatePassword(value) }));
    if (name === "nickname")
      setValidation((prev) => ({ ...prev, nickname: value.length > 0 }));
  };

  const handleRegionChange = (regionValue) => {
    const regionIdAsInt = parseInt(regionValue, 10);
    setFormData((prev) => ({ ...prev, regionId: regionIdAsInt }));
    setValidation((prev) => ({
      ...prev,
      regionId: regionValue ? true : false,
    }));
  };

  const handleFileSelect = (file) => setProfileImageFile(file);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newValidation = {
      email: validateEmail(formData.email),
      nickname: formData.nickname.length > 0,
      password: validatePassword(formData.password),
      regionId: !!formData.regionId,
    };
    setValidation(newValidation);

    const invalidField = Object.keys(newValidation).find(
      (key) => !newValidation[key]
    );
    if (invalidField) {
      setErrorMessage(
        invalidField === "email"
          ? "올바른 이메일을 입력해주세요."
          : invalidField === "nickname"
          ? "닉네임을 입력해주세요."
          : invalidField === "password"
          ? "비밀번호는 8자 이상, 영문+숫자를 조합해주세요."
          : "지역을 선택해주세요."
      );
      return;
    }

    setErrorMessage("");

    const bodyFormData = new FormData();
    bodyFormData.append("email", formData.email);
    bodyFormData.append("password", formData.password);
    bodyFormData.append("nickname", formData.nickname);
    bodyFormData.append("regionId", formData.regionId);
    bodyFormData.append(
      "imageFile",
      profileImageFile || defaultImageFile || new Blob(),
      profileImageFile?.name || "Shape.svg"
    );

    try {
      await axiosInstance.post("/user/signup", bodyFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("회원가입 완료");
      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.message || "회원가입 중 오류가 발생했습니다.";
      setErrorMessage(message);
    }
  };

  const getInputClass = (field) => {
    if (validation[field] === null) return styles.input;
    return `${styles.input} ${
      validation[field] ? styles.successInput : styles.errorInput
    }`;
  };

  const getMessageClass = (field) => {
    if (validation[field] === null) return "";
    return validation[field] ? styles.successMessage : styles.errorMessage;
  };

  const getMessageText = (field) => {
    if (validation[field] === null) return "";
    if (field === "email")
      return validation.email
        ? "사용 가능한 이메일입니다."
        : "사용이 불가능한 이메일입니다.";
    if (field === "nickname")
      return validation.nickname
        ? "사용 가능한 닉네임입니다."
        : "사용이 불가능한 닉네임입니다.";
    if (field === "password")
      return validation.password
        ? "사용 가능한 비밀번호입니다."
        : "비밀번호는 8자 이상, 영문+숫자를 조합해주세요.";
    if (field === "regionId")
      return validation.regionId ? "" : "지역을 선택해주세요.";
  };

  return (
    <div className={styles.loginPageContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2 className={styles.title}>회원가입</h2>
        <ProfileImageUpload onFileSelect={handleFileSelect} />

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={getInputClass("email")}
            placeholder="이메일을 입력해 주세요"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <p className={`${styles.message} ${getMessageClass("email")}`}>
            {getMessageText("email")}
          </p>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="nickname" className={styles.label}>
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            className={getInputClass("nickname")}
            placeholder="닉네임을 입력해 주세요"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
          <p className={`${styles.message} ${getMessageClass("nickname")}`}>
            {getMessageText("nickname")}
          </p>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={getInputClass("password")}
            placeholder="비밀번호를 입력해 주세요"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <p className={`${styles.message} ${getMessageClass("password")}`}>
            {getMessageText("password")}
          </p>
        </div>

        <div className={styles.inputGroup}>
          <label
            htmlFor="regionId"
            className={styles.label}
            style={{ marginBottom: "12px" }}
          >
            지역
          </label>
          <div className={styles.dropdownContainer}>
            <CustomDropdown
              className={styles.rlabel}
              options={REGION_OPTIONS}
              currentRegion={formData.regionId}
              onRegionChange={handleRegionChange}
            />
          </div>
          <p className={`${styles.message} ${getMessageClass("regionId")}`}>
            {getMessageText("regionId")}
          </p>
        </div>

        <button type="submit" className={styles.signupButton}>
          가입하기
        </button>

        <div className={styles.signupPrompt}>
          <span>이미 회원이신가요?</span>
          <Link to="/login" className={styles.pageupLink}>
            로그인
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
