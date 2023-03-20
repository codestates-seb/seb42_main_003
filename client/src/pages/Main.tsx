import styled from 'styled-components';
import ContentList from '../components/ContentList';
import HeaderSearch from '../components/HeaderSearch';
import CommunityBestM from '../components/mobile/CommunityBestM';
import { useState } from 'react';
import SearchModal from '../components/SearchModal';
import Nav from '../components/mobile/Nav';
import Category from '../components/Category';
import Header from '../components/destop/Header';
import Footer from '../components/destop/Footer';
import Banner from '../components/destop/Banner';
import Login from '../components/Login';
const Container = styled.div`
  /* background-color: rgba(0, 0, 0, 0.2); */
`;

function Main() {
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
      <HeaderSearch
        isKeyword={isKeyword}
        setIsKeyword={setIsKeyword}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
        view={'none'}
      />
      {/* {isClicked ? (
        <SearchModal isKeyword={isKeyword} setIsKeyword={setIsKeyword} />
      ) : (
        <>
          <Banner></Banner>
          <Category></Category>
          <CommunityBestM></CommunityBestM>
          <ContentList></ContentList>
        </>
      )} */}
      {/* {isClicked ? ( */}
      <SearchModal
        isKeyword={isKeyword}
        isClicked={isClicked}
        setIsKeyword={setIsKeyword}
        // onClick={(e: any) => {
        //   e.stopPropagation();
        // }}
      />
      {/* ) : null} */}

      <Banner></Banner>
      <Category></Category>
      <CommunityBestM></CommunityBestM>
      <ContentList></ContentList>

      <Nav></Nav>
      <Footer></Footer>
    </Container>
  );
}
export default Main;
