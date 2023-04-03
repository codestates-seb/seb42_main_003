import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MouseEvent, useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTK';
import { useNavigate } from 'react-router-dom';
import { loginModal } from '../../store/loginModal';
import { useLocation } from 'react-router-dom';
import { navNumber } from '../../store/navSlice';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 4.3em;
  background-color: var(--chamong__color);
  border-radius: 25px 25px 0 0;
  padding: 0 15px;
  z-index: 998;
  //TODO모바일 반응형
  @media (min-width: 768px) {
    display: none;
  }
  .nav_box {
    width: 70px;
    height: 3.7em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .nav_box_active {
    width: 70px;
    height: 3.7em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 12px;
  }
  .svg {
    color: white;
    font-size: 25px;
    margin-bottom: 3px;
  }
  .svg_active {
    color: var(--chamong__color);
    font-size: 25px;
    margin-bottom: 3px;
  }
  .nav_title {
    color: white;
    font-size: var(--fs__small);
    font-weight: 600;
    &.active {
      color: var(--chamong__color);
    }
  }
`;
export const MenuLink = styled.div``;
type Title = {
  id: number;
  text: string;
  link: string | any;
}[];

function Nav() {
  const navMenu: Title = [
    {
      id: 1,
      text: '메인',
      link: '/',
    },
    {
      id: 2,
      text: '유저픽',
      link: '/userpick',
    },
    {
      id: 3,
      text: '커뮤니티',
      link: '/community',
    },
    {
      id: 4,
      text: '위시리스트',
      link: '/wishlist',
    },
    {
      id: 5,
      text: '마이페이지',
      link: '/mypage',
    },
  ];
  type CustomMouseEvent = MouseEvent<HTMLElement>;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isNav, setIsNav] = useState<Number>(1);
  // const [isLoginModal, setIsLoginModal] = useState<Boolean>(false);
  const loginState = useAppSelector(state => state.isLogin);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') setIsNav(1);
    else if (pathname === '/userpick') setIsNav(2);
    else if (pathname === '/community') setIsNav(3);
    else if (pathname === '/wishlist')
      sessionStorage.getItem('authorization')
        ? setIsNav(4)
        : dispatch(loginModal(true));
    else if (pathname === '/mypage')
      sessionStorage.getItem('authorization')
        ? setIsNav(5)
        : dispatch(loginModal(true));
  }, [pathname]);

  const clickHandler = (event: CustomMouseEvent) => {
    const menu = event.target as HTMLLIElement;

    if (menu.id === '5') {
      if (loginState) navigate('/mypage');
      else {
        dispatch(loginModal(true));
      }
    } else if (menu.id === '4') {
      loginState ? navigate('/wishlist') : dispatch(loginModal(true));
    } else {
      dispatch(loginModal(false));
      if (menu.id === '1') navigate('/');
      if (menu.id === '2') navigate('/userpick');
      if (menu.id === '3') navigate('/community');
    }
  };
  return (
    <Container>
      {/* {isLoginModal ? <Login setIsLoginModal={setIsLoginModal}></Login> : null} */}
      {navMenu.map(ele => {
        return (
          <div id={String(ele.id)} key={ele.id} onClick={clickHandler}>
            <MenuLink
              id={String(ele.id)}
              key={ele.id}
              // to={ele.id === 5 ? (isLoginModal ? ele.link : '#') : ele.link}
              // onClick={() => (ele.id === 5 ? setIsLoginModal(true) : null)}
              className={isNav !== ele.id ? 'nav_box' : 'nav_box_active'}
            >
              {ele.id === 1 ? (
                <AiOutlineHome
                  id={String(ele.id)}
                  className={isNav !== ele.id ? 'svg' : 'svg_active'}
                />
              ) : ele.id === 2 ? (
                <HiOutlineLocationMarker
                  id={String(ele.id)}
                  className={isNav !== ele.id ? 'svg' : 'svg_active'}
                />
              ) : ele.id === 3 ? (
                <AiOutlineUnorderedList
                  id={String(ele.id)}
                  className={isNav !== ele.id ? 'svg' : 'svg_active'}
                />
              ) : ele.id === 4 ? (
                <AiOutlineHeart
                  id={String(ele.id)}
                  className={isNav !== ele.id ? 'svg' : 'svg_active'}
                />
              ) : (
                <AiOutlineUser
                  id={String(ele.id)}
                  className={isNav !== ele.id ? 'svg' : 'svg_active'}
                />
              )}
              <div
                id={String(ele.id)}
                className={isNav !== ele.id ? 'nav_title' : 'nav_title active'}
              >
                {ele.text}
              </div>
            </MenuLink>
          </div>
        );
      })}
    </Container>
  );
}

export default Nav;
