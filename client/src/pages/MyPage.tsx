import { useState, useEffect } from 'react';
import { MobileHeader } from '../styles/mobileStyle';
import { Modal } from '../styles/Modal';
import axios from 'axios';
import { Button } from '../styles/Button';
import MapContainer from '../components/map/MapContainer';
import { FloatButton } from '../styles/mapStyle';
import { Tab } from '../styles/Tab';
import { HiPlus, HiOutlineX } from 'react-icons/hi';
import {
  Input,
  TextArea,
  KeywordInput,
  ImageInput,
} from '../styles/Input';
import { MapGetPosition } from '../components/map/MapGetPosition';
import {
  PageMain,
  PageArticle,
  MyPageMemberInfo,
} from '../styles/pageStyle';
import ViewHistoryModal from '../components/mobile/ViewHistoryModal';
// import useUploadImage from '../hooks/useUploadImage';

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
  const [addCampModal, setAddCampModal] = useState<boolean>(false);
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false);
  //viewHistory state는 모바일에서만 사용
  const [viewHistoryModal, setViewHistoryModal] = useState<boolean>(false);
  //내부width를 기록하기 위한 state와 이벤트리스너
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener('resize', resizeListener);
  }, []);
  //width가 768px 이상이 될 경우 커뮤니티 활동기록을 자동으로 false로 바꾸는 useEffect
  useEffect(() => {
    if (innerWidth >= 768) setViewHistoryModal(false);
    console.log(innerWidth);
  }, [innerWidth]);

  const floatButtonHandler = () => {
    console.log('addCampModal true');
    setEditProfileModal(false);
    setViewHistoryModal(false);
    setAddCampModal(!addCampModal);
  };

  const editProfileHandler = () => {
    console.log('editProfileModal true');
    setAddCampModal(false);
    setViewHistoryModal(false);
    setEditProfileModal(!editProfileModal);
  };

  const viewHistoryHandler = () => {
    console.log('viewHistoryModal true');
    setAddCampModal(false);
    setEditProfileModal(false);
    setViewHistoryModal(!viewHistoryModal);
  };

  //테스트가 끝나면 아래의 props를 사용해주세요.
  // { memberData }: MyPageProps
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

  return (
    <>
      {!viewHistoryModal&&<MobileHeader>
        <h1>마이페이지</h1>
      </MobileHeader>}
      <PageMain>
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
                radius='12px'
                onClick={editProfileHandler}>
                프로필 수정
              </Button>
            </div>
            <p>{memberData.about}</p>
          </MyPageMemberInfo>
        )}
        {
          <PageArticle>
            <h2>나의 차박지</h2>
            <MyPageMapContainer floatButtonHandler={floatButtonHandler} />
          </PageArticle>
        }
        <PageArticle>
          <h2>커뮤니티</h2>
          <Button
            onClick={viewHistoryHandler}
            border={'var(--chamong__color)'}
            color={'var(--chamong__color)'}
            hcolor={'white'}
            hover={'var(--chamong__color)'}
            hborder={'var(--chamong__color)'}
            padding='13px 15px'
            radius='12px'
            width='100%'>
            커뮤니티 활동기록
          </Button>
        </PageArticle>
        <PageArticle>
          <h2>메뉴</h2>
          <Button
            border={'var(--chamong__color)'}
            color={'var(--chamong__color)'}
            hcolor={'white'}
            hover={'var(--chamong__color)'}
            hborder={'var(--chamong__color)'}
            padding='13px 15px'
            radius='12px'
            width='100%'>
            로그아웃
          </Button>
        </PageArticle>
      </PageMain>
      {addCampModal && (
        <AddCampModal floatButtonHandler={floatButtonHandler} />
      )}
      {editProfileModal && (
        <EditProfileModal editProfileHandler={editProfileHandler} />
      )}
      {viewHistoryModal && <ViewHistoryModal viewHistoryHandler={viewHistoryHandler}></ViewHistoryModal>}
      {/* <Nav></Nav> */}
    </>
  );
}

interface MyPageMapProps {
  floatButtonHandler: () => void;
}

function MyPageMapContainer({ floatButtonHandler }: MyPageMapProps) {
  const [campData, setCampData] = useState<any>(null);
  const [tabState, setTabState] = useState<number>(1);
  //campList를 이 컴포넌트에서 부를것
  const setTabHandler = (e: any) => {
    const value = Number(e.target.value);
    if (tabState !== value) setTabState(value);
  };
  useEffect(() => {
    let endpoint;
    if (tabState === 1) endpoint = 'mycamp';
    else if (tabState === 2) endpoint = 'history';
    axios({
      method: 'get',
      url: `http://localhost:3001/${endpoint}`,
    })
      .then((res) => {
        console.log(res.data);
        setCampData(res.data);
      })
      .catch((err) => console.log(err));
  }, [tabState]);
  //위의 코드는 api화 해주세요

  return (
    <div className='map-container'>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
        }}>
        <Tab height='37px' state={tabState}>
          <button value={1} onClick={setTabHandler}>
            내가 찾은 차박지
          </button>
          <button value={2} onClick={setTabHandler}>
            여행의 흔적
          </button>
        </Tab>
      </div>
      {campData && <MapContainer campList={campData} padding='16px' />}
      {tabState === 1 && (
        <FloatButton onClick={floatButtonHandler}>
          <HiPlus />
        </FloatButton>
      )}
    </div>
  );
}

interface AddCampModalProps {
  floatButtonHandler: () => void;
}

interface Themes {
  keyword: string;
  id: number;
}

function AddCampModal({ floatButtonHandler }: AddCampModalProps) {
  //내용을 저장합니다.
  const [text, setText] = useState<string>('');
  //키워드 객체를 저장합니다.
  const [keywords, setKeywords] = useState<Themes[]>([]);
  //MapGetPosition 컴포넌트로부터 클릭한 좌표를 받습니다.
  const [position, setPosition] = useState<[number, number] | null>(null);
  //MapGetPosition 컴포넌트로부터 좌표의 주소를 받습니다.
  const [address, setAddress] = useState<any>(null);
  //서버로부터 키워드 목록을 받아 추천 키워드로 띄워주는 state
  const [themes, setThemes] = useState<Themes[]>([]);
  //키워드를 눌렀을 시 포커스 효과와 키워드 목록을 띄워주는 state
  const [isKeywordFocus, setIsKeywordFocus] = useState<boolean>(false);
  //이미지를 저장하는 state
  const [fileList, setFileList] = useState<FileList | null>(null);

  //아래 useEffect는 api화 해야함------------------------------------
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3001/themes',
    })
      .then((res) => {
        console.log(res.data);
        setThemes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  //-------------------------------------------------------------------

  const postCampHandler = () => {
    console.log({
      text,
      keywords,
      position,
    });
  };

  useEffect(() => {
    console.log(position);
  }, [position]);
  useEffect(() => {
    console.log(address);
  }, [address]);

  const keywordFocusHandler = () => {
    setIsKeywordFocus(true);
  };

  const addKeywordHandler = (theme: Themes) => {
    const isRepeat = keywords.find(
      (prevTheme) => theme.id === prevTheme.id
    );
    if (keywords.length <= 2 && !isRepeat)
      setKeywords((prevState: Themes[]) => [...prevState, theme]);
  };

  const removeKeywordHandler = (theme: Themes) => {
    setKeywords((prevState: Themes[]) => {
      return [
        ...prevState.filter((prevTheme) => theme.id !== prevTheme.id),
      ];
    });
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files;
    if (selectedFile === null) return;
    if (selectedFile[0] && selectedFile[0].type.match(/(png|jpg|jpeg)$/)) {
      setFileList(selectedFile);
    } else alert('jpg, png 확장자만 가능합니다!');
  };

  const imageForSend = () => {
    if (fileList === null) return null;
    const formData = new FormData();
    formData.append('image', fileList[0]);
    return formData;
  };

  const sendImage = () => {
    const formData = imageForSend();

    axios({
      method: 'post',
      url: 'http://localhost:3002/img',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  useEffect(() => {
    if (fileList) console.log(fileList[0]);
  }, [fileList]);

  return (
    <Modal
      onClick={() => {
        setIsKeywordFocus(false);
        console.log('wat');
      }}>
      <div className='wrapper'>
        <div className='header'>
          <h2>내가 찾은 차박지</h2>
          <button onClick={floatButtonHandler}>
            <HiOutlineX />
          </button>
        </div>
        <h3>정보</h3>
        <ImageInput
          border={'var(--chamong__color)'}
          color={'var(--chamong__color)'}
          hcolor={'white'}
          hover={'var(--chamong__color)'}
          hborder={'var(--chamong__color)'}
          padding='8px 14px'
          radius='12px'>
          <label htmlFor='file'>이미지 첨부</label>
          <input type='file' id='file' onChange={handleFileChange}></input>
          {fileList && (
            <span style={{ paddingLeft: '12px' }}>{fileList[0].name}</span>
          )}
        </ImageInput>
        <button
          style={{ cursor: 'pointer', display: 'block' }}
          onClick={sendImage}>
          임시 사진보내기!
        </button>
        <Input
          value={text}
          onChange={(e: any) => setText(e.target.value)}
          placeholder='내용'
        />
        <KeywordInput
          isFocus={isKeywordFocus}
          onClick={(e) => {
            e.stopPropagation();
            setIsKeywordFocus(true);
          }}>
          {keywords.length >= 1 ? (
            <ul className='tags'>
              {keywords.map((keyword) => {
                return (
                  <li key={keyword.id} className='keyword-box'>
                    <span className='keyword-title'>
                      {keyword.keyword}
                    </span>
                    <span
                      className='box_close'
                      onClick={() => removeKeywordHandler(keyword)}>
                      &times;
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <span className='place-holder'>키워드</span>
          )}
          <div className='button-box'>
            <h3>키워드</h3>
            {themes &&
              themes.map((theme) => {
                return (
                  <Button
                    key={theme.id}
                    id={String(theme.id)}
                    onClick={() => addKeywordHandler(theme)}>
                    {theme.keyword}
                  </Button>
                );
              })}
          </div>
        </KeywordInput>
        <h3>위치</h3>
        <div className='map'>
          <MapGetPosition
            setAddress={setAddress}
            setPosition={setPosition}
          />
        </div>
        <Button
          onClick={postCampHandler}
          border={'var(--chamong__color)'}
          color={'var(--chamong__color)'}
          hcolor={'white'}
          hover={'var(--chamong__color)'}
          hborder={'var(--chamong__color)'}
          padding='13px 15px'
          radius='12px'
          width='100%'>
          작성 완료
        </Button>
      </div>
    </Modal>
  );
}

interface editProfileModalProps {
  editProfileHandler: () => void;
}

function EditProfileModal({ editProfileHandler }: editProfileModalProps) {
  return (
    <Modal>
      <div className='wrapper'>
        <div className='header'>
          <h2>프로필 수정</h2>
          <button onClick={editProfileHandler}>
            <HiOutlineX />
          </button>
        </div>
        <Input type='file' />
        <Input placeholder='이름' />
        <TextArea placeholder='자기소개' />
        <Input placeholder='내 차량' />
        <Button
          border={'var(--chamong__color)'}
          color={'var(--chamong__color)'}
          hcolor={'white'}
          hover={'var(--chamong__color)'}
          hborder={'var(--chamong__color)'}
          padding='13px 15px'
          radius='12px'
          width='100%'>
          수정 완료
        </Button>
      </div>
    </Modal>
  );
}

export default MyPage;
