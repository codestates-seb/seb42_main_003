import styled from 'styled-components';
import HeaderSearch from '../HeaderSearch';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTK';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Login from '../Login';

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
`;
function Header({ width_M }: SearchState) {
  const navigate = useNavigate();
  const [isNav, setIsNav] = useState<Number | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navMenu = [
    {
      id: 1,
      title: '유저픽',
      link: '/',
    },
    {
      id: 2,
      title: '위시리스트',
      link: '#',
    },
    {
      id: 3,
      title: '커뮤니티',
      link: '#',
    },
  ];
  const isClicked = useAppSelector(state => state.clicked);
  return (
    <Container width_M={width_M}>
      {isLogin ? <Login setIsLogin={setIsLogin}></Login> : null}
      <div className="header">
        <svg
          onClick={() => navigate('/')}
          xmlns="http://www.w3.org/2000/svg"
          width="15%"
          viewBox="0 0 532 75"
          fill="none"
        >
          <path
            d="M35.704 74.152C30.648 74.152 25.944 73.224 21.592 71.368C17.304 69.512 13.56 66.952 10.36 63.688C7.224 60.36 4.76 56.456 2.968 51.976C1.176 47.496 0.28 42.568 0.28 37.192C0.28 31.88 1.144 26.984 2.872 22.504C4.664 17.96 7.16 14.056 10.36 10.792C13.56 7.464 17.304 4.904 21.592 3.112C25.88 1.256 30.584 0.327997 35.704 0.327997C40.76 0.327997 45.272 1.192 49.24 2.92C53.272 4.648 56.664 6.92 59.416 9.736C62.168 12.488 64.152 15.496 65.368 18.76L55.192 23.56C53.656 19.72 51.192 16.616 47.8 14.248C44.472 11.816 40.44 10.6 35.704 10.6C30.968 10.6 26.776 11.72 23.128 13.96C19.48 16.2 16.632 19.304 14.584 23.272C12.6 27.24 11.608 31.88 11.608 37.192C11.608 42.504 12.6 47.176 14.584 51.208C16.632 55.176 19.48 58.28 23.128 60.52C26.776 62.696 30.968 63.784 35.704 63.784C40.44 63.784 44.472 62.6 47.8 60.232C51.192 57.864 53.656 54.76 55.192 50.92L65.368 55.72C64.152 58.92 62.168 61.928 59.416 64.744C56.664 67.56 53.272 69.832 49.24 71.56C45.272 73.288 40.76 74.152 35.704 74.152ZM78.937 73V1.47999H90.265V32.968H123.385V1.47999H134.617V73H123.385V43.048H90.265V73H78.937ZM145.021 73L170.173 1.47999H184.189L209.341 73H197.245L191.773 56.968H162.685L157.117 73H145.021ZM165.949 46.888H188.317L175.645 9.44799H178.813L165.949 46.888ZM219.746 73V1.47999H230.306L257.186 38.728H251.906L278.306 1.47999H288.866V73H277.634V14.824L281.858 15.976L254.882 52.84H253.73L227.33 15.976L231.074 14.824V73H219.746ZM340.324 74.152C335.14 74.152 330.308 73.224 325.828 71.368C321.412 69.512 317.508 66.92 314.116 63.592C310.788 60.264 308.164 56.36 306.244 51.88C304.388 47.4 303.46 42.504 303.46 37.192C303.46 31.88 304.388 26.984 306.244 22.504C308.164 17.96 310.788 14.056 314.116 10.792C317.444 7.464 321.348 4.904 325.828 3.112C330.308 1.256 335.14 0.327997 340.324 0.327997C345.572 0.327997 350.404 1.256 354.82 3.112C359.3 4.904 363.204 7.464 366.532 10.792C369.924 14.12 372.548 18.024 374.404 22.504C376.26 26.984 377.188 31.88 377.188 37.192C377.188 42.504 376.228 47.4 374.308 51.88C372.452 56.36 369.86 60.264 366.532 63.592C363.204 66.92 359.3 69.512 354.82 71.368C350.34 73.224 345.508 74.152 340.324 74.152ZM340.324 63.784C344.036 63.784 347.428 63.112 350.5 61.768C353.636 60.424 356.356 58.568 358.66 56.2C360.964 53.768 362.756 50.952 364.036 47.752C365.316 44.488 365.956 40.968 365.956 37.192C365.956 33.416 365.316 29.928 364.036 26.728C362.756 23.528 360.964 20.712 358.66 18.28C356.356 15.848 353.636 13.96 350.5 12.616C347.428 11.272 344.036 10.6 340.324 10.6C336.612 10.6 333.188 11.272 330.052 12.616C326.98 13.96 324.292 15.848 321.988 18.28C319.684 20.712 317.892 23.528 316.612 26.728C315.396 29.928 314.788 33.416 314.788 37.192C314.788 40.968 315.396 44.488 316.612 47.752C317.892 50.952 319.684 53.768 321.988 56.2C324.292 58.568 327.012 60.424 330.148 61.768C333.284 63.112 336.676 63.784 340.324 63.784ZM391.773 73V1.47999H400.893L441.021 56.872L436.701 57.544V1.47999H447.933V73H438.813L398.973 17.224L403.101 16.456V73H391.773ZM498.166 74.152C493.11 74.152 488.406 73.224 484.054 71.368C479.766 69.512 475.99 66.952 472.726 63.688C469.526 60.36 467.03 56.456 465.238 51.976C463.446 47.496 462.55 42.568 462.55 37.192C462.55 31.88 463.414 26.984 465.142 22.504C466.934 17.96 469.43 14.056 472.63 10.792C475.83 7.464 479.574 4.904 483.862 3.112C488.15 1.256 492.854 0.327997 497.974 0.327997C503.03 0.327997 507.542 1.192 511.51 2.92C515.542 4.648 518.934 6.92 521.686 9.736C524.438 12.488 526.422 15.496 527.638 18.76L517.558 23.656C516.086 19.752 513.654 16.616 510.262 14.248C506.87 11.816 502.774 10.6 497.974 10.6C493.238 10.6 489.046 11.72 485.398 13.96C481.75 16.2 478.902 19.304 476.854 23.272C474.87 27.24 473.878 31.88 473.878 37.192C473.878 42.504 474.902 47.176 476.95 51.208C479.062 55.176 481.942 58.28 485.59 60.52C489.238 62.696 493.43 63.784 498.166 63.784C502.134 63.784 505.75 62.984 509.014 61.384C512.342 59.72 514.998 57.416 516.982 54.472C518.966 51.464 519.958 47.976 519.958 44.008V39.112L525.046 43.72H497.974V34.12H531.19V40.84C531.19 46.088 530.294 50.792 528.502 54.952C526.71 59.048 524.278 62.536 521.206 65.416C518.134 68.296 514.614 70.472 510.646 71.944C506.678 73.416 502.518 74.152 498.166 74.152Z"
            fill="#F95738"
          />
        </svg>
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
          <FaUserCircle
            className="user"
            onClick={() => {
              setIsLogin(true);
              setIsNav(null);
            }}
          />
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
