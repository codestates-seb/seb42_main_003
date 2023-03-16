import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCategory } from '../api/api';
import { Button } from '../styles/Button';

export const Container = styled.div`
  width: 100%;
  overflow-x: scroll; // PC
  -webkit-overflow-scrolling: touch; // mobile
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
  white-space: nowrap;
  /* word-break: break-all; */
  margin-bottom: 5px;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
// interface CategoryType {
//   isCategory: { id: string; keyword: string | null }[];
//   setIsCategory: (foo: any) => void;
// }
function Category() {
  type CategoryType = { id: string; keyword: string | null };
  const [isCategory, setIsCategory] = useState<CategoryType[]>([]);
  useEffect(() => {
    getCategory().then(res => setIsCategory(res));
  }, []);
  return (
    <Container>
      {isCategory.map(ele => {
        return (
          <Button
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
    </Container>
  );
}

export default Category;
