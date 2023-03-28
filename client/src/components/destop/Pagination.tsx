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

const Button = styled.button<{ isActive?: boolean, background?: string }>`
  background-color: ${props => props.background};
  border: 1px solid var(--chamong__color);
  color: ${props => props.color};
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
      const isActive = i === currentPage;
      pageNumbers.push(
        <Button key={i} onClick={() => onPageChange(i)} background={isActive ? "var(--chamong__color)" : "white"}  color={isActive ? "white" : "var(--chamong__color)"}>
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