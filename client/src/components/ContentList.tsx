import styled from 'styled-components';
import { ContentCard } from './ContentCard';
import { useState, useEffect } from 'react';
import CommunityBestD from './destop/CommunityBestD';
import MyPick from './destop/MyPick';
import { getDataTs } from '../api/tsapi';

interface CardList {
  // flex_dir?: string;
  // bottom_justify?: string;
  // fs_h1?: string;
  // body?: string;
  // heart?: string;
  // radius?: string;
  // img_width?: string;
  // content_align?: string;
  // line?: string;
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

function ContentList({ content, setContent, data, setData }: CardList) {
  const [num, setNum] = useState(2);
  const [index, setIndex] = useState(0);

  //* 무한스크롤 유튜브
  //* content = 30개
  //* data = 6개
  useEffect(() => {
    window.addEventListener('scroll', e => {
      const isScrollEnd =
        window.innerHeight + window.scrollY + 200 > document.body.offsetHeight;
      if (isScrollEnd && data) {
        getDataTs(`main?page=${num}`).then(res => {
          setData(data.concat(res));
          setNum(num + 1);
        });
      }
      if (data && data.length > 30) {
        setData(data.slice(0, 30));
      }
    });
  }, [data]);

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
