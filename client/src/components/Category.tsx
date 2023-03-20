import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCategory } from '../api/api';
import { Button } from '../styles/Button';

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
function Category() {
  type CategoryType = { id: string; keyword: string | null };
  const [isCategory, setIsCategory] = useState<CategoryType[]>([]);
  useEffect(() => {
    getCategory().then(res => setIsCategory(res));
  }, []);
  return (
    <Container>
      <div className="main">
        {isCategory.map(ele => {
          return (
            <Button
              key={ele.id}
              border={'var(--chamong__color)'}
              color={'var(--chamong__color)'}
              hcolor={'white'}
              hover={'var(--chamong__color)'}
              hborder={'var(--chamong__color)'}
              padding="13px 15px"
              radius="16px"
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
