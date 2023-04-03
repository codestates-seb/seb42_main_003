import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import { getDataTs } from '../../api/tsapi';

interface CardList {
  data?: string[];
  trans?: string;
}

const Container = styled('div')<CardList>`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  background-color: var(--searchbar__color);
  border-top: 0.5px solid var(--chamong__color);
  border-bottom: 0.5px solid var(--chamong__color);
  margin-bottom: 15px;
  overflow: hidden;
  @media (min-width: 768px) {
    display: none;
  }
  h1 {
    font-weight: 600;
    font-size: var(--fs__small);
    color: var(--fontBlack__600);
    margin-bottom: 5px;
    text-align: center;
  }
  .carousel {
    margin-top: 3px;
    margin-left: -10px;
    width: 300vw;
    height: 100%;
    display: flex;
    transform: ${props => props.trans};
    transition: transform 0.5s;
  }
  .title {
    width: 100vw;
    text-align: center;
    /* align-self: center; */
    color: var(--fontBlack__700);
    font-weight: 400;
    font-size: var(--fs__big);
    margin-bottom: 15px;
  }
  .dot_field {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .dot {
    width: 7px;
    fill: var(--fontBlack__100);
    margin-right: 10px;
    cursor: pointer;
    &.active {
      fill: var(--fontBlack__500);
    }
  }
`;

function CommunityBestM({}: CardList) {
  const [isCommunity, setIsCommunity] = useState<ArticleType[]>([]);
  const [isDot, setIsDot] = useState<number>(1);
  useEffect(() => {
    getDataTs('articles/popular-app').then(res => {
      if (res) setIsCommunity(res);
    });
  }, []);
  const arr = [1, 2, 3];
  return (
    <Container
      trans={
        isDot === 1
          ? 'translate(0)'
          : isDot === 2
          ? 'translate(-100vw)'
          : 'translate(-200vw)'
      }
    >
      <h1>커뮤니티 인기글</h1>
      <div className="carousel">
        {isCommunity.map((ele: any) => (
          <div key={ele.id} className="title">
            {ele.title}
          </div>
        ))}
      </div>

      <div className="dot_field">
        {arr.map((icon: any) => (
          <svg
            key={icon}
            viewBox="0 0 56 56"
            fill="none"
            className={isDot === icon ? 'dot active' : 'dot'}
            onClick={() => setIsDot(icon)}
          >
            <path d="M56 28C56 33.5379 54.3578 38.9514 51.2812 43.556C48.2045 48.1605 43.8315 51.7494 38.7151 53.8686C33.5988 55.9879 27.969 56.5424 22.5375 55.462C17.106 54.3816 12.1169 51.7149 8.20103 47.799C4.28516 43.8831 1.61841 38.894 0.538025 33.4625C-0.542361 28.0311 0.0121319 22.4012 2.13139 17.2849C4.25064 12.1685 7.83947 7.79553 12.444 4.71885C17.0486 1.64217 22.4621 0 28 0C35.4261 0 42.548 2.94999 47.799 8.20101C53.05 13.452 56 20.5739 56 28Z" />
          </svg>
        ))}
      </div>
    </Container>
  );
}

export default CommunityBestM;
