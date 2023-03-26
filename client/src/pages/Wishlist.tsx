import styled from 'styled-components';
import Header from '../components/destop/Header';
import Footer from '../components/destop/Footer';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTK';
import { click } from '../store/clickedSlice';
import { MapViewButton } from '../components/MapViewButton';
import ContentListOnly from '../components/ContentListOnly';
import { PageHeader } from '../components/destop/PageHeader';
import { MobileHeader } from '../styles/mobileStyle';
import { useState, useEffect } from 'react';
import { getData } from '../api/api';
const Container = styled.div`
  .content_list {
    @media (max-width: 768px) {
      margin-top: 50px;
    }
    @media (min-width: 768px) {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
`;

function Wishlist() {
  type Info = any | null;
  const [data, setData] = useState<Info>([]);
  const [isMap, setIsMap] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    getData('wishlist').then(res => {
      console.log(res);
      setData(res);
    });
  }, []);
  return (
    <Container onClick={() => dispatch(click(false))}>
      <MapViewButton setIsMap={setIsMap}></MapViewButton>
      <Header width_M={'1000px'}></Header>
      <MobileHeader>
        <h1>위시리스트</h1>
      </MobileHeader>
      <PageHeader title={'위시리스트'}></PageHeader>
      <div className="content_list">
        <ContentListOnly data={data}></ContentListOnly>
      </div>
      <Footer width_page={'1000px'} fix={'none'}></Footer>
    </Container>
  );
}
export default Wishlist;
