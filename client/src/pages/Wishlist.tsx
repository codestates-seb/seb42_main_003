import styled from 'styled-components';
import Header from '../components/destop/Header';
import Footer from '../components/destop/Footer';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTK';
import { click } from '../store/clickedSlice';
import { MapViewButton } from '../components/MapViewButton';
import { ContentListOnlyRow } from '../components/ContentListOnly';
import { PageHeader } from '../components/destop/PageHeader';
import { MobileHeader } from '../styles/mobileStyle';
import { useState, useEffect } from 'react';
import { getData } from '../api/api';
import MapContainer from '../components/map/MapContainer';
import { AiOutlineHeart } from 'react-icons/ai';
import { useWindowSize } from '../hooks/useWindowSize';
const Container = styled.div<MapHeightProps>`
  /* @media (min-width: 768px) {
      display: flex;
      flex-direction: row;
      justify-content: center;
    } */

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
  .content_list {
    @media (max-width: 768px) {
      margin-top: 50px;
    }
    width: 100%;
    max-width: 500px;
  }
  .card_field {
    @media (max-width: 768px) {
      margin-top: 60px;
      padding: 10px;
      width: 100%;
    }
    @media (min-width: 768px) {
      width: 100%;
      padding: 0 20px 40px;
      max-width: 600px;
    }
  }
  .map_field {
    @media (max-width: 768px) {
      display: none;
    }
    width: 100%;
    min-height: 765px;
    height: ${props => props.map_height};
  }
  .mapview_mobile {
    @media (min-width: 768px) {
      display: none;
    }
  }
  .map_field_mobile {
    @media (max-width: 768px) {
      display: none;
      &.active {
        width: 100%;
        display: block;
        position: absolute;
        top: 50px;
        max-width: 100%;
        height: 100vh;
      }
    }
  }
  .map_header {
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
`;
type MapHeightProps = { map_height?: string };
function Wishlist(map_height: MapHeightProps) {
  const size = useWindowSize();
  type Info = any | null;
  const [data, setData] = useState<Info>([]);
  const [isMap, setIsMap] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    getData('wishlist').then(res => {
      setData(res);
    });
  }, []);

useEffect(()=>{
  console.log(data);
},[data])

  return (
    <Container
      map_height={String(size.height)}
      onClick={() => dispatch(click(false))}
    >
      <div className="mapview_mobile">
        {isMap ? null : <MapViewButton setIsMap={setIsMap}></MapViewButton>}
      </div>
      <Header width_M={'100vw'}></Header>
      <MobileHeader>
        <h1>위시리스트</h1>
      </MobileHeader>
      <div className="container_flex">
        <div className="content_body">
          <div style={{ width: '100%', maxWidth: '500px' }}>
            <PageHeader
              title={'위시리스트'}
              icon={<AiOutlineHeart />}
              width="500px"
            ></PageHeader>
            <div className="card_field">
              <ContentListOnlyRow
                setIsMap={setIsMap}
                data={data}
              ></ContentListOnlyRow>
            </div>
          </div>
          <div className="map_field">
            {data&&Array.isArray(data)&&
              <MapContainer
                level={13}
                padding={'100px'}
                campList={data}
                border_rd={'0'}
              ></MapContainer>
            }
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
            {data&&Array.isArray(data)&& (
              <MapContainer
                level={12}
                padding={'200px'}
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
export default Wishlist;
