import { useState, useEffect } from 'react';
import { MobileHeader } from '../styles/mobileStyle';
import { Modal } from '../styles/Modal';
import axios from 'axios';
import { Button } from '../styles/Button';
import MapContainer from '../components/map/MapContainer';
import { FloatButton } from '../styles/mapStyle';
import { Tab } from '../styles/Tab';
import Header from '../components/destop/Header';
import Footer from '../components/destop/Footer';
import { HiPlus, HiOutlineX } from 'react-icons/hi';
import {
  Input,
  TextArea,
  KeywordInput,
  ImageInput,
  Select,
  ErrorMessage,
} from '../styles/Input';
import { MapGetPosition } from '../components/map/MapGetPosition';
import { PageMain, PageArticle, MyPageMemberInfo } from '../styles/pageStyle';
import ViewHistoryModal from '../components/mobile/ViewHistoryModal';
import useUploadImage from '../hooks/useUploadImage';
import { getDataTs, sendDataTs, sendFormDataTs } from '../api/tsapi';
import { Post } from '../components/Review';
import { HistoryContainer } from '../components/HistoryContainer';
import { useNavigate } from 'react-router-dom';

//myPlaceInfos 내부 객체
interface MyPlaceInfo {
  id: number;
  memo: string;
  keyword: string[];
  mapX: string;
  mapY: string;
  createdAt: string;
  updatedAt: string;
  placeImg: string;
  memberId: number;
  isShared: boolean;
}

interface VisitedPlaceInfo {
  id: number;
  memberId: number;
  facltNm: string;
  lineIntro: string;
  addr1: string;
  firstImageUrl: string;
  mapX: string;
  mapY: string;
  createdAt: string;
  updatedAt: string;
}

/* 객체: (키, 값) imageName: string. imageChange: 함수 , imageForSend: 함수 */
/* 배열: [string, 함수, 함수]  */

function MyPage() {
  const [addCampModal, setAddCampModal] = useState<boolean>(false);
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false);
  //viewHistory state는 모바일에서만 사용
  const [viewHistoryModal, setViewHistoryModal] = useState<boolean>(false);
  //내부width를 기록하기 위한 state와 이벤트리스너
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [memberInfo, setMemberInfo] = useState<MemberInfo>();
  const [myPlaceInfos, setMyPlaceInfos] = useState<MyPlaceInfo[] | null>(null);
  const [visitedPlaceInfos, setVisitedPlaceInfos] = useState<
    VisitedPlaceInfo[] | null
  >(null);
  const [writtenArticleInfos, setWrittenArticleInfos] = useState<
    ArticleType[] | null
  >(null);
  const [commentedArticleInfos, setCommentedArticleInfos] = useState<
    ArticleType[] | null
  >(null);
  const [likedArticleInfos, setLikedArticleInfos] = useState<
    ArticleType[] | null
  >(null);

  useEffect(() => {
    //실제 서버 테스트때는 members/mypage로 바꿔야 합니다.
    getDataTs('members/mypage').then(data => {
      setMemberInfo(data.memberInfo[0]);
      setMyPlaceInfos(data.myPlaceInfos);
      setVisitedPlaceInfos(data.visitedPlaceInfos);
      setWrittenArticleInfos(data.writtenArticleInfos);
      setCommentedArticleInfos(data.commentedArticleInfos);
      setLikedArticleInfos(data.likedArticleInfos);
    });

    //브라우저 width 변경을 감지하는 이벤트 리스너
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener('resize', resizeListener);
  }, []);
  //width가 768px 이상이 될 경우 커뮤니티 활동기록을 자동으로 false로 바꾸는 useEffect
  useEffect(() => {
    if (innerWidth >= 768) setViewHistoryModal(false);
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

  useEffect(() => {
    if (memberInfo) console.log(memberInfo.about);
  }, [memberInfo]);

  //테스트가 끝나면 아래의 코드를 지워주세요.
  // useEffect(() => {
  //   if (!memberInfo) {
  //     axios({
  //       method: 'get',
  //       url: 'http://localhost:3001/member',
  //     })
  //       .then(res => {
  //         setmemberInfo(res.data);
  //       })
  //       .catch(err => console.log(err));
  //   }
  // }, []);
  //테스트가 끝나면 위의 코드를 지워주세요.

  return (
    <>
      <Header width_M={'1000px'}></Header>
      {!viewHistoryModal && (
        <MobileHeader>
          <h1>마이페이지</h1>
        </MobileHeader>
      )}
      <PageMain>
        {memberInfo && (
          <MyPageMemberInfo>
            <h2>나의 프로필</h2>
            <div className="flex-div">
              <div>
                <img src={memberInfo.profileImg} alt="profile-img"></img>
                <div className="member-info-upper">
                  <span className="member-info-nickname">
                    {memberInfo.nickname}
                  </span>
                  <span className="member-info-car">
                    {memberInfo.carName} / {memberInfo.oilInfo}
                  </span>
                  <span className="member-info-about-desktop">
                    {memberInfo.about}
                  </span>
                </div>
              </div>
              <Button
                border={'var(--chamong__color)'}
                color={'var(--chamong__color)'}
                hcolor={'white'}
                hover={'var(--chamong__color)'}
                hborder={'var(--chamong__color)'}
                padding="13px 15px"
                radius="12px"
                onClick={editProfileHandler}
              >
                프로필 수정
              </Button>
            </div>
            <p className="member-info-about-mobile">{memberInfo.about}</p>
          </MyPageMemberInfo>
        )}
        {
          <PageArticle>
            <h2>나의 차박지</h2>
            <MyPageMapContainer
              floatButtonHandler={floatButtonHandler}
              myPlaceInfos={myPlaceInfos}
              visitedPlaceInfos={visitedPlaceInfos}
            />
          </PageArticle>
        }
        <PageArticle>
          <h2>커뮤니티</h2>
          <div className="mobile-only">
            <Button
              onClick={viewHistoryHandler}
              border={'var(--chamong__color)'}
              color={'var(--chamong__color)'}
              hcolor={'white'}
              hover={'var(--chamong__color)'}
              hborder={'var(--chamong__color)'}
              padding="13px 15px"
              radius="12px"
              width="100%"
            >
              커뮤니티 활동기록
            </Button>
          </div>
          <div className="history-wrapper">
            <div className="history">
              <h4>내가 쓴 글</h4>
              <HistoryContainer history={writtenArticleInfos} />
            </div>
            <div className="history">
              <h4>내가 댓글 단 글</h4>
              <HistoryContainer history={commentedArticleInfos} />
            </div>
            <div className="history">
              <h4>내가 좋아요 누른 글</h4>
              <HistoryContainer history={likedArticleInfos} />
            </div>
          </div>
        </PageArticle>
        <PageArticle>
          <h2>메뉴</h2>
          <Button
            border={'var(--chamong__color)'}
            color={'var(--chamong__color)'}
            hcolor={'white'}
            hover={'var(--chamong__color)'}
            hborder={'var(--chamong__color)'}
            padding="13px 15px"
            radius="12px"
            width="100%"
          >
            로그아웃
          </Button>
          <Button
            border={'var(--chamong__color)'}
            color={'var(--chamong__color)'}
            hcolor={'white'}
            hover={'var(--chamong__color)'}
            hborder={'var(--chamong__color)'}
            padding="13px 15px"
            radius="12px"
            width="100%"
          >
            회원탈퇴
          </Button>
        </PageArticle>
      </PageMain>
      {addCampModal && <AddCampModal floatButtonHandler={floatButtonHandler} />}
      {editProfileModal && memberInfo && (
        <EditProfileModal
          editProfileHandler={editProfileHandler}
          memberInfo={memberInfo}
        />
      )}
      {viewHistoryModal && (
        <ViewHistoryModal
          viewHistoryHandler={viewHistoryHandler}
          writtenArticleInfos={writtenArticleInfos}
          commentedArticleInfos={commentedArticleInfos}
          likedArticleInfos={likedArticleInfos}
        ></ViewHistoryModal>
      )}
      {/* <Nav></Nav> */}
      <Footer></Footer>
    </>
  );
}

interface MyPageMapProps {
  floatButtonHandler: () => void;
  myPlaceInfos: MyPlaceInfo[] | null;
  visitedPlaceInfos: VisitedPlaceInfo[] | null;
}

function MyPageMapContainer({
  floatButtonHandler,
  myPlaceInfos,
  visitedPlaceInfos,
}: MyPageMapProps) {
  const [tabState, setTabState] = useState<number>(1);
  //campList를 이 컴포넌트에서 부를것
  const setTabHandler = (e: any) => {
    const value = Number(e.target.value);
    if (tabState !== value) setTabState(value);
  };

  return (
    <div className="map-container">
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
        }}
      >
        <Tab height="37px" state={tabState}>
          <button value={1} onClick={setTabHandler}>
            내가 찾은 차박지
          </button>
          <button value={2} onClick={setTabHandler}>
            여행의 흔적
          </button>
        </Tab>
      </div>
      {myPlaceInfos && visitedPlaceInfos && (
        <MapContainer
          campList={tabState === 1 ? myPlaceInfos : visitedPlaceInfos}
          padding="16px"
        />
      )}
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
  const navigate = useNavigate();
  //내용을 저장합니다.
  const [memo, setMemo] = useState<string>('');
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
  // const [fileList, setFileList] = useState<FileList | null>(null);
  const { imageSrc, imageChange, imageFormData, imageDelete } =
    useUploadImage();

  const postCampHandler = () => {
    if (!position) return;
    const data = {
      memo,
      keywords,
      mapY: position[0],
      mapX: position[1],
      address,
    };
    sendDataTs('pick-places', 'post', data).then(() => navigate('/mypage'));
  };
  const keywordFocusHandler = () => {
    setIsKeywordFocus(true);
  };

  const addKeywordHandler = (theme: Themes) => {
    const isRepeat = keywords.find(prevTheme => theme.id === prevTheme.id);
    if (keywords.length <= 2 && !isRepeat)
      setKeywords((prevState: Themes[]) => [...prevState, theme]);
  };

  const removeKeywordHandler = (theme: Themes) => {
    setKeywords((prevState: Themes[]) => {
      return [...prevState.filter(prevTheme => theme.id !== prevTheme.id)];
    });
  };

  return (
    <Modal
      onClick={() => {
        setIsKeywordFocus(false);
        console.log('wat');
      }}
    >
      <div className="wrapper">
        <div className="header">
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
          padding="8px 14px"
          radius="12px"
        >
          {imageSrc.length >= 1 ? (
            <div className="preview">
              <img alt="preview" src={imageSrc}></img>
              <button onClick={imageDelete}>
                <HiOutlineX />
              </button>
            </div>
          ) : (
            <label htmlFor="file">이미지 첨부</label>
          )}
          <input type="file" id="file" onChange={imageChange}></input>
        </ImageInput>
        <Input
          value={memo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMemo(e.target.value)
          }
          placeholder="내용"
        />
        <KeywordInput
          isFocus={isKeywordFocus}
          onClick={e => {
            e.stopPropagation();
            setIsKeywordFocus(true);
          }}
        >
          {keywords.length >= 1 ? (
            <ul className="tags">
              {keywords.map(keyword => {
                return (
                  <li key={keyword.id} className="keyword-box">
                    <span className="keyword-title">{keyword.keyword}</span>
                    <span
                      className="box_close"
                      onClick={() => removeKeywordHandler(keyword)}
                    >
                      &times;
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <span className="place-holder">키워드</span>
          )}
          <div className="button-box">
            <h3>키워드</h3>
            {themes &&
              themes.map(theme => {
                return (
                  <Button
                    key={theme.id}
                    id={String(theme.id)}
                    onClick={() => addKeywordHandler(theme)}
                  >
                    {theme.keyword}
                  </Button>
                );
              })}
          </div>
        </KeywordInput>
        <h3>위치</h3>
        <div className="map">
          <MapGetPosition setAddress={setAddress} setPosition={setPosition} />
        </div>
        <Button
          onClick={postCampHandler}
          border={'var(--chamong__color)'}
          color={'var(--chamong__color)'}
          hcolor={'white'}
          hover={'var(--chamong__color)'}
          hborder={'var(--chamong__color)'}
          padding="13px 15px"
          radius="12px"
          width="100%"
        >
          작성 완료
        </Button>
      </div>
    </Modal>
  );
}

interface editProfileModalProps {
  editProfileHandler: () => void;
  memberInfo: MemberInfo;
}

function EditProfileModal({
  editProfileHandler,
  memberInfo,
}: editProfileModalProps) {
  const { image, imageSrc, imageChange, imageDelete } = useUploadImage();

  const [nickname, setNickname] = useState(memberInfo.nickname);
  const [about, setAbout] = useState(memberInfo.about);
  const [carName, setCarName] = useState(memberInfo.carName);
  const [oilInfo, setOilInfo] = useState(memberInfo.oilInfo);

  const profileSubmitHandler = () => {
    const data = { nickname, about, carName, oilInfo };
    sendFormDataTs('members', 'patch', data, image).then(editProfileHandler);
  };

  return (
    <Modal>
      <div className="wrapper">
        <div className="header">
          <h2>프로필 수정</h2>
          <button onClick={editProfileHandler}>
            <HiOutlineX />
          </button>
        </div>
        <ImageInput
          border={'var(--chamong__color)'}
          color={'var(--chamong__color)'}
          hcolor={'white'}
          hover={'var(--chamong__color)'}
          hborder={'var(--chamong__color)'}
          padding="8px 14px"
          radius="12px"
        >
          {imageSrc.length >= 1 ? (
            <div className="preview">
              <img alt="preview" src={imageSrc}></img>
              <button onClick={imageDelete}>
                <HiOutlineX />
              </button>
            </div>
          ) : (
            <label htmlFor="file">프로필 이미지 등록</label>
          )}
          <input type="file" id="file" onChange={imageChange}></input>
        </ImageInput>
        <Input
          placeholder="이름"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNickname(e.target.value)
          }
          value={nickname}
        />
        <TextArea
          placeholder="자기소개"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setAbout(e.target.value)
          }
          value={about}
        />
        <div style={{ display: 'flex' }}>
          <Input
            placeholder="내 차량"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCarName(e.target.value)
            }
            value={carName}
          />
          <Select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setOilInfo(e.target.value)
            }
            value={oilInfo}
          >
            <option value="휘발유">휘발유</option>
            <option value="경유">경유</option>
            <option value="LPG">LPG</option>
            <option value="전기">전기</option>
            <option value="수소">수소</option>
          </Select>
        </div>
        <Button
          border={'var(--chamong__color)'}
          color={'white'}
          bg={'var(--chamong__color)'}
          hcolor={'var(--chamong__color)'}
          hover={'white'}
          hborder={'var(--chamong__color)'}
          padding="13px 15px"
          radius="12px"
          width="100%"
          onClick={profileSubmitHandler}
        >
          수정 완료
        </Button>
      </div>
    </Modal>
  );
}

export default MyPage;
