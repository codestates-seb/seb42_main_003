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
import { Tab } from '../styles/Tab';
const Container = styled.div`
  .wrap_body {
    margin-top: 60px;
    padding: 10px;
  }
`;

function UserPick() {
  const dispatch = useAppDispatch();
  const [isMap, setIsMap] = useState<boolean>(false);
  return (
    <Container onClick={() => dispatch(click(false))}>
      <MapViewButton setIsMap={setIsMap}></MapViewButton>
      <Header width_M={'1000px'}></Header>
      <MobileHeader>
        <h1>유저픽</h1>
      </MobileHeader>
      <PageHeader title={'유저픽'}></PageHeader>
      <div className="wrap_body">
        <Tab color="green">
          <button>유저가 찾은 차박지</button>
          <button>내가 찾은 차박지</button>
        </Tab>
        <ContentListOnly></ContentListOnly>
      </div>
      <Footer width_page={'1000px'} fix={'none'}></Footer>
    </Container>
  );
}
export default UserPick;
