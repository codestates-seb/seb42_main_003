import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import mapMarker from '../../assets/map/map_marker.svg';
import { ContentCardRow } from '../ContentCard';
import { MapWrapper, MapInfoWrapper } from '../../styles/mapStyle';
const { kakao } = window;

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  campList: any[];
  isMyPage?: boolean;
  level?: number;
  padding?: string;
  border_rd?: string;
  clickable?: boolean;
}
export function MapContainer({
  campList,
  isMyPage,
  level = 13,
  padding,
  border_rd,
  clickable = true,
}: MapProps) {
  let lastestMarker: any = null;
  const container = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<any>(null);
  const [currentCamp, setCurrentCamp] = useState<any>(null);
  const [markerList, setMarkerList] = useState<any>([]);
  useEffect(() => {
    // container.current=null;
    // console.log(container)
    let mapY = '36.38';
    let mapX = '127.51';

    if (container && campList) {
      if (campList[0]) {
        mapY = campList[0].mapY;
        mapX = campList[0].mapX;
      }
      // const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      let options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(mapY, mapX), //지도의 중심좌표.
        level: level, //지도의 레벨(확대, 축소 정도)
      };
      setMap(new window.kakao.maps.Map(container.current, options)); //지도 생성 및 객체 리턴
    }
  }, []);

  useEffect(() => {
    //마커 클래스 배열 생성
    if (map && Array.isArray(campList)) {
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

      if (Object.keys(campList).length >= 1)
        map.panTo(
          new kakao.maps.LatLng(campList[0].mapY, campList[0].mapX)
        );
      setCurrentCamp(null);
      mapReload();
      map.relayout();
      map.setMaxLevel(13);
      //마커가 아닌 지도 클릭시 currentCamp=null, 마커사이즈 초기화
      kakao.maps.event.addListener(
        map,
        'click',
        function (mouseEvent: any) {
          setCurrentCamp(null);
          if (lastestMarker) lastestMarker.setImage(markerImageNormal);
        }
      );

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
        if (clickable)
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
          map.panTo(new kakao.maps.LatLng(camp.mapY, camp.mapX));
          markerSizeHandler(marker);
          setCurrentCamp(camp);
        });
        marker.setMap(map);
      }
    }
  }, [map, campList]);

  //마커 사이즈 수정
  const markerSizeHandler = (newMarker: any) => {
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

    if (lastestMarker) {
      lastestMarker.setImage(markerImageNormal);
      lastestMarker.setZIndex(1);
    }
    lastestMarker = newMarker;
    newMarker.setImage(markerImageBig);
    newMarker.setZIndex(990);
  };

  //test
  useEffect(() => {}, [markerList]);

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
          // borderRadius: '12px',
          borderRadius: `${border_rd || '12px'}`,
        }}></div>
      {currentCamp && (
        <MapInfoContainer camp={currentCamp} padding={padding} />
      )}
    </MapWrapper>
  );
}

function MapInfoContainer({ camp, padding = '16px' }: any) {
  return (
    <MapInfoWrapper padding={padding}>
      <div>
        <ContentCardRow like={'none'} data={camp} remove='inline' />
      </div>
    </MapInfoWrapper>
  );
}

export default MapContainer;
