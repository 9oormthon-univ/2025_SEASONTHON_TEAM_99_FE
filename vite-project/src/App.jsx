import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import PolicyPage from './pages/PolicyPage/PolicyPage';
import PolicyDetailPage from './pages/PolicyDetailPage/PolicyDetailPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/policies" element={<PolicyPage />} />
        <Route path="/policies/:policyId" element={<PolicyDetailPage />} />
        <Route path="/" element={<Navigate to="/policies" />} />
        {/* TODO : 헤더 따라 다른 라우터 경로 추가 */}
      </Routes>
    </div>
  );
}

export default App;

