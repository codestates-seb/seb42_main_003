import styled from 'styled-components';
import { ContentCard } from './ContentCard';
import { useState, useEffect } from 'react';
import CommunityBestD from './destop/CommunityBestD';
import MyPick from './destop/MyPick';
import { getDataTs } from '../api/tsapi';
import useIntersectionObserver from '../hooks/useIO';
import { useRef } from 'react';
import Nav from './mobile/Nav';
// import { debounce } from 'lodash';

interface CardList {
  content?: any;
  data?: any;
  setData?: any;
  set?: any;
  setContent?: any;
}

const Container = styled('div')<CardList>`
  display: flex;
  justify-content: center;
  width: 100%;
  .wrapper {
    width: 1200px;
    overflow: visible;
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
  }

  .main {
    display: grid !important;
    margin: 10px;
    gap: 12px 12px;
    width: 100%;
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (min-width: 768px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 30px 30px;
    }
  }
  .item {
    margin-left: 10px;
    width: 420px;
    position: relative;
    @media (max-width: 768px) {
      display: none;
    }
  }
  .item_wrapper {
    position: sticky;
    top: 10px;
  }
`;
const Spinner = styled.div`
  height: 200px;
  width: 100%;
  /* margin-bottom: -30px; */
  .layerPopup {
    /* display: none; */
    /* position: fixed;
    top: 0;
    left: 0; */
    width: 100%;
    height: 100%;

    /* background: rgba(255, 202, 202, 0.8); */
    z-index: 1000;
    justify-content: center;
    align-items: center;
    position: relative;
    /* margin: 0 0 -60px 0px; */
  }
  .spinner {
    @media (max-width: 768px) {
      top: 20%;
      left: 50%;
    }
    @media (min-width: 768px) {
      top: 20%;
      left: 37%;
    }
    position: absolute;

    border: 8px solid #f3f3f3; /* Light grey */
    border-top: 8px solid var(--chamong__color); /* Blue */
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spinner 2s linear infinite;
  }
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .background {
    display: flex;
    flex-direction: column;
  }
`;
function ContentList({}: CardList) {
  type Info = any | null;
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemIndex, setItemIndex] = useState(31);
  const [content, setContent] = useState<Info>();
  const [data, setData] = useState<Info>();
  useEffect(() => {
    // getDataTs(isURL).then(res => {
    getDataTs('content').then(res => {
      // console.log(res);
      if (res) {
        setData(res);
        setContent(res.slice(0, 30));
        // setContent(res.content);
        // if (isURL === 'main?page=1') setData(res.content);
        // else setData(res);
      }
    });
  }, []);
  //* 자른게 content
  //로딩 테스트를 위해서 가짜 fetch 함수를 넣었다.
  const testFetch = (delay = 500) => new Promise(res => setTimeout(res, delay));

  //현재 목업 데이터(data)를 사용하고 있기 때문에, 최대한 데이터를 재활용하는 코드를 작성.
  //(0~4번 게시물, 1~5번 게시물, 2~6번 게시물 이런 식으로 가져와서 5개씩 concat함수로 붙였다.)
  //getMoreItem 함수가 실행되면 isLoaded를 true로 만들어 로딩 컴포넌트를 보여주고,
  //함수가 종료될 때 isLoaded를 false로 만들어 로딩컴포넌트를 숨겼다.
  const getMoreItem = async () => {
    if (data) {
      setIsLoaded(true);
      await testFetch();
      setItemIndex(i => i + 1);
      //*
      setContent(content.concat(data.slice(itemIndex, itemIndex + 30)));
      setIsLoaded(false);
    }
  };
  // console.log(isLoaded);
  //intersection 콜백함수
  //entry는 IntersectionObserverEntry 인스턴스의 배열
  //isIntersecting: 대상 객체와 루트 영역의 교차상태를 boolean값으로 나타냄
  //대상 객체가 루트 영역과 교차 상태로 들어갈 때(true), 나갈 때(false)

  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer
  ) => {
    //보통 교차여부만 확인하는 것 같다. 코드는 로딩상태까지 확인함.
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  //현재 대상 및 option을 props로 전달
  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
    onIntersect,
  });

  return (
    <div className="background">
      <Container>
        <div className="wrapper">
          <div className="main">
            {content &&
              content.map((e: any, idx: number) => {
                return <ContentCard key={idx} data={e} />;
              })}
          </div>
          <div className="item">
            <div className="item_wrapper">
              <CommunityBestD></CommunityBestD>
              <MyPick></MyPick>
            </div>
          </div>
        </div>
      </Container>
      <Spinner>
        <div className="layerPopup">
          <div className="spinner" ref={setTarget}></div>
        </div>
      </Spinner>
      <div style={{ height: '60px' }}></div>
    </div>
  );
}

export default ContentList;
