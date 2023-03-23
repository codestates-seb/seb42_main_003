import styled from 'styled-components';

import ContentCard from './ContentCard';
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
      grid-template-columns: repeat(1, minmax(0, 1fr));
      width: 100%;
      max-width: 500px;
      margin-top: 50px;
    }
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 30px 30px;
      width: 100%;
      max-width: 900px;
    }
    overflow: visible;
    display: flex;
    flex-direction: row;
    margin-bottom: 50px;
  }

  .main {
    display: grid !important;
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
              return (
                <ContentCard
                  key={idx}
                  data={e}
                  flex_dir="row"
                  content_align="start"
                  bottom_justify="start"
                  img_width="auto"
                  radius="25px 0px 0px 25px"
                  content_rd="0px 25px 25px 0px"
                  line="1.2"
                  content_pd="15px"
                  wrap="wrap"
                  img_height="auto"
                  ratio="0.5"
                  content_width="50%"
                  webkit="-webkit-box"
                />
              );
            })}
        </div>
      </div>
    </Container>
  );
}

export default ContentListOnly;
