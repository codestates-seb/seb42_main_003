import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { MapWrapper, MapInfoWrapper } from '../../styles/mapStyle';
import mapMarker from '../../assets/map/map_marker.svg';
const { kakao } = window;

declare global {
  interface Window {
    kakao: any;
  }
}

interface GetPositionProps {
  setPosition: React.Dispatch<
    React.SetStateAction<[number, number] | null>
  >;
  setAddress: (T: string|null) => void;
}

export function MapGetPosition({ setPosition,setAddress }: GetPositionProps) {
  var geocoder = new kakao.maps.services.Geocoder();
  let marker: any = null;
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

  const getAddressCallback = (result: any) => {
    try {
      setAddress(result[0].address.address_name)
    }
    catch {
      console.log('error address')
      setAddress(null)
    }
  };

  const mapClickHandler = (mouseEvent: any) => {
    let latlng = mouseEvent.latLng;

    // 마커 위치를 클릭한 위치로 옮깁니다
    marker.setPosition(latlng);
    marker.setMap(map);
    map.panTo(new kakao.maps.LatLng(latlng.getLat(), latlng.getLng()));
    geocoder.coord2Address(latlng.getLng(), latlng.getLat(),getAddressCallback);
    setPosition([latlng.getLat(), latlng.getLng()]);
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
    </MapWrapper>
  );
}
