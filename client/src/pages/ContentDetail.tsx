import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getContent } from '../api/api';
import { FiArrowLeft } from 'react-icons/fi';
import { FaRestroom } from 'react-icons/fa';
import { SiForestry } from 'react-icons/si';
import { BiWater } from 'react-icons/bi';
import { BsWifi } from 'react-icons/bs';
import { MdElectricBolt } from 'react-icons/md';
import { BiStore } from 'react-icons/bi';
import { TbDog } from 'react-icons/tb';
import { FaFish } from 'react-icons/fa';
import { GiIsland } from 'react-icons/gi';
import MapContainer from '../components/map/MapContainer';
import { Button } from '../styles/Button';
import Review from '../components/Review';

interface ContentInfo {
  bg?: URL;
  height?: string;
}

const Container = styled('div')<ContentInfo>`
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    padding: 10px 15px 10px 15px;
  }
  .title {
    font-size: 22px;
    font-weight: 500;
  }
  .heart {
    width: 30px;
    stroke-width: 2px;
    z-index: 1;
    fill: var(--fontBlack__100);
  }
  .active {
    width: 30px;
    stroke-width: 2px;
    z-index: 1;
    fill: var(--chamong__color);
    fill-opacity: 1;
  }
  .backimg {
    background-image: ${props => `url(${props.bg})`};
    width: 100%;
    height: ${props => props.height || '300px'};
    background-color: black;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  }
  .keyword_icon {
    display: grid;
    gap: 17px 12px;
    @media (max-width: 768px) {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }
  .icon {
    font-size: 50px;
    width: 100%;
    color: var(--fontBlack__700);
    border: 1px solid white;
    border-radius: 16px;
    padding: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
  .icon_name {
    text-align: center;
    font-size: 12px;
    margin-top: 5px;
  }
  .review_top {
    display: flex;
  }
  h1 {
    font-size: var(--fs__h2);
    color: var(--fontBlack__700);
    font-weight: 600;
    margin-bottom: 12px;
  }
  .info {
    border-top: 3px solid var(--searchbar__color);
    padding: 20px 15px;
  }
  .adress {
    padding: 15px;
  }
  .slice {
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
  .all {
    line-height: 1.2;
  }
  .review_top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 12px;
  }
  .back {
    font-size: 35px;
  }
`;

export function ContentDetail({}: ContentInfo) {
  const [isContinue, setIsContinue] = useState(false);
  const [isContent, setIsContent] = useState<any>({});
  const [isLike, setIsLike] = useState(false);
  useEffect(() => {
    getContent().then(res => setIsContent(res[10]));
  }, []);
  console.log(isContinue);
  return (
    <Container bg={isContent.firstImageUrl}>
      <div className="header">
        <FiArrowLeft className="back" />
        <div className="title">{isContent.facltNm}</div>
        <svg
          viewBox="0 0 24 24"
          className={!isLike ? 'heart' : 'active'}
          fill="none"
          onClick={() => setIsLike(!isLike)}
        >
          <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" />
        </svg>
      </div>

      <div className="backimg"></div>
      <div className="adress">
        <h1>주소</h1>
        <p>{isContent.addr1}</p>
      </div>
      <div className="info">
        <h1>장소 소개</h1>
        <p className={isContinue ? 'all' : 'slice'}>
          {isContent.intro ? isContent.intro : `${isContent.facltNm}입니다.`}
        </p>
        {isContent.intro && isContent.intro.length > 153 && !isContinue ? (
          <Button
            onClick={() => setIsContinue(!isContinue)}
            border="var(--chamong__color)"
            color="var(--chamong__color)"
            margin="12px 0px 10px 0px"
            width="100%"
          >
            계속 보기
          </Button>
        ) : null}
      </div>
      <div className="info">
        <h1>키워드</h1>
        <div className="keyword_icon">
          <div className="icon_box">
            <FaRestroom className="icon" />
            <p className="icon_name">화장실</p>
          </div>
          <div className="icon_box">
            <SiForestry className="icon" />
            <p className="icon_name">숲뷰</p>
          </div>
          <div className="icon_box">
            <BiWater className="icon" />
            <p className="icon_name">물멍</p>
          </div>
          <div className="icon_box">
            <BsWifi className="icon" />
            <p className="icon_name">와이파이</p>
          </div>
          <div className="icon_box">
            <MdElectricBolt className="icon" />
            <p className="icon_name">전기</p>
          </div>
          <div className="icon_box">
            <BiStore className="icon" />
            <p className="icon_name">마트</p>
          </div>
          <div className="icon_box">
            <TbDog className="icon" />
            <p className="icon_name">애견동반</p>
          </div>
          <div className="icon_box">
            <FaFish className="icon" />
            <p className="icon_name">낚시</p>
          </div>
          <div className="icon_box">
            <GiIsland className="icon" />
            <p className="icon_name">섬</p>
          </div>
        </div>
      </div>
      <div className="info">
        <h1>지도</h1>
        {/* <MapContainer campList={[isContent]}></MapContainer> */}
      </div>
      <div className="info">
        <div className="review_box">
          <div className="review_top">
            <h1>리뷰 {isContent.contentId}</h1>
            <Button
              margin="-5px 0"
              padding="9px 15px"
              border="var(--chamong__color)"
              color="var(--chamong__color)"
            >
              작성
            </Button>
          </div>
          <Review></Review>
        </div>
      </div>
    </Container>
  );
}
