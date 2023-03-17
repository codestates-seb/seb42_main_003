import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MobileHeader } from '../styles/mobileStyle';
import axios from 'axios';
import { Button } from '../styles/Button';
import MapContainer from '../components/map/MapContainer';
import { MapFloatButton } from '../styles/mapStyle';
import { Tab } from '../styles/Tab';
import { HiPlus } from 'react-icons/hi';

const MyPageMain = styled.main`
  padding-bottom: 64px;
`;

const MyPageArticle = styled.article`
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #d9d9d9;
  h2 {
    font-size: var(--fs__h2);
    font-weight: 700;
    padding-bottom: 16px;
  }
  > div {
    display: flex;
  }
  .map-container {
    display: flex;
    width: 100%;
    height: 350px;
    flex-direction: column;
    align-items: center;
    position: relative;
    ${Tab} {
      position: absolute;
      z-index: 500;
      width: 270px;
      padding-top: 16px;
    }
    ${MapFloatButton} {
      position: absolute;
      z-index: 500;
      bottom:25px;
      right:25px;
    }
    @media screen and (min-width: 481px) {
      height: 450px;
    }
    @media screen and (min-width: 768px) {
      height: 600px;
    }
  }
`;

const MyPageMemberInfo = styled(MyPageArticle)`
  width: 100%;

  img {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }
  > div {
    display: flex;
    justify-content: space-between;
    > div {
      display: flex;
      align-items: center;
    }
  }
  .member-info-upper {
    padding-left: 8px;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    .member-info-nickname {
      font-size: var(--fs__h1);
      padding-bottom: 5px;
    }
  }
  button {
  }
  p {
    padding-top: 16px;
    font-size: var(--fs__mid);
  }
`;

//멤버 정보 타입
interface MemberData {
  member_id: number;
  email: string;
  nickname: string;
  profile_img: string;
  about: string;
  is_social: boolean;
  car_name: string;
  oil_info: string;
  created_at: string;
}

interface MyPageProps {
  memberData?: MemberData;
}

function MyPage() {
  //테스트가 끝나면 아래의 props를 사용해주세요.
  // { memberData }: MyPageProps
  const [myCampData, setMyCampData] = useState<any>(null);
  //테스트가 끝나면 아래의 코드를 지워주세요.
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  useEffect(() => {
    if (!memberData) {
      axios({
        method: 'get',
        url: 'http://localhost:3001/member',
      })
        .then((res) => {
          setMemberData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  //테스트가 끝나면 위의 코드를 지워주세요.

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3001/camp/cut1',
    })
      .then((res) => {
        console.log(res.data);
        setMyCampData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <MobileHeader>
        <h1>마이페이지</h1>
      </MobileHeader>
      <MyPageMain>
        {memberData && (
          <MyPageMemberInfo>
            <h2>나의 프로필</h2>
            <div>
              <div>
                <img src={memberData.profile_img} alt='profile-img'></img>
                <div className='member-info-upper'>
                  <span className='member-info-nickname'>
                    {memberData.nickname}
                  </span>
                  <span className='member-info-car'>
                    {memberData.car_name}
                  </span>
                </div>
              </div>
              <Button
                border={'var(--chamong__color)'}
                color={'var(--chamong__color)'}
                hcolor={'white'}
                hover={'var(--chamong__color)'}
                hborder={'var(--chamong__color)'}
                padding='13px 15px'
                radius='12px'>
                프로필 수정
              </Button>
            </div>
            <p>{memberData.about}</p>
          </MyPageMemberInfo>
        )}
        {
          <MyPageArticle>
            <h2>나의 차박지</h2>
            {myCampData && <MyPageMapContainer campList={myCampData} />}
          </MyPageArticle>
        }
        <MyPageArticle>
          <h2>커뮤니티</h2>
          <Button
            border={'var(--chamong__color)'}
            color={'var(--chamong__color)'}
            hcolor={'white'}
            hover={'var(--chamong__color)'}
            hborder={'var(--chamong__color)'}
            padding='13px 15px'
            radius='12px'>
            커뮤니티 활동기록
          </Button>
        </MyPageArticle>
        <MyPageArticle>
          <h2>메뉴</h2>
          <Button
            border={'var(--chamong__color)'}
            color={'var(--chamong__color)'}
            hcolor={'white'}
            hover={'var(--chamong__color)'}
            hborder={'var(--chamong__color)'}
            padding='13px 15px'
            radius='12px'>
            로그아웃
          </Button>
        </MyPageArticle>
      </MyPageMain>
    </div>
  );
}

function MyPageMapContainer({ campList }: any) {
  return (
    <div className='map-container'>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
        }}>
        <Tab height='37px'>
          <button>내가 찾은 차박지</button>
          <button>여행의 흔적</button>
        </Tab>
      </div>
      <MapContainer campList={campList} />
      <MapFloatButton>
        <HiPlus />
      </MapFloatButton>
    </div>
  );
}

export default MyPage;
