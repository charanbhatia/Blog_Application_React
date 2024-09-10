import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from './styles/theme';
import Header from './components/Header';
import Loading from './components/Loading';
import { Container } from '@mui/material';

const HomePage = lazy(() => import('./pages/HomePage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const CreatePostPage = lazy(() => import('./pages/CreatePostPage'));
const EditPostPage = lazy(() => import('./pages/EditPostPage'));
const CategoryPage = lazy(() => import('./components/CategoryPage'));

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('isDarkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('isDarkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Header toggleTheme={toggleTheme} />
        <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
          <Suspense fallback={<Loading />}>
            <Routes>
              
              <Route path="/" element={<HomePage />} />
              <Route path="/post/:id" element={<BlogDetailPage />} />
              <Route path="/create" element={<CreatePostPage />} />
              <Route path="/edit/:id" element={<EditPostPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
            </Routes>
          </Suspense>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;