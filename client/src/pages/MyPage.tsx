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
import { getDataTs, sendDataTs, sendFormDataTs, logoutTs } from '../api/tsapi';
import { Post } from '../components/Review';
import { HistoryContainer } from '../components/HistoryContainer';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTK';
import { logout } from '../store/isLoginSlice';
import DeleteMemberModal from '../components/DeleteMemberModal';
import { useWindowSize } from '../hooks/useWindowSize';

const themes = [
  '화장실',
  '산',
  '강',
  '섬',
  '숲',
  '호수',
  '해변',
  '와이파이',
  '전기',
  '운동시설',
  '물놀이',
  '마트',
  '편의점',
  '체험활동',
  '낚시',
  '반려동물',
];

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
  const {width}=useWindowSize();
  const [addCampModal, setAddCampModal] = useState<boolean>(false);
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false);
  //viewHistory state는 모바일에서만 사용
  const [viewHistoryModal, setViewHistoryModal] = useState<boolean>(false);
  const [deleteMemberModal,setDeleteMemberModal]=useState(false);
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

  const [reloadData, setReloadData] = useState(false);
  const reloadHandler = () => setReloadData(!reloadData);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLogin = useAppSelector(state => state.isLogin);
  // console.log(isLogin)

  useEffect(() => {
    if (!isLogin) navigate('/error');
    //실제 서버 테스트때는 members/mypage로 바꿔야 합니다.
    getDataTs('members/mypage').then(data => {
      setMemberInfo(data.memberInfo);
      setMyPlaceInfos(data.myPlaceInfos);
      setVisitedPlaceInfos(data.visitedPlaceInfos);
      setWrittenArticleInfos(data.writtenArticleInfos);
      setCommentedArticleInfos(data.commentedArticleInfos);
      setLikedArticleInfos(data.likedArticleInfos);
    });
  }, [reloadData]);
  //width가 768px 이상이 될 경우 커뮤니티 활동기록을 자동으로 false로 바꾸는 useEffect
  useEffect(() => {
    if (width >= 768) setViewHistoryModal(false);
  }, [width]);

  const floatButtonHandler = () => {
    setEditProfileModal(false);
    setViewHistoryModal(false);
    setDeleteMemberModal(false);
    setAddCampModal(!addCampModal);
  };

  const editProfileHandler = () => {
    setAddCampModal(false);
    setViewHistoryModal(false);
    setDeleteMemberModal(false);
    setEditProfileModal(!editProfileModal);
  };

  const viewHistoryHandler = () => {
    setAddCampModal(false);
    setEditProfileModal(false);
    setDeleteMemberModal(false);
    setViewHistoryModal(!viewHistoryModal);
  };

  const deleteMemberHandler = () => {
    setAddCampModal(false);
    setEditProfileModal(false);
    setViewHistoryModal(false);
    setDeleteMemberModal(!deleteMemberModal);
  };

  const logoutHandler = () => {
    logoutTs()
      .then(() => {
        dispatch(logout());
        alert('정상적으로 로그아웃 되었습니다.');
        navigate('/');
      })
      .catch(err => {
        dispatch(logout());
        navigate('/');
      });
  };

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
                <img
                  src={memberInfo.profileImg}
                  alt="profile-img"
                  className="profile-img"
                ></img>
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
            onClick={logoutHandler}
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
        </PageArticle>
        <PageArticle>
          <h2>회원관리</h2>
          <Button
            onClick={deleteMemberHandler}
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
      {addCampModal && (
        <AddCampModal
          floatButtonHandler={floatButtonHandler}
          reloadHandler={reloadHandler}
        />
      )}
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
      {deleteMemberModal && (
        <DeleteMemberModal
          deleteMemberHandler={deleteMemberHandler}
        ></DeleteMemberModal>
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
  reloadHandler: () => void;
}

function AddCampModal({
  floatButtonHandler,
  reloadHandler,
}: AddCampModalProps) {
  //내용을 저장합니다.
  const [memo, setMemo] = useState<string>('');
  //키워드 객체를 저장합니다.
  const [keywords, setKeywords] = useState<string[]>([]);
  //MapGetPosition 컴포넌트로부터 클릭한 좌표를 받습니다.
  const [position, setPosition] = useState<[number, number] | null>(null);
  //MapGetPosition 컴포넌트로부터 좌표의 주소를 받습니다.
  const [address, setAddress] = useState<any>(null);
  //서버로부터 키워드 목록을 받아 추천 키워드로 띄워주는 state
  // const [themes, setThemes] = useState<Themes[]>([]);
  //키워드를 눌렀을 시 포커스 효과와 키워드 목록을 띄워주는 state
  const [isKeywordFocus, setIsKeywordFocus] = useState<boolean>(false);
  //이미지를 저장하는 state
  // const [fileList, setFileList] = useState<FileList | null>(null);
  const { image, imageSrc, imageChange, imageDelete } = useUploadImage();
  const [errorMessage, setErrorMessage] = useState({
    memo: '',
    position: '',
    submit: '',
  });

  //address 필드 추가가 필요함
  console.log(image);
  const postCampHandler = () => {
    if (isInputEmpty()) return;
    if (!position) return;
    const data = {
      memo,
      keywords,
      mapY: Number(position[0]),
      mapX: Number(position[1]),
      address
    };
    sendFormDataTs(
      'pick-places',
      'post',
      data,
      image,
      'postMyPlace',
      'placeImg'
    )
      .then(() => {
        reloadHandler();
        floatButtonHandler();
      })
      .catch(err =>
        setErrorMessage(prevState => {
          return {
            ...prevState,
            submit: `등록에 실패했습니다. (${err.response.status})`,
          };
        })
      );
  };

  const addKeywordHandler = (theme: string) => {
    const isRepeat = keywords.find(prevTheme => '#' + theme === prevTheme);
    if (keywords.length <= 2 && !isRepeat)
      setKeywords((prevState: string[]) => [...prevState, '#' + theme]);
  };

  const removeKeywordHandler = (theme: string) => {
    setKeywords((prevState: string[]) => {
      return [...prevState.filter(prevTheme => !prevTheme.includes(theme))];
    });
  };

  const isInputEmpty = () => {
    let pass = true;
    if (!memo) {
      pass = false;
      setErrorMessage(prevState => {
        return { ...prevState, memo: '이름을 지정해주세요.' };
      });
    } else
      setErrorMessage(prevState => {
        return { ...prevState, memo: '' };
      });
    if (!position) {
      pass = false;
      setErrorMessage(prevState => {
        return { ...prevState, position: '위치를 지정해주세요.' };
      });
    } else
      setErrorMessage(prevState => {
        return { ...prevState, position: '' };
      });
    if (position && !address) {
      console.log('위치 오류');
      pass = false;
      setErrorMessage(prevState => {
        return { ...prevState, position: '정상적인 위치가 아닙니다.' };
      });
    } else if (position)
      setErrorMessage(prevState => {
        return { ...prevState, position: '' };
      });

  return (
    <Modal
    maxWidth='600px'
      onClick={() => {
        setIsKeywordFocus(false);
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
          placeholder="이름"
        />
        {errorMessage.memo && !memo && (
          <span className="error-message">{errorMessage.memo}</span>
        )}
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
                  <li key={keyword} className="keyword-box">
                    <span className="keyword-title">{keyword}</span>
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
                    key={theme}
                    id={theme}
                    onClick={() => addKeywordHandler(theme)}
                  >
                    {theme}
                  </Button>
                );
              })}
          </div>
        </KeywordInput>
        <h3>위치</h3>
        <div className="map">
          <MapGetPosition setAddress={setAddress} setPosition={setPosition} />
        </div>
        {errorMessage.position && !address && (
          <span className="error-message">{errorMessage.position}</span>
        )}
        <Button
          onClick={postCampHandler}
          border={'var(--chamong__color)'}
          color={'white'}
          bg={'var(--chamong__color)'}
          hcolor={'var(--chamong__color)'}
          hover={'white'}
          hborder={'var(--chamong__color)'}
          padding="13px 15px"
          radius="12px"
          width="100%"
        >
          작성 완료
        </Button>
        {errorMessage.submit && (
          <span className="error-message">{errorMessage.submit}</span>
        )}
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
  const [isPhotoEdit,setIsPhotoEdit]=useState(false);
  const [nickname, setNickname] = useState(memberInfo.nickname);
  const [about, setAbout] = useState(memberInfo.about);
  const [carName, setCarName] = useState(memberInfo.carName);
  const [oilInfo, setOilInfo] = useState(memberInfo.oilInfo);
  const [errorMessage, setErrorMessage] = useState({
    nickname: '',
    carName: '',
    about: '',
    submit: '',
  });

  const profileSubmitHandler = () => {
    const data = { nickname, about, carName, oilInfo };
    if(isInputEmpty()) return;
    sendFormDataTs(
      'members',
      'patch',
      data,
      image,
      'memberUpdate',
      'profileImg'
    )
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setErrorMessage(prevState => {
          return { ...prevState, submit: '프로필 수정이 실패했습니다.' };
        });
      });
  };

  const isInputEmpty = () => {
    let pass = true;
    if (!nickname) {
      console.log('닉네임 없음');
      pass = false;
      setErrorMessage(prevState => {
        return { ...prevState, nickname: '닉네임을 입력해주세요.' };
      });
    } else
      setErrorMessage(prevState => {
        return { ...prevState, nickname: '' };
      });
    if (!about) {
      pass = false;
      setErrorMessage(prevState => {
        return { ...prevState, about: '자기소개를 입력해주세요.' };
      });
    } else
      setErrorMessage(prevState => {
        return { ...prevState, about: '' };
      });
    if (!carName) {
      pass = false;
      setErrorMessage(prevState => {
        return { ...prevState, carName: '차량 정보를 입력해주세요.' };
      });
    } else
      setErrorMessage(prevState => {
        return { ...prevState, carName: '' };
      });

  return (
    <Modal maxWidth='600px'>
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
          {imageSrc.length >= 1 || !isPhotoEdit ? (
            <div className="preview">
              <img alt="preview" src={isPhotoEdit?imageSrc:memberInfo.profileImg}></img>
              <button onClick={()=>{
                if(isPhotoEdit) imageDelete();
                else {
                  setIsPhotoEdit(true);
                }
                }}>       
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
        {errorMessage.nickname && (
          <span className="error-message">{errorMessage.nickname}</span>
        )}
        <TextArea
          placeholder="자기소개"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setAbout(e.target.value)
          }
          value={about}
        />
        {errorMessage.about && (
          <span className="error-message">{errorMessage.about}</span>
        )}
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
        {errorMessage.carName && (
          <span className="error-message">{errorMessage.carName}</span>
        )}
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
        {errorMessage.submit && (
          <span className="error-message">{errorMessage.submit}</span>
        )}
      </div>
    </Modal>
  );
}

export default MyPage
