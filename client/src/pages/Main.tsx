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
const Container = styled.div``;

function Main() {
  type Info = { id: string; title: string | null };

  const [isClicked, setIsClicked] = useState(false);
  const [isKeyword, setIsKeyword] = useState<Info[]>([]);

  return (
    <Container>
      <Header></Header>
      <HeaderSearch
        isKeyword={isKeyword}
        setIsKeyword={setIsKeyword}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
      />
      {isClicked ? (
        <SearchModal isKeyword={isKeyword} setIsKeyword={setIsKeyword} />
      ) : (
        <>
          <Banner></Banner>
          <Category></Category>
          <CommunityBestM></CommunityBestM>
          <ContentList></ContentList>
        </>
      )}
      <Nav></Nav>
      <Footer></Footer>
    </Container>
  );
}
export default Main;
