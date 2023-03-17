import styled from 'styled-components';
import { HiOutlineSearch } from 'react-icons/hi';

interface ExampleProps {
  height?: string;
  right?: string;
  padding?: string;
}

const Container = styled('div')<ExampleProps>`
  display: flex;
  border: 1px solid var(--searchbar__color);
  background-color: var(--searchbar__color);
  border-radius: 20px;
  height: ${props => props.height || '50px'};
  width: 100%;
  position: relative;

  input {
    padding-left: ${props => props.padding || '10px'};
    ::placeholder {
      font-size: 15px;
    }
  }
  .search_icon {
    position: absolute;
    right: ${props => props.right || '5%'};
    top: 23%;
    font-size: 27px;
    color: var(--chamong__color);
  }
`;

function SearchBar({}: ExampleProps) {
  return (
    <Container>
      <HiOutlineSearch className="search_icon" />
      <input placeholder="검색"></input>
    </Container>
  );
}

export default SearchBar;
