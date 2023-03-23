import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MouseEvent, useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { is } from 'immer/dist/internal';
import Login from '../Login';

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
  z-index: 997;
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
export const MenuLink = styled(Link)``;
type Title = {
  id: number;
  text: string;
  link: string | any;
}[];

const title: Title = [
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

function Nav() {
  const [isNav, setIsNav] = useState<Number>(1);
  const [isLogin, setIsLogin] = useState<Boolean>(false);
  type CustomMouseEvent = MouseEvent<HTMLElement>;

  const clickHandler = (event: CustomMouseEvent) => {
    setIsNav(Number((event.target as HTMLLIElement).id));
  };

  return (
    <Container>
      {isLogin ? <Login setIsLogin={setIsLogin}></Login> : null}
      {title.map(ele => {
        return (
          <div id={String(ele.id)} key={ele.id} onClick={clickHandler}>
            <MenuLink
              id={String(ele.id)}
              key={ele.id}
              to={ele.id === 5 ? (isLogin ? ele.link : '#') : ele.link}
              onClick={() => (ele.id === 5 ? setIsLogin(true) : null)}
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
