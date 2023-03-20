import React from 'react';
import './styles/global.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/globalStyle';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import { ContentDetail } from './pages/ContentDetail';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main></Main>} />
        <Route path="/mypage" element={<MyPage></MyPage>} />
        <Route path="/content" element={<ContentDetail></ContentDetail>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
