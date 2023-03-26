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
import { Tab } from '../styles/Tab';
import { getData } from '../api/api';

const Container = styled.div`
  .wrap_body {
    @media (max-width: 768px) {
      margin-top: 60px;
      padding: 10px;
    }
    @media (min-width: 768px) {
      width: 100%;
      max-width: 1000px;
    }
  }
  .container_flex {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
  }
`;

function UserPick() {
  const dispatch = useAppDispatch();
  type Info = any | null;
  const [data, setData] = useState<Info>([]);
  const [isTab, setIsTab] = useState(1);

  useEffect(() => {
    isTab === 1
      ? getData('shared').then(res => {
          setData(res);
        })
      : getData('members').then(res => {
          console.log(res);
          setData(res.myPlaceInfos);
        });
  }, [isTab]);
  const [isMap, setIsMap] = useState<boolean>(false);
  return (
    <Container onClick={() => dispatch(click(false))}>
      <MapViewButton setIsMap={setIsMap}></MapViewButton>
      <Header width_M={'1000px'}></Header>
      <MobileHeader>
        <h1>유저픽</h1>
      </MobileHeader>
      <PageHeader title={'유저픽'}></PageHeader>
      <div className="container_flex">
        <div className="wrap_body">
          <Tab color={'green'} state={isTab}>
            <button onClick={() => setIsTab(1)}>유저가 찾은 차박지</button>
            <button onClick={() => setIsTab(2)}>내가 찾은 차박지</button>
          </Tab>
          <ContentListOnly data={data}></ContentListOnly>
        </div>
      </div>
      <Footer width_page={'1000px'} fix={'none'}></Footer>
    </Container>
  );
}
export default UserPick;
