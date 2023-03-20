import styled from 'styled-components';
import HeaderSearch from '../components/HeaderSearch';
import { useState } from 'react';
import SearchModal from '../components/SearchModal';
import Nav from '../components/mobile/Nav';
import Header from '../components/destop/Header';
import Footer from '../components/destop/Footer';
import Login from '../components/Login';
import { ContentM } from '../components/mobile/ContentM';
import { ContentD } from '../components/destop/ContentD';
const Container = styled.div`
  /* background-color: rgba(0, 0, 0, 0.2); */
`;

function Content() {
  type Info = { id: string; title: string | null };

  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isKeyword, setIsKeyword] = useState<Info[]>([]);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <Container onClick={() => setIsClicked(false)}>
      {isLogin ? <Login setIsLogin={setIsLogin}></Login> : null}
      <Header
        isKeyword={isKeyword}
        setIsKeyword={setIsKeyword}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
        setIsLogin={setIsLogin}
      ></Header>
      {/* <HeaderSearch
        isKeyword={isKeyword}
        setIsKeyword={setIsKeyword}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
        view={'none'}
      /> */}
      <SearchModal
        isKeyword={isKeyword}
        isClicked={isClicked}
        setIsKeyword={setIsKeyword}
      />
      <ContentM></ContentM>
      <ContentD></ContentD>
      <Nav></Nav>
      <Footer></Footer>
    </Container>
  );
}
export default Content;
