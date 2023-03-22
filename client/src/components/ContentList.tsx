import styled from 'styled-components';
// import { content } from '../../data/content';
import ContentCard from './ContentCard';
import { useState, useEffect } from 'react';
import useIntersectionObserver from '../hooks/useIO';
import axios from 'axios';
import CommunityBestD from './destop/CommunityBestD';
import MyPick from './destop/MyPick';

interface CardList {
  flex_dir?: string;
  bottom_justify?: string;
  fs_h1?: string;
  body?: string;
  heart?: string;
  radius?: string;
  img_width?: string;
  content_align?: string;
  line?: string;
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
    /* width: 830px; */
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

function ContentList({}: CardList) {
  type Info = any | null;

  const [content, setContent] = useState<Info>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemIndex, setItemIndex] = useState(6);
  const [data, setData] = useState<Info>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/content').then(res => {
      setContent(res.data);
      setData([...res.data.slice(0, 6)]);
    });
  }, []);

  const testFetch = (delay = 1000) =>
    new Promise(res => setTimeout(res, delay));

  const getMoreItem = async () => {
    setIsLoaded(true);
    await testFetch();
    setItemIndex(i => i + 6);
    setData(data.concat(content.slice(itemIndex, itemIndex + 6)));
    setIsLoaded(false);
  };

  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer
  ) => {
    if (entry.isIntersecting && !isLoaded) {
      if (data.length === itemIndex) {
        observer.unobserve(entry.target);
        await getMoreItem();
        observer.observe(entry.target);
      }
      // else alert('데이터가 없습니다');
    }
  };

  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 1,
    onIntersect,
  });

  return (
    <Container>
      <div className="wrapper">
        <div className="main">
          {data &&
            data.map((e: any, idx: number) => {
              return <ContentCard key={idx} data={e} />;
            })}
          <div ref={setTarget}>
            {isLoaded && <div style={{ height: '100px' }}>Loading..</div>}
          </div>
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
