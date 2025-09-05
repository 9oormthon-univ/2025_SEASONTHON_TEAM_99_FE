import React, { useState, useRef } from "react";
import styles from "./ProfileImageUpload.module.css";

import defaultProfileImage from "../../assets/Shape.svg";

function ProfileImageUpload({ onFileSelect }) {
  const [imagePreview, setImagePreview] = useState(defaultProfileImage);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      onFileSelect(file);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImagePreview(defaultProfileImage);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onFileSelect(null);
  };

  return (
    <div className={styles.profileUploadContainer}>
      <div className={styles.imagePreviewWrapper} onClick={handleImageClick}>
        <img
          src={imagePreview}
          alt="Profile Preview"
          className={styles.imagePreview}
        />
        <div className={styles.editOverlay}>
          <svg
            onClick={handleRemoveImage}
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
          >
            <path d="M10 2.5L2 10.5" stroke="white" stroke-linecap="round" />
            <path d="M10 10.5L2 2.5" stroke="white" stroke-linecap="round" />
          </svg>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/gif"
        style={{ display: "none" }}
      />
    </div>
  );
}

export default ProfileImageUpload;
