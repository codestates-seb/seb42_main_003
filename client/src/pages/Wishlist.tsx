import styled from 'styled-components';
import Header from '../components/destop/Header';
import Footer from '../components/destop/Footer';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTK';
import { click } from '../store/clickedSlice';
import { MapViewButton } from '../components/MapViewButton';
import ContentListOnly from '../components/ContentListOnly';
import { PageHeader } from '../components/destop/PageHeader';
import { MobileHeader } from '../styles/mobileStyle';
import { useState } from 'react';
const Container = styled.div``;

function Wishlist() {
  const dispatch = useAppDispatch();
  const [isMap, setIsMap] = useState<boolean>(false);
  return (
    <Container onClick={() => dispatch(click(false))}>
      <MapViewButton setIsMap={setIsMap}></MapViewButton>
      <Header width_M={'1000px'}></Header>
      <MobileHeader>
        <h1>위시리스트</h1>
      </MobileHeader>
      <PageHeader title={'위시리스트'}></PageHeader>
      <ContentListOnly></ContentListOnly>
      <Footer width_page={'1000px'} fix={'none'}></Footer>
    </Container>
  );
}
export default Wishlist;
