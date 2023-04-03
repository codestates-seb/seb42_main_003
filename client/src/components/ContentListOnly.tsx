import styled from 'styled-components';
import { ContentCard, ContentCardRow } from './ContentCard';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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
  data?: any;
  setIsMap?: (foo: any) => void;
  setData?: (foo: any) => void;
}

const ContainerRow = styled('div')<CardList>`
  display: flex;
  flex-direction: row;
  .wrapper {
    @media (max-width: 768px) {
      width: 100%;
    }
    @media (min-width: 768px) {
      width: 100%;
      max-width: 1000px;
      min-height: 560px;
    }
  }
  .column {
    display: grid !important;
    margin: 10px 0;
    @media (max-width: 768px) {
      gap: 12px 12px;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 30px 30px;
    }
  }
`;

export function ContentListOnlyColumn({ data, setIsMap, setData }: CardList) {
  let { pathname } = useLocation();
  return (
    <ContainerRow>
      <div className="wrapper">
        <div className={pathname === '/wishlist' ? 'row' : 'column'}>
          {data &&
            data.map((e: any, idx: number) => {
              return (
                <ContentCard
                  setData={setData}
                  setIsMap={setIsMap}
                  key={idx}
                  data={e}
                />
              );
            })}
        </div>
      </div>
    </ContainerRow>
  );
}

const ContainerColumn = styled('div')<CardList>`
  display: flex;
  flex-direction: row;
  justify-content: center;

  .wrapper {
    @media (max-width: 768px) {
      width: 100%;
      max-width: 500px;
    }
    @media (min-width: 768px) {
      width: 100%;
      max-width: 1000px;
    }
  }

  .row {
    @media (max-width: 768px) {
      margin: 10px;
      max-width: 500px;
    }
    @media (min-width: 768px) {
      margin: 10px;
    }
  }
`;

export function ContentListOnlyRow({ data, setIsMap, setData }: CardList) {
  let { pathname } = useLocation();

  return (
    <ContainerColumn>
      <div className="wrapper">
        {data &&
          data.map((e: any, idx: number) => {
            return (
              <div key={idx} className="row">
                <ContentCardRow
                  setData={setData}
                  setIsMap={setIsMap}
                  data={e}
                  like={'none'}
                  remove={'inline'}
                />
              </div>
            );
          })}
      </div>
    </ContainerColumn>
  );
}
