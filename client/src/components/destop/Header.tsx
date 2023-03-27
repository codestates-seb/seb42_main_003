import styled from 'styled-components';
import HeaderSearch from '../HeaderSearch';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTK';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Login from '../Login';
import logo from '../../assets/logo/logo_mascot.svg';
import chamong from '../../assets/logo/logo_kor.svg';

interface SearchState {
  width_M?: string;
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
function Header({ width_M }: SearchState) {
  const navigate = useNavigate();
  const [isNav, setIsNav] = useState<Number | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
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
  const loginState = useAppSelector(state => state.isLogin);
  const memberInfo = useAppSelector(state => state.memberInfo);
  console.log(memberInfo.profileImg);
  return (
    <Container width_M={width_M}>
      {isLogin ? <Login setIsLogin={setIsLogin}></Login> : null}
      <div className="header">
        <div className="logo" onClick={() => navigate('/')}>
          <img src={logo} alt="logo" style={{ width: '35px' }}></img>
          <img src={chamong} alt="logo" style={{ width: '50px' }}></img>
        </div>
        <div className="right_side">
          {navMenu.map(menu => {
            return (
              <h1
                key={menu.id}
                id={String(menu.id)}
                onClick={() => setIsNav(menu.id)}
                className={isNav === menu.id ? 'active' : ''}
              >
                <Link to={menu.link}>{menu.title}</Link>
              </h1>
            );
          })}
          {!loginState ? (
            <FaUserCircle
              className="user"
              onClick={() => {
                loginState ? navigate('/mypage') : setIsLogin(true);
                setIsNav(null);
              }}
            />
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
          <div className="search">
            <HeaderSearch
              view={'block'}
              place={'13px'}
              input={'45px'}
              size={'22px'}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
export default Header;
