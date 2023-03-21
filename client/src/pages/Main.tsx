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
import { useAppDispatch, useAppSelector } from '../hooks/reduxTK';
import { click } from '../store/clickedSlice';
const Container = styled.div``;

function Main() {
  type Info = { id: string; title: string | null };
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  return (
    <Container onClick={() => dispatch(click(false))}>
      <Header></Header>
      <HeaderSearch view={'none'} />
      {/* <SearchModal /> */}
      <Banner></Banner>
      <Category></Category>
      <CommunityBestM></CommunityBestM>
      <ContentList></ContentList>
      <Footer></Footer>
    </Container>
  );
}
export default Main;
