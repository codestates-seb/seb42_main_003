import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import mapMarker from '../../assets/map/map_marker.svg';
import ContentCard from '../ContentCard';
const { kakao } = window;

const MapWrapper = styled.article`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  margin: 16px;
`;

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  campList: any;
}
export function MapContainer({ campList }: MapProps) {
  let lastestMarker: any = null;
  let firstCamp: any;
  const container = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<any>(null);
  const [currentCamp, setCurrentCamp] = useState<any>(null);
  const [markerList, setMarkerList] = useState<any>([]);

  useEffect(() => {
    if (campList) firstCamp = campList[0];
    lastestMarker = null;
    // container.current=null;
    // console.log(container)
    if (container && campList) {
      // const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      let options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(
          firstCamp.mapY,
          firstCamp.mapX
        ), //지도의 중심좌표.
        level: 13, //지도의 레벨(확대, 축소 정도)
      };
      setMap(new window.kakao.maps.Map(container.current, options)); //지도 생성 및 객체 리턴
    } else if (container) {
      let options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(37.541, 126, 986), //지도의 중심좌표.
        level: 13, //지도의 레벨(확대, 축소 정도)
      };
      setMap(new window.kakao.maps.Map(container.current, options)); //지도 생성 및 객체 리턴
    }
  }, []);

  //마커 이미지 설정 변수
  const imageSizeNormal = new kakao.maps.Size(37, 50);
  const imageSizeBig = new kakao.maps.Size(60, 78);
  const markerImageNormal = new kakao.maps.MarkerImage(
    mapMarker,
    imageSizeNormal
  );
  const markerImageBig = new kakao.maps.MarkerImage(
    mapMarker,
    imageSizeBig
  );

  useEffect(() => {
    //마커 클래스 배열 생성
    if (map && campList) {
      mapReload();
      map.relayout();
      for (let camp of campList) {
        const markerPosition = new kakao.maps.LatLng(camp.mapY, camp.mapX);
        //마커 클래스 생성
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          map: map,
          image: markerImageNormal,
          clickable: true,
        });
        //호버 이벤트리스너
        kakao.maps.event.addListener(marker, 'mouseover', () => {
          if (currentCamp !== camp) {
            marker.setImage(markerImageBig);
            marker.setZIndex(999);
          }
        });
        kakao.maps.event.addListener(marker, 'mouseout', () => {
          if (lastestMarker !== marker) {
            marker.setImage(markerImageNormal);
            marker.setZIndex(1);
          }
        });
        //마커리스트
        setMarkerList((prevState: any) => {
          return [...prevState, marker];
        });
        //클릭 이벤트리스너 추가
        kakao.maps.event.addListener(marker, 'click', () => {
          console.log('clicked');
          // map.setLevel(8, {anchor: marker.getPosition(),animate: {
          //   duration:500, //확대 애니메이션 시간
          //   }});
          map.panTo(new kakao.maps.LatLng(camp.mapY, camp.mapX));
          markerSizeHandler(marker);
          setCurrentCamp(camp);
          // marker.setImage(markerImageBig)
        });
        marker.setMap(map);
      }
    }
  }, [map, campList]);

  //마커 사이즈 수정
  const markerSizeHandler = (newMarker: any) => {
    if (lastestMarker) {
      lastestMarker.setImage(markerImageNormal);
      lastestMarker.setZIndex(1);
    }
    lastestMarker = newMarker;
    newMarker.setImage(markerImageBig);
    newMarker.setZIndex(990);
  };

  //test
  useEffect(() => {
    console.log(markerList);
  }, [markerList]);

  const mapReload = () => {
    if (markerList.length >= 1) {
      for (let marker of markerList) {
        marker.setMap(null);
      }
    }
    setMarkerList([]);
  };

  return (
    <MapWrapper>
      <div
        id='map'
        ref={container}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '12px',
        }}></div>
      {currentCamp && <MapInfoContainer camp={currentCamp} />}
    </MapWrapper>
  );
}

const MapInfoWrapper=styled.div`
  width:100%;
  height: 100%;
  position:absolute;
  pointer-events:none;
  display: flex;
  justify-content: end;
  flex-direction: column;
`

function MapInfoContainer({ camp }: any) {
  const navigate = useNavigate();
  return (
    <MapInfoWrapper
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'end',
        flexDirection: 'column',
      }}>
      <div style={{ zIndex: '999', padding: '16px' }}>
        <ContentCard
          // data={camp}
          flex_dir='row'
          content_align='start'
          bottom_justify='start'
          img_width='50%'
          radius='25px 0px 0px 25px'
          line='1.2'
        />
      </div>
    </MapInfoWrapper>
  );
}

export default MapContainer;
