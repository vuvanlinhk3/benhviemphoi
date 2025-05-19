import React from 'react';
import { useApp } from './contexts/AppContext';
import HomePage from './pages/HomePage';
import ResultPage from './pages/ResultPage';
import HistoryPage from './pages/HistoryPage';
import GuidePage from './pages/GuidePage';

const Router: React.FC = () => {
  const { currentPage } = useApp();

  switch (currentPage) {
    case 'result':
      return <ResultPage />;
    case 'history':
      return <HistoryPage />;
    case 'guide':
      return <GuidePage />;
    case 'home':
    default:
      return <HomePage />;
  }
};

export default Router;