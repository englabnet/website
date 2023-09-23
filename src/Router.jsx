import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage';
import VideoPage from './pages/VideoPage';

export default function Router() {
  return (
    <Routes>
      <Route exact path="/" element={<MainPage />} />
      <Route exact path="/videos" element={<VideoPage />} />
    </Routes>
  );
}
