import styled from 'styled-components';
import ContentList from '../components/ContentList';
import HeaderSearch from '../components/HeaderSearch';
import CommunityBestM from '../components/mobile/CommunityBestM';
import { useState } from 'react';
import SearchModal from '../components/SearchModal';
import Nav from '../components/mobile/Nav';
import Category from '../components/Category';

const Container = styled.div``;

function Main() {
  type Info = { id: string; title: string | null };

  const [isClicked, setIsClicked] = useState(false);
  const [isKeyword, setIsKeyword] = useState<Info[]>([]);

  return (
    <Container>
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
          <Category></Category>
          <CommunityBestM></CommunityBestM>
          <ContentList></ContentList>
        </>
      )}
      <Nav></Nav>
    </Container>
  );
}
export default Main;
