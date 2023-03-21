import React from 'react';
import './styles/global.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/globalStyle';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import Content from './pages/Content';
import { Community } from './pages/Community';
import Nav from './components/mobile/Nav';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main></Main>} />
        <Route path="/mypage" element={<MyPage></MyPage>} />
        <Route path="/content" element={<Content></Content>} />
        <Route path="/community" element={<Community></Community>} />
      </Routes>
      <Nav></Nav>
    </BrowserRouter>
  );
}

export default App;
