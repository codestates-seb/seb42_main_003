import styled from 'styled-components';
import HeaderSearch from '../HeaderSearch';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTK';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Login from '../Login';
import logo from '../../assets/logo/logo_mascot.svg';
import chamong from '../../assets/logo/logo_kor.svg';
import { useLocation } from 'react-router-dom';
import { navNumber } from '../../store/navSlice';
import { Button } from '../../styles/Button';

interface SearchState {
  width_M?: string;
  setIsURL?: (foo: any) => void;
}
type Info = { width_M?: string };

export const Container = styled.div<Info>`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #e0e0e0;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 75px;
    padding: 1rem;
    color: white;
    font-weight: bold;
    /* border: 1px solid teal; */
    width: 100%;
    max-width: ${props => props.width_M || '1268px'};
  }
  @media (max-width: 768px) {
    display: none;
  }
  svg {
    /* flex-grow: 0.2; */
    /* margin-right: 5px; */
    z-index: 997;
    cursor: pointer;
  }
  .left_side {
    display: flex;
    flex-direction: row;
    align-items: center;
    /* flex-grow: 0.5; */
  }
  .search {
    flex-grow: 1;
  }
  .right_side {
    flex-grow: 0.4;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
  h1 {
    color: var(--fontBlack__600);
    font-size: 15px;
    font-weight: 500;
    padding: 0 10px;
    cursor: pointer;
    &.active {
      color: var(--chamong__color);
    }
  }
  .user {
    color: var(--fontBlack__600);
    font-weight: 500;
    font-size: 25px;
    margin-left: 10px;
    cursor: pointer;
  }
  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    img {
      :last-child {
        margin-left: 8px;
        padding-top: 5px;
      }
    }
  }
`;
function Header({ width_M, setIsURL }: SearchState) {
  const navigate = useNavigate();
  const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
  const loginState = useAppSelector(state => state.isLogin);
  const memberInfo = useAppSelector(state => state.memberInfo);
  const { pathname } = useLocation();
  const isNav = useAppSelector(state => state.navmenu);
  const dispatch = useAppDispatch();
  const navMenu = [
    {
      id: 1,
      title: '유저픽',
      link: '/userpick',
    },
    {
      id: 2,
      title: '위시리스트',
      link: '/wishlist',
    },
    {
      id: 3,
      title: '커뮤니티',
      link: '/community',
    },
  ];
  const navChangeHandler = (id: number) => {
    dispatch(navNumber(id));
  };
  useEffect(() => {
    console.log('change');
  }, [pathname]);

  return (
    <Container width_M={width_M}>
      {isLoginModal ? <Login setIsLoginModal={setIsLoginModal}></Login> : null}
      <div className="header">
        <div
          className="logo"
          onClick={() => {
            dispatch(navNumber(0));
            navigate('/');
          }}
        >
          <img src={logo} alt="logo" style={{ width: '35px' }}></img>
          <img src={chamong} alt="logo" style={{ width: '50px' }}></img>
        </div>
        <div className="right_side">
          {navMenu.map(menu => {
            return (
              <h1
                key={menu.id}
                id={String(menu.id)}
                className={isNav === menu.id ? 'active' : ''}
              >
                <Link
                  to={`${menu.link}`}
                  onClick={() => {
                    console.log(menu.id);
                    navChangeHandler(menu.id);
                  }}
                >
                  {menu.title}
                </Link>
              </h1>
            );
          })}
          {!loginState ? (
            // <FaUserCircle
            //   className="user"
            //   onClick={() => {
            //     loginState ? navigate('/mypage') : setIsLoginModal(true);
            //     dispatch(navNumber(0));
            //   }}
            // />
            <Button
            border={'var(--chamong__color)'}
                color={'var(--chamong__color)'}
                hcolor={'white'}
                hover={'var(--chamong__color)'}
                hborder={'var(--chamong__color)'}
                padding="13px 15px"
                radius="12px"
                onClick={() => {
                  loginState ? navigate('/mypage') : setIsLoginModal(true);
                  dispatch(navNumber(0));
                }}
                >
              로그인
            </Button>
          ) : (
            <img
              style={{
                width: '40px',
                borderRadius: '100px',
                height: '40px',
                cursor: 'pointer',
              }}
              src={memberInfo.profileImg}
              alt="profile-img"
              onClick={() => navigate('/mypage')}
            ></img>
          )}
          {pathname === '/' ? (
            <div className="search">
              (
              <HeaderSearch
                view={'block'}
                place={'13px'}
                input={'45px'}
                size={'22px'}
                setIsURL={setIsURL}
              />
              )
            </div>
          ) : null}
        </div>
      </div>
    </Container>
  );
}
export default Header;
