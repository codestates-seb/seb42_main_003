import styled from 'styled-components';
import Header from '../components/destop/Header';
import Footer from '../components/destop/Footer';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTK';
import { click } from '../store/clickedSlice';
import { MapViewButton } from '../components/MapViewButton';
import { PageHeader } from '../components/destop/PageHeader';
import { MobileHeader } from '../styles/mobileStyle';
import { useState, useEffect } from 'react';
import { Tab } from '../styles/Tab';
import { getData } from '../api/api';
import {
  ContentListOnlyColumn,
  ContentListOnlyRow,
} from '../components/ContentListOnly';
import MapContainer from '../components/map/MapContainer';
import { useWindowSize } from '../hooks/useWindowSize';

const Container = styled.div<UserPickProps>`
  .container_flex {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .content_body {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    max-width: 100vw;
  }
  .card_field {
    @media (max-width: 768px) {
      margin-top: 60px;
      padding: 10px;
      width: 100%;
    }
    @media (min-width: 768px) {
      width: 100%;
      padding: 20px;
      max-width: 750px;
    }
  }
  .map_field {
    @media (max-width: 768px) {
      display: none;
    }
    width: 100%;
    /* height: ${props => props.map_height}; */
    height: 670px;
  }

  .map_field_mobile {
    @media (max-width: 768px) {
      display: none;
      &.active {
        width: 100%;
        display: block;
        position: absolute;
        top: 115px;
        max-width: 100%;
        height: 100vh;
      }
    }
  }
  .map_header {
    /* height: 50px; */
    @media (min-width: 768px) {
      display: none;
    }
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: var(--fs__h2);
    background-color: white;
    border: 1px solid var(--fontBlack__300);
    border-radius: 16px 16px 0 0;
    text-align: center;
    padding: 12px;
    position: relative;
    color: var(--fontBlack__600);
  }
  .off {
    position: absolute;
    right: 5%;
    bottom: 29%;
    font-size: 20px;
    font-weight: 500;
    color: var(--fontBlack__500);
    cursor: pointer;
  }
  .mapview_mobile {
    @media (min-width: 768px) {
      display: none;
    }
  }
  .mobile_hide {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;
type UserPickProps = { map_height?: string };
function UserPick({ map_height }: UserPickProps) {
  const dispatch = useAppDispatch();
  type Info = any | null;
  const [data, setData] = useState<Info>([]);
  const [isTab, setIsTab] = useState(1);
  const size = useWindowSize();
  const [isMap, setIsMap] = useState<boolean>(false);

  useEffect(() => {
    isTab === 1
      ? getData('shared').then(res => {
          setData(res);
        })
      : getData('members').then(res => {
          setData(res.myPlaceInfos);
        });
  }, [isTab]);
  console.log(isMap);
  return (
    <Container
      onClick={() => dispatch(click(false))}
      map_height={String(size.height)}
    >
      <div className="mapview_mobile">
        {isMap ? null : <MapViewButton setIsMap={setIsMap}></MapViewButton>}
      </div>
      <Header width_M={'1000px'}></Header>
      <MobileHeader>
        <h1>유저픽</h1>
      </MobileHeader>
      <PageHeader title={'유저픽'}></PageHeader>
      <div className="container_flex">
        <div className="content_body">
          <div className="card_field">
            <Tab color={'green'} state={isTab}>
              <button onClick={() => setIsTab(1)}>유저가 찾은 차박지</button>
              <button onClick={() => setIsTab(2)}>내가 찾은 차박지</button>
            </Tab>
            {/* {isMap ? null : (
              <div className=''>
                <ContentListOnlyColumn
                  setIsMap={setIsMap}
                  data={data}
                ></ContentListOnlyColumn>
              </div>
            )} */}
            <div className={isMap ? 'mobile_hide' : ''}>
              <ContentListOnlyColumn
                setIsMap={setIsMap}
                data={data}
              ></ContentListOnlyColumn>
            </div>
          </div>
          <div className="map_field">
            {Object.keys(data).length >= 1 && (
              <MapContainer
                level={12}
                padding={'100px'}
                campList={data}
                border_rd={'0'}
              ></MapContainer>
            )}
          </div>
          <div
            className={isMap ? 'map_field_mobile active' : 'map_field_mobile'}
          >
            <div className="map_header">
              <p className="title">지도에서 보기</p>
              <p className="off" onClick={() => setIsMap(false)}>
                &times;
              </p>
            </div>
            {Object.keys(data).length >= 1 && (
              <MapContainer
                level={12}
                padding={'270px'}
                campList={data}
                border_rd={'0'}
              ></MapContainer>
            )}
          </div>
        </div>
      </div>
      {/* <Footer width_page={'1000px'} fix={'none'}></Footer> */}
    </Container>
  );
}
export default UserPick;
