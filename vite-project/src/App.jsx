import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css"; // CSS 모듈 import

// 공통 및 페이지 컴포넌트들
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import PolicyPage from "./pages/PolicyPage/PolicyPage";
import PolicyDetailPage from "./pages/PolicyDetailPage/PolicyDetailPage";
import ReportPage from "./pages/ReportPage/ReportPage";
import CommunityList from "./pages/CommunityPage/CommunityPage";
import NewPost from "./pages/CommunityPage/NewPost";
import PostDetail from "./pages/CommunityPage/PostDetail";

function App() {
  return (
    <div className="App">
      {/* Header는 모든 페이지에 공통으로 적용됩니다. */}
      <Header />

      {/* 페이지 내용이 들어갈 main 영역입니다. */}
      <main className="mainContent">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/policies" element={<PolicyPage />} />
          <Route path="/policies/:policyName" element={<PolicyDetailPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/community" element={<CommunityList />} />
          <Route path="/community/new" element={<NewPost />} />
          <Route path="/community/:postId" element={<PostDetail />} />
          <Route path="/" element={<Navigate to="/policies" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
