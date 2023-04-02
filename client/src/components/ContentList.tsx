import styled from 'styled-components';
import { ContentCard } from './ContentCard';
import { useState, useEffect } from 'react';
import CommunityBestD from './destop/CommunityBestD';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTK';
import MyPick from './destop/MyPick';
import { getDataTs } from '../api/tsapi';
import useIntersectionObserver from '../hooks/useIO';
import { setCampingList, addCampingList } from '../store/campingSlice';
import { FloatButton } from '../styles/mapStyle';
import { HiPlus } from 'react-icons/hi';

interface CardList {
  content?: any;
  data?: any;
  setData?: any;
  set?: any;
  setContent?: any;
  isURL?: string;
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
const StyleScrollUp = styled.div`
  /* @media (min-width: 768px) {
    display: none;
  } */
  display: flex;
  justify-content: center;
  .wrapper_button {
    max-width: 866.67px;
    min-width: 480px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    font-size: 15px;
    font-weight: 500;
    align-items: center;
    /* padding-left: 50px; */
    /* background-color: var(--searchbar__color); */
    height: 60px;
  }
  .div_box {
    @media (max-width: 768px) {
      display: none;
    }
    max-width: 303.33px;
    /* min-width: 260.32px; */
    width: 100%;
  }
  .upButton {
    padding: 10px;
    cursor: pointer;
    background-color: var(--searchbar__color);
    margin-left: 5px;
    border-radius: 5px;
    margin-right: 10px;
  }
  /* margin-left: 50px; */
`;
function ContentList({ isURL }: CardList) {
  const data = useAppSelector(state => state.campingList);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageNum, setpageNum] = useState(0);
  const [apiController, setApiController] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setpageNum(1);
  }, [isURL]);

  const testFetch = (delay = 800) => new Promise(res => setTimeout(res, delay));
  const getMoreItem = async () => {
    if (data && pageNum > 1) {
      setIsLoaded(true);
      await testFetch();
      if (apiController) {
        setApiController(false);
        getDataTs(`main?page=${pageNum}`).then(res => {
          dispatch(addCampingList(res.content));
        });
      }
      setIsLoaded(false);
    }
    setpageNum(pageNum + 1);
  };

  useEffect(() => {
    setTimeout(function () {
      setApiController(true);
    }, 3000);
  }, [apiController]);

  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer
  ) => {
    if (entry.isIntersecting && !isLoaded && pageNum < 5) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
    //* 옵저버 관찰시작, entry false, isLoaded false.
  };

  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 1,
    onIntersect,
  });

  const scrollUpHandler = () => {
    window.scrollTo(0, 0);
    getDataTs(`main?page=1`).then(res => {
      dispatch(setCampingList(res.content));
    });
    setpageNum(1);
  };
  return (
    <div className="background">
      <Container>
        <div className="wrapper">
          <div className="main">
            {data
              ? data.map((e: any, idx: number) => {
                  return <ContentCard key={idx} data={e} />;
                })
              : null}
          </div>
          <div className="item">
            <div className="item_wrapper">
              <CommunityBestD></CommunityBestD>
              <MyPick></MyPick>
            </div>
          </div>
        </div>
      </Container>
      {/* {isLoaded ? (
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
                마지막 데이터입니다
              </div>
            )}
          </div>
        </Spinner>
      ) : null} */}
      {pageNum < 4 ? (
        <div className="spinner" ref={setTarget}>
          {isLoaded && (
            <Spinner>
              <div className="layerPopup">
                <div className="spinner"></div>

                <div
                  style={{
                    fontSize: '18px',
                    display: 'flex',
                    justifyContent: 'center',
                    maxWidth: '600px',
                    zIndex: '100',
                  }}
                ></div>
              </div>
            </Spinner>
          )}
        </div>
      ) : (
        <StyleScrollUp className="float">
          <div className="wrapper_button">
            마지막 목록입니다{' '}
            <button className="upButton" onClick={scrollUpHandler}>
              ⬆️
            </button>
          </div>
          <div className="div_box"></div>
        </StyleScrollUp>
      )}

      <div className="end" style={{ height: '60px' }}></div>
      {/* <Floating >위로</Floating> */}
    </div>
  );
}

export default ContentList;
