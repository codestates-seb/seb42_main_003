import styled from 'styled-components';
interface ExampleProps {
  height?: string;
  right?: string;
  padding?: string;
}

export const SearchbarPlain = styled('div')<ExampleProps>`
  display: flex;
  border: 1px solid #cacaca;
  background-color: white;
  border-radius: 5px;
  height: 40px;
  width: 100%;
  position: relative;

  input {
    padding-left: ${props => props.padding || '10px'};
    ::placeholder {
      font-size: 12px;
    }
  }
  .search_icon {
    position: absolute;
    right: ${props => props.right || '5%'};
    top: 23%;
    font-size: 20px;
    color: #3b4044;
  }
`;
