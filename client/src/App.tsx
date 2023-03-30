import React, { useEffect, useState } from 'react';
import './styles/global.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { GlobalStyle } from './styles/globalStyle';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import Content from './pages/Content';
import { Community } from './pages/Community';
import Nav from './components/mobile/Nav';
import PostDetail from './pages/PostDetail';
import Wishlist from './pages/Wishlist';
import UserPick from './pages/UserPick';
import { ErrorPage } from './pages/ErrorPage';
import { loginTs, refreshTs } from './api/tsapi';
import { useDispatch } from 'react-redux';
import { login } from './store/isLoginSlice';
import { useAppSelector } from './hooks/reduxTK';
import Login from './components/Login';
import { setMemberInfo } from './store/memberInfoSlice';
import { loadRefreshToken } from './utils/token';

function App() {
  const [isRefreshed, setIsRefreshed] = useState(false);
  const loginModal = useAppSelector(state => state.loginmodal);
  const dispatch = useDispatch();

  useEffect(() => {
    if(loadRefreshToken()){
    refreshTs()
      .then((data) => {
        dispatch(login());
        dispatch(setMemberInfo(data));
        setIsRefreshed(true);
      })
      .catch(err => {
        console.log(err);
        localStorage.clearItem('refresh');
        alert(`로그아웃 되었습니다. (${err.response.status})`);
        
        setIsRefreshed(true);
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyle />
      {loginModal ? <Login></Login> : null}
      <Routes>
        <Route path="/" element={<Main></Main>} />
        <Route path="/mypage" element={isRefreshed && <MyPage></MyPage>} />
        <Route path="/content/:contentId" element={<Content></Content>} />
        <Route path="/community" element={<Community></Community>} />
        <Route path="/community/:postId" element={<PostDetail></PostDetail>} />
        <Route
          path="/wishlist"
          element={isRefreshed && <Wishlist></Wishlist>}
        />
        <Route path="/userpick" element={<UserPick></UserPick>} />
        <Route path="/*" element={<ErrorPage></ErrorPage>} />
        <Route path="/error" element={<ErrorPage></ErrorPage>} />
      </Routes>
      <Nav></Nav>
    </BrowserRouter>
  );
}

export default App;
