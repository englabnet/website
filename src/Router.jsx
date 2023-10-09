import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage';
import VideoPage from './pages/VideoPage';
import TermPage from './pages/TermPage';
import AboutPage from './pages/AboutPage';
import FeedbackPage from './pages/FeedbackPage';
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function Router() {
  return (
    <Routes>
      <Route exact path="/" element={<MainPage />} />
      <Route exact path="/videos" element={<VideoPage />} />
      <Route exact path="/feedback" element={<FeedbackPage />} />
      <Route exact path="/about" element={<AboutPage />} />
      <Route exact path="/terms" element={<TermPage />} />
      <Route path='*' element={<NotFoundPage />} status={404}/>
    </Routes>
  );
}
