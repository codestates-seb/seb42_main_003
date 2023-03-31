import styled from 'styled-components';
import { ContentCard } from './ContentCard';
import { useState, useEffect } from 'react';
import CommunityBestD from './destop/CommunityBestD';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTK';
import MyPick from './destop/MyPick';
import { getDataTs } from '../api/tsapi';
import useIntersectionObserver from '../hooks/useIO';
import { setCampingList } from '../store/campingSlice';

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
  .layerPopup {
    width: 100%;
    height: 100%;
    z-index: 1000;
    justify-content: center;
    align-items: center;
    position: relative;
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
function ContentList({ data, setData }: CardList) {
  // const data = useAppSelector(state => state.campingList)
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageNum, setpageNum] = useState(2);
  const dispatch = useAppDispatch();

  const testFetch = (delay = 500) => new Promise(res => setTimeout(res, delay));

  const getMoreItem = async () => {
    if (data) {
      setIsLoaded(true);
      await testFetch();
      getDataTs(`main?page=${pageNum}`).then(res => {
        setData(data.concat(res.content));
        // dispatch(setCampingList(res.content))
      });
      setIsLoaded(false);
      setpageNum(pageNum + 1);
    }
  };

  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer
  ) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 1,
    onIntersect,
  });

  return (
    <div className="background">
      <Container>
        <div className="wrapper">
          <div className="main">
            {data &&
              data.map((e: any, idx: number) => {
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
          {data && data.length < 60 ? (
            <div className="spinner" ref={setTarget}></div>
          ) : (
            <div
              style={{
                fontSize: '18px',
                display: 'flex',
                justifyContent: 'center',
                maxWidth: '600px',
                zIndex: '100',
              }}
            >
              {/* 마지막 데이터입니다 */}
            </div>
          )}
        </div>
      </Spinner>
      <div style={{ height: '60px' }}></div>
    </div>
  );
}

export default ContentList;
