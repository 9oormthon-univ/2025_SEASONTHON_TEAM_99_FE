// src/context/AuthContext.js

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // 사용자 정보 (닉네임 등) 저장
  const [token, setToken] = useState(localStorage.getItem("accessToken")); // 토큰 저장

  const login = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
    localStorage.setItem("accessToken", accessToken); // 토큰을 localStorage에 저장해 새로고침해도 유지
  };

  // 로그아웃 시 호출될 함수
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("accessToken");
  };

  // Context가 제공할 값들을 묶음
  const value = { user, token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
