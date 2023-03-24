import styled from 'styled-components';

import { ContentCard, ContentCardRow } from './ContentCard';
import { useState, useEffect } from 'react';

import { getData } from '../api/api';

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
  .wrapper {
    @media (max-width: 768px) {
      /* grid-template-columns: repeat(1, minmax(0, 1fr));
      width: 100%;
      max-width: 500px; */
      margin: 0 0 100px 0;
    }
    /* @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 30px 30px;
      width: 100%;
      max-width: 900px;
    } */
    overflow: visible;
    display: flex;
    flex-direction: row;
    margin-bottom: 50px;
  }

  .main {
    display: grid !important;
    justify-self: center;
    margin: 10px;
    gap: 12px 12px;
    width: 100%;
    @media (max-width: 768px) {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 30px 30px;
    }
  }
`;

function ContentListOnly({}: CardList) {
  type Info = any | null;
  const [data, setData] = useState<Info>([]);

  useEffect(() => {
    getData('content').then(res => {
      setData(res.slice(0, 10));
    });
  }, []);

  return (
    <Container>
      <div className="wrapper">
        <div className="main">
          {data &&
            data.map((e: any, idx: number) => {
              return <ContentCardRow key={idx} data={e} like={'none'} />;
            })}

          {/* return data.facltNm ? (
                <ContentCardRow key={idx} data={e} like={'none'} />
              ) : (
                <ContentCard></ContentCard>
              ); */}
        </div>
      </div>
    </Container>
  );
}

export default ContentListOnly;
