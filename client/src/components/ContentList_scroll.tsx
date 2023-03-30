import styled from 'styled-components';
import { ContentCard } from './ContentCard';
import { useState, useEffect } from 'react';
import CommunityBestD from './destop/CommunityBestD';
import MyPick from './destop/MyPick';
import { getDataTs } from '../api/tsapi';
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

function ContentList({ data, setData }: CardList) {
  const [num, setNum] = useState(2);
  // const [index, setIndex] = useState(31);

  // useEffect(() => {
  //   window.addEventListener('scroll', e => {
  //     const isScrollEnd =
  //       window.innerHeight + window.scrollY + 1000 > document.body.offsetHeight;
  //     const isScrollstart = window.innerHeight > window.scrollY - 415;

  //     let prevData = data;
  //     let nextData = data;
  //     //* 스크롤 올릴 때
  //     if (data && isScrollstart && num > 2) {
  //       nextData = data.slice(10, 20);
  //       getDataTs(`main?page=${num - 1}`).then(res => {
  //         const newData = res.content.concat(nextData);
  //         setData(newData);
  //       });

  //       setNum(num - 1);
  //     } else if (data && data.length === 40 && isScrollstart && num === 2) {
  //       getDataTs(`main?page=${1}`).then(res => {
  //         const newData = res.content;
  //         setData(newData);
  //       });
  //     }

  //     //* 스크롤 내릴 때
  //     if (isScrollEnd && data) {
  //       if (data && data.length > 30) {
  //         prevData = data.slice(30, 40);
  //       }
  //       if (data && data.length === 30) {
  //         prevData = data.slice(20, 30);
  //       }
  //       getDataTs(`main?page=${num}`).then(res => {
  //         const newData = prevData.concat(res.content);
  //         setData(newData);
  //         setNum(num + 1);
  //       });
  //     }
  //   });
  // }, [data]);
  const [throttle, setThrottle] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', e => {
      let prevData = data;
      let nextData = data;
      // const isScrollEnd =
      //   window.innerHeight + window.scrollY + 1000 > document.body.offsetHeight;
      const isScrollstart = window.innerHeight > window.scrollY - 415;

      const isScrollEnd =
        (document.body.offsetHeight - window.innerHeight) / 2 <= window.scrollY;

      //* 스크롤 내릴 때.
      if (isScrollEnd && data) {
        if (throttle) return; //* 스로틀이 true이면 그냥 리턴;
        if (!throttle) {
          setThrottle(true); //* true로 바꿔줌.
          setTimeout(async () => {
            await getDataTs(`main?page=${num}`).then(res => {
              setData(data.concat(res.content));
              setNum(num + 1);
            });
            setThrottle(false);
          }, 1000);
        }
      }
    });
  }, [data]);

  // const [page, setPage] = useState(10);
  // const [books, setBook] = useState([]);

  // const handleScroll = () => {
  //   console.log(window.innerHeight);
  //   if (throttle) return; //* 스로틀이 true이면 그냥 리턴;
  //   if (!throttle) {
  //     //* 스로틀이 false이면
  //     setThrottle(true); //* true로 바꿔줌.
  //     setTimeout(async () => {
  //       if (data.length >= 150)
  //         setPage(data.length); //* 페이지가 50 이상이면 50으로 마무리.
  //       else setPage(page => page + 5); //* 페이지가 50 이하면 5개씩 추가
  //       setThrottle(false); //* false 바꿔줌.
  //     }, 1000);
  //   }
  // };

  return (
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
  );
}

export default ContentList;
