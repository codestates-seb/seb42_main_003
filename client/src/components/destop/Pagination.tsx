import styled from "styled-components";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: white;
  border: 1px solid var(--chamong__color);
  color: var(--chamong__color);
  font-size: 16px;
  padding: 8px 16px;
  margin: 0 4px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: var(--chamong__color);
    color: white;
  }
`;

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevClick = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Button key={i} onClick={() => onPageChange(i)}>
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  return (
    <Container>
      <Button onClick={handlePrevClick} disabled={isFirstPage}>
        <AiOutlineArrowLeft/>
      </Button>
      {renderPageNumbers()}
      <Button onClick={handleNextClick} disabled={isLastPage}>
        <AiOutlineArrowRight/>
      </Button>
    </Container>
  );
}

export default Pagination;