import React from 'react';
import './styles/global.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/globalStyle';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import Content from './pages/Content';
import { Community } from './pages/Community';
import Nav from './components/mobile/Nav';
import PostDetail from './pages/PostDetail';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main></Main>} />
        <Route path="/mypage" element={<MyPage></MyPage>} />
        <Route path="/content/:contentId" element={<Content></Content>} />
        <Route path="/community" element={<Community></Community>} />
        <Route path='/community/:postId' element={<PostDetail></PostDetail>}/>
      </Routes>
      <Nav></Nav>
    </BrowserRouter>
  );
}

export default App;
