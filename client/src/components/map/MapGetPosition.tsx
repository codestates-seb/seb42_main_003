import { useState, useEffect, useRef } from 'react';
import { MapWrapper, MapInfoWrapper } from '../../styles/mapStyle';
import mapMarker from '../../assets/map/map_marker.svg';
const { kakao } = window;

declare global {
  interface Window {
    kakao: any;
  }
}

export function MapGetPosition() {
  let marker: any = null;

  const [position, setPosition] = useState<number[] | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    if (container) {
      let options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(36.38, 127.51), //지도의 중심좌표.
        level: 13, //지도의 레벨(확대, 축소 정도)
      };
      setMap(new window.kakao.maps.Map(container.current, options)); //지도 생성 및 객체 리턴
    }
  }, []);

  useEffect(() => {
    if (map) {
      setMarkerHandler();
      kakao.maps.event.addListener(
        map,
        'click',
        function (mouseEvent: any) {
          mapClickHandler(mouseEvent);
        }
      );
    }
  }, [map]);

  const setMarkerHandler = () => {
    const imageSizeNormal = new kakao.maps.Size(37, 50);
    const markerImageNormal = new kakao.maps.MarkerImage(
      mapMarker,
      imageSizeNormal
    );

    marker = new kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다
      position: map.getCenter(),
      image: markerImageNormal,
    });
  };

  const mapClickHandler = (mouseEvent: any) => {
    let latlng = mouseEvent.latLng;

    // 마커 위치를 클릭한 위치로 옮깁니다
    marker.setPosition(latlng);
    marker.setMap(map);
    setPosition([latlng.getLat(), latlng.getLng()]);
  };

  //test
  useEffect(() => {
    if (position) {
      console.log(position);
      map.panTo(new kakao.maps.LatLng(position[0],position[1]));
    }
  }, [position]);

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
    </MapWrapper>
  );
}
