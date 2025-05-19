import React from 'react';
import { Toaster } from './components/ui/Toaster';
import Layout from './components/Layout';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppProvider } from './contexts/AppContext';
import Router from './Router';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppProvider>
          <Layout>
            <Router />
            <Toaster />
          </Layout>
        </AppProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;