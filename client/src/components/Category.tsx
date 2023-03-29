import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MouseEvent } from 'react';

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
export const Button = styled('button')`
  padding: 13px 15px;
  width: fit-content;
  height: fit-content;
  white-space: nowrap !important;
  background: white;
  color: var(--chamong__color);
  border: 1px solid var(--chamong__color);
  margin: 8px;
  border-radius: 16px;
  font-size: var(--fs--mid);
  font-weight: 550;
  cursor: pointer;
  &.active {
    background: var(--chamong__color);
    color: white;
    border: 1px solid var(--chamong__color);
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
  const [isId, setIsId] = useState(9);
  type CustomMouseEvent = MouseEvent<HTMLElement>;
  const clickHandler = (event: CustomMouseEvent) => {
    const categoryUrl = (event.target as HTMLLIElement).id;
    if (categoryUrl === '9') setIsURL('main?page=1');
    else setIsURL(`main/search/keyword/${categoryUrl}?page=1`);
  };
  return (
    <Container>
      <div className="main">
        {isCategory.map(ele => {
          return (
            <Button
              key={ele.id}
              id={String(ele.id)}
              onClick={(e: any) => {
                setIsId(ele.id);
                clickHandler(e);
              }}
              className={ele.id === isId ? 'active' : ''}
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
