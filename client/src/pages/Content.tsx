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
import { useAppDispatch, useAppSelector } from '../hooks/reduxTK';
import { click } from '../store/clickedSlice';
import { useParams } from 'react-router-dom';
const Container = styled.div`
  /* background-color: rgba(0, 0, 0, 0.2); */
`;

function Content() {
  const dispatch = useAppDispatch();
  const { contentId } = useParams();
  return (
    <Container onClick={() => dispatch(click(false))}>
      <Header width_M={'1000px'}></Header>
      {/* <HeaderSearch view={'none'} /> */}
      {/* <SearchModal /> */}
      <ContentM contentId={String(contentId)}></ContentM>
      <ContentD contentId={contentId}></ContentD>
      <Nav></Nav>
      <Footer width_mobile={'1000px'}></Footer>
    </Container>
  );
}
export default Content;
