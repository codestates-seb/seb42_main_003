import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MouseEvent, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 4.5em;
  background-color: var(--chamong__color);
  border-radius: 25px 25px 0 0;
  padding: 0 15px;
  z-index: 999;
  @media (min-width: 768px) {
    display: none;
  }
  .nav_box {
    width: 78px;
    height: 3.7em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &.active {
      background-color: white;
      border-radius: 12px;
    }
  }
  .svg {
    color: white;
    font-size: 25px;
    margin-bottom: 3px;
    &.active {
      color: var(--chamong__color);
    }
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

type Title = {
  id: number;
  text: string;
  link: string;
}[];
type NavNumber = number;
const title: Title = [
  {
    id: 1,
    text: '메인',
    link: '#',
  },
  {
    id: 2,
    text: '커뮤니티',
    link: '#',
  },
  {
    id: 3,
    text: '위시리스트',
    link: '#',
  },
  {
    id: 4,
    text: '마이페이지',
    link: '#',
  },
];

function Nav() {
  const [isNav, setIsNav] = useState<NavNumber | null>(null);
  type CustomMouseEvent = MouseEvent<HTMLElement>;

  const clickHandler = (event: CustomMouseEvent) => {
    setIsNav(Number((event.target as HTMLLIElement).id));
  };
  return (
    <Container>
      {title.map(ele => {
        return (
          <Link to={ele.link}>
            <div
              key={ele.id}
              id={String(ele.id)}
              className={isNav !== ele.id ? 'nav_box' : 'nav_box active'}
              onClick={clickHandler}
            >
              {ele.id === 1 ? (
                <AiOutlineHome
                  id={String(ele.id)}
                  className={isNav !== ele.id ? 'svg' : 'svg active'}
                />
              ) : ele.id === 2 ? (
                <AiOutlineUnorderedList
                  id={String(ele.id)}
                  className={isNav !== ele.id ? 'svg' : 'svg active'}
                />
              ) : ele.id === 3 ? (
                <AiOutlineHeart
                  id={String(ele.id)}
                  className={isNav !== ele.id ? 'svg' : 'svg active'}
                />
              ) : (
                <AiOutlineUser
                  id={String(ele.id)}
                  className={isNav !== ele.id ? 'svg' : 'svg active'}
                />
              )}
              <div
                id={String(ele.id)}
                className={isNav !== ele.id ? 'nav_title' : 'nav_title active'}
              >
                {ele.text}
              </div>
            </div>
          </Link>
        );
      })}
    </Container>
  );
}

export default Nav;
