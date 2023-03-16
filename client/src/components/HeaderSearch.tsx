import styled from 'styled-components';
import { HiOutlineSearch } from 'react-icons/hi';
import { FiArrowLeft } from 'react-icons/fi';

const Container = styled.div`
  padding: 10px 10px 0 10px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  .back {
    font-size: 35px;
    margin-top: 12px;
    color: var(--fontBlack__600);
  }
  .input_field {
    display: flex;
    border: 1px solid var(--searchbar__color);
    background-color: var(--searchbar__color);
    border-radius: 20px;
    height: 50px;
    margin: 5px;
    width: 100%;
    position: relative;
  }
  input {
    padding-left: 20px;
    height: 50px;
    ::placeholder {
      font-size: 15px;
    }
  }
  .keywords {
    display: flex;
    flex-direction: row;
    margin-left: 10px;
    position: absolute;
  }
  .keyword_box {
    padding: 10px 6px 10px 7px;
    width: fit-content;
    height: fit-content;
    margin: 6px 5px 0 5px;
    white-space: nowrap !important;
    background: 'white';
    color: var(--chamong__color);
    border: 1.5px solid var(--chamong__color);
    border-radius: 10px;
    font-size: var(--fs__small);
    font-weight: 550;
    cursor: pointer;
  }
  .keyword_title {
    margin-right: 5px;
  }
  .search_icon {
    position: absolute;
    right: 5%;
    top: 23%;
    font-size: 27px;
    color: var(--chamong__color);
  }
`;

interface SearchState {
  isKeyword: { id: string; title: string | null }[];
  isClicked: boolean;
  setIsClicked: (foo: any) => void;
  setIsKeyword: (foo: any) => void;
}

function HeaderSearch({
  isKeyword,
  setIsKeyword,
  isClicked,
  setIsClicked,
}: SearchState) {
  const removeKeyword = (index: string) => {
    setIsKeyword(isKeyword.filter(keyword => keyword.id !== index));
  };

  return (
    <Container>
      <Main>
        <div style={{ display: 'flex' }}>
          {isClicked ? (
            <div
              className="back"
              onClick={() => {
                setIsClicked(false);
                setIsKeyword([]);
              }}
            >
              <FiArrowLeft />
            </div>
          ) : null}
          <div
            className="input_field"
            onClick={e => {
              e.stopPropagation();
              setIsClicked(true);
            }}
          >
            <HiOutlineSearch className="search_icon" />
            <ul className="keywords">
              {isKeyword &&
                isKeyword.map(keyword => {
                  return (
                    <li key={keyword.id} className="keyword_box">
                      <span className="keyword_title">{keyword.title}</span>
                      <span
                        className="box_close"
                        onClick={() => removeKeyword(keyword.id)}
                      >
                        &times;
                      </span>
                    </li>
                  );
                })}
            </ul>
            {isKeyword.length === 0 ? <input placeholder="검색"></input> : null}
          </div>
        </div>
      </Main>
    </Container>
  );
}

export default HeaderSearch;
