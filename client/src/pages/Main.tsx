import styled from 'styled-components';
import ContentList from '../components/ContentList';
import HeaderSearch from '../components/HeaderSearch';
import CommunityBestM from '../components/mobile/CommunityBestM';
import Category from '../components/Category';
import Header from '../components/destop/Header';
import Footer from '../components/destop/Footer';
import Banner from '../components/destop/Banner';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTK';
import { click } from '../store/clickedSlice';
import { MapViewButton } from '../components/MapViewButton';
const Container = styled.div``;

function Main() {
  type Info = { id: string; title: string | null };
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  return (
    <Container onClick={() => dispatch(click(false))}>
      <MapViewButton></MapViewButton>
      <Header></Header>
      <HeaderSearch view={'none'} />
      <Banner></Banner>
      <Category></Category>
      <CommunityBestM></CommunityBestM>
      <ContentList></ContentList>
      <Footer></Footer>
    </Container>
  );
}
export default Main;
