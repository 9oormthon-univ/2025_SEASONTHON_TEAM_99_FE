import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import CustomDropdown from "../../components/CustomDropdown";
import styles from "./NewPost.module.css";

const REGION_OPTIONS_FOR_NEW_POST = [
  { value: "", label: "전체지역" },
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

function NewPostPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [regionId, setRegionId] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요한 기능입니다.");
      navigate("/login");
    }
  }, [user, navigate]);

  const handleRegionChange = (regionValue) => {
    setRegionId(parseInt(regionValue, 10));
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleCancel = () => {
    if (
      window.confirm("작성을 취소하시겠습니까? 변경사항이 저장되지 않습니다.")
    ) {
      navigate(-1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !regionId || !content) {
      alert("필수항목: 제목과 지역, 본문을 모두 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("regionId", regionId);
    formData.append("isAnonymous", isAnonymous);

    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      const response = await axiosInstance.post("/posts/new", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newPostId = response.data.result.postId;
      navigate(`/community/${newPostId}`);
    } catch (error) {
      console.error("게시글 작성 실패:", error);
      const message =
        error.response?.data?.message || "게시글 발행에 실패했습니다.";
      alert(message);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      {/* <h1 className={styles.pageTitle}>글 작성하기</h1> */}
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="title" className={styles.label}>
            제목
          </label>
          <input
            id="title"
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            style={{ height: "82px" }}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="region" className={styles.label}>
            지역
          </label>
          <div className={styles.dropdownContainer}>
            <CustomDropdown
              options={REGION_OPTIONS_FOR_NEW_POST}
              currentRegion={regionId}
              onRegionChange={handleRegionChange}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="content" className={styles.label}>
            내용
          </label>
          <textarea
            id="content"
            placeholder="청년 정책과 관련된 경험이나 정보를 공유해보세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textarea}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>사진</label>
          <button
            type="button"
            onClick={handleImageUploadClick}
            className={styles.imageUploadButton}
          >
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20.9001 15.0005L20.9001 18.4308C20.9002 18.6851 20.9002 18.9272 20.8835 19.1312C20.8654 19.3536 20.823 19.6087 20.6931 19.8637C20.5109 20.2212 20.2202 20.5118 19.8627 20.694C19.6077 20.8239 19.3526 20.8663 19.1302 20.8845C18.9263 20.9011 18.6843 20.9011 18.43 20.9011H5.57035C5.31605 20.9011 5.07397 20.9011 4.87002 20.8845C4.64761 20.8663 4.3925 20.8239 4.13752 20.694C3.78001 20.5118 3.48935 20.2212 3.30719 19.8637C3.17727 19.6087 3.13489 19.3536 3.11671 19.1312C3.10005 18.9272 3.10007 18.6852 3.1001 18.4308V15.0005H4.90011V19.0008C4.90011 19.056 4.94488 19.1008 5.00011 19.1008H19.0001C19.0554 19.1008 19.1001 19.056 19.1001 19.0008V15.0005H20.9001Z"
                  fill="#999999"
                />
                <path
                  d="M16.9055 8.6179C16.5648 8.97986 15.9952 8.99712 15.6333 8.65645L12.9001 6.08406V15.5013C12.9001 15.9983 12.4972 16.4013 12.0001 16.4013C11.503 16.4013 11.1001 15.9983 11.1001 15.5013V6.08406L8.36693 8.65645C8.00497 8.99712 7.43539 8.97986 7.09472 8.6179C6.75406 8.25594 6.77132 7.68636 7.13327 7.34569L11.3833 3.34569C11.7298 3.01953 12.2704 3.01953 12.6169 3.34569L16.8669 7.34569C17.2289 7.68636 17.2461 8.25594 16.9055 8.6179Z"
                  fill="#999999"
                />
              </svg>
              <br />
              사진 추가하기
              <br />
              최대 3장까지 추가 가능
            </p>
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className={styles.imagePreviewContainer}>
              <img
                src={imagePreview}
                alt="preview"
                className={styles.imagePreview}
              />
              <button
                type="button"
                onClick={removeImage}
                className={styles.removeImageButton}
              >
                X
              </button>
            </div>
          )}
        </div>

        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="anonymous"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          <label htmlFor="anonymous">익명</label>
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={handleCancel}
            className={styles.cancelButton}
          >
            취소
          </button>
          <button type="submit" className={styles.submitButton}>
            발행
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewPostPage;
