import styled from 'styled-components';
import ContentList from '../components/ContentList';
import HeaderSearch from '../components/HeaderSearch';
import CommunityBestM from '../components/mobile/CommunityBestM';
import Category from '../components/Category';
import Header from '../components/destop/Header';
import Footer from '../components/destop/Footer';
import Banner from '../components/destop/Banner';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTK';
import { click } from '../store/clickedSlice';
import { MapViewButton } from '../components/MapViewButton';
import MapContainer from '../components/map/MapContainer';
import { getData } from '../api/api';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
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
  .map {
    @media (min-width: 768px) {
      top: 76px;
    }
    z-index: 900;
    position: absolute;
    top: 130px;
    width: 100%;
    height: 100vh;
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
  .community {
    visibility: hidden;
  }
`;
function Main() {
  type Info = any | null;
  // const [isClicked, setIsClicked] = useState<boolean>(false);
  const [content, setContent] = useState<Info>();
  const [data, setData] = useState<Info>();
  const [isMap, setIsMap] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // getData('main?page=1').then(res => {
    getData('content').then(res => {
      setContent(res);
      if (res) setData([...res.slice(0, 6)]);
    });
  }, []);

  return (
    <Container onClick={() => dispatch(click(false))}>
      <MapViewButton isMap={isMap} setIsMap={setIsMap}></MapViewButton>
      <Header></Header>
      <HeaderSearch view={'none'} />
      {isMap ? (
        <div className="map">
          <div className="map_header">
            <p className="title">지도에서 보기</p>
            <p className="off" onClick={() => setIsMap(false)}>
              &times;
            </p>
          </div>
          <div style={{ height: '100vh' }}>
            <MapContainer
              level={13}
              padding={'270px'}
              campList={data}
              border_rd={'0'}
            ></MapContainer>
          </div>
        </div>
      ) : null}
      <Banner></Banner>
      <Category></Category>
      <div className={isMap ? 'community' : ''}>
        <CommunityBestM></CommunityBestM>
      </div>
      <ContentList
        data={data}
        setData={setData}
        content={content}
      ></ContentList>
      <Footer></Footer>
    </Container>
  );
}
export default Main;
