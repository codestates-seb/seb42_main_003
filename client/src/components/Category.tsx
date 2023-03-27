import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MouseEvent } from 'react';
import { Button } from '../styles/Button';
import { getDataTs } from '../api/tsapi';

export const Container = styled.div`
  width: 100%;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
  white-space: nowrap;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  margin-top: -15px;

  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 768px) {
    justify-content: center;
    .main {
      width: 1174px;
    }
  }
`;
type SetterType = { setIsURL: (foo: any) => void };
function Category({ setIsURL }: SetterType) {
  const isCategory = [
    {
      id: 9,
      keyword: '인기',
    },
    {
      id: 1,
      keyword: '오션뷰',
    },
    {
      id: 2,
      keyword: '피톤치드',
    },
    {
      id: 3,
      keyword: '애견동반',
    },
    {
      id: 4,
      keyword: '운동',
    },
    {
      id: 5,
      keyword: '물놀이 시간',
    },
    {
      id: 6,
      keyword: '단풍',
    },
    {
      id: 7,
      keyword: '봄꽃여행',
    },
    {
      id: 8,
      keyword: '일몰장소',
    },
  ];
  type CustomMouseEvent = MouseEvent<HTMLElement>;
  const clickHandler = (event: CustomMouseEvent) => {
    const categoryUrl = (event.target as HTMLLIElement).id;
    setIsURL(`/main/search/keyword/${categoryUrl}?page=1`);
  };
  return (
    <Container>
      <div className="main">
        {isCategory.map(ele => {
          return (
            <Button
              key={ele.id}
              id={String(ele.id)}
              border={'var(--chamong__color)'}
              color={'var(--chamong__color)'}
              hcolor={'white'}
              hover={'var(--chamong__color)'}
              hborder={'var(--chamong__color)'}
              padding="13px 15px"
              radius="16px"
              onClick={clickHandler}
            >
              {ele.keyword}
            </Button>
          );
        })}
      </div>
    </Container>
  );
}

export default Category;
