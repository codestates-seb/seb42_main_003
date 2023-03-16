import styled from 'styled-components';
// import { content } from '../../data/content';
import ContentCard from './ContentCard';
import { useState, useEffect } from 'react';
import useIntersectionObserver from '../hooks/useIO';
import { getContent } from '../api/api';
import axios from 'axios';

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
  display: grid !important;
  margin: 10px;
  gap: 12px 12px;
  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

function ContentList({}: CardList) {
  type Info = any | null;

  const [content, setContent] = useState<Info>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemIndex, setItemIndex] = useState(6);
  const [data, setData] = useState<Info>([]);

  // useEffect(() => {
  //   getContent().then(res => setContent(res));
  //   if (content) setData([...content.slice(0, 6)]);
  // }, []);

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
      {data &&
        data.map((e: any, idx: number) => {
          return <ContentCard key={idx} data={e} />;
        })}
      {/* <ContentCard data={data} /> */}
      <div ref={setTarget}>
        {isLoaded && <div style={{ height: '100px' }}>Loading..</div>}
      </div>
    </Container>
  );
}

export default ContentList;
