import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../hooks/reduxTK';
import { HiOutlineSearch } from 'react-icons/hi';
import { FiArrowLeft } from 'react-icons/fi';
import { remove, reset } from '../store/keywordSlice';
import { click } from '../store/clickedSlice';
import SearchModal from './SearchModal';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Container = styled('div')<Info>`
  padding: 10px 10px 10px 10px;
  @media (min-width: 768px) {
    display: ${props => props.view || 'none'};
  }
`;

const Main = styled('div')<Info>`
  display: flex;
  flex-direction: column;
  .back {
    font-size: 35px;
    margin-top: 12px;
    color: var(--fontBlack__600);
    cursor: pointer;
    @media (min-width: 768px) {
      display: none;
    }
    /* display: none; */
  }
  .input_field {
    display: flex;
    border: 1px solid var(--searchbar__color);
    background-color: var(--searchbar__color);
    border-radius: 20px;
    height: ${props => props.input || '50px'};
    margin: 5px;
    width: 100%;
    position: relative;
  }
  input {
    padding-left: 15px;
    width: 100%;
    cursor: pointer;
    /* height: 50px; */
    ::placeholder {
      font-size: ${props => props.place || '15px'};
    }
    .hidden {
      visibility: hidden;
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
    margin: 4px 5px 0 5px;
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
    right: 7%;
    top: 23%;
    font-size: ${props => props.size || '27px'};
    color: var(--chamong__color);
    cursor: pointer;
  }
`;

interface SearchState {
  view?: string;
  input?: string;
  place?: string;
  size?: string;
  setIsURL?: (foo: any) => void;
}
type Info = { view?: string; input?: string; place?: string; size?: string };
function HeaderSearch({ setIsURL, view, input, place, size }: SearchState) {
  const dispatch = useAppDispatch();
  const isKeyword = useAppSelector(state => state.keyword);
  const isClicked = useAppSelector(state => state.clicked);
  const [randomKeyword, setrandomKeyword] = useState('');
  // /main/search/{thema_id}/{place_id}?
  const removeKeyword = (index: number) => {
    dispatch(remove(index));
  };
  // console.log(isKeyword);
  // console.log(isClicked);
  const randomKeywordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setrandomKeyword(e.target.value);
  };
  const navigate = useNavigate();
  const keywordPostHandler = () => {
    let themaId;
    let placeId;
    let keyword;

    if (isKeyword && isKeyword[0]) themaId = isKeyword[0].id;
    else themaId = 0;

    if (isKeyword && isKeyword[1]) placeId = isKeyword[0].id;
    else placeId = 0;

    if (randomKeyword && randomKeyword) keyword = randomKeyword;
    else keyword = '';

    setIsURL &&
      setIsURL(`main/search/${themaId}/${placeId}?page=1&keyword=${keyword}`);
    // main/
    // search/
    // {themaId}/{placeId}?
    // page=1&keyword=”충청”
  };
  // const requestKeyPress = (e: KeyboardEventHandler<HTMLInputElement>) => {
  //     if (e.key === 'Enter') {
  //     }
  //   };
  // }
  return (
    <Container view={view}>
      <Main input={input} place={place} size={size}>
        <div style={{ display: 'flex' }}>
          {isClicked ? (
            <div className="back" onClick={() => {}}>
              <FiArrowLeft />
            </div>
          ) : null}
          <div
            className="input_field"
            onClick={e => {
              e.stopPropagation();
              dispatch(click(true));
            }}
          >
            <HiOutlineSearch
              className="search_icon"
              onClick={e => {
                e.stopPropagation();
                keywordPostHandler();
                dispatch(click(false));
                navigate('/');
              }}
            />
            <ul className="keywords">
              {isKeyword &&
                isKeyword.map(keyword => {
                  return (
                    <li key={keyword.id} className="keyword_box">
                      <span className="keyword_title">{keyword.keyword}</span>
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
            {isKeyword.length === 0 ? (
              <input onChange={randomKeywordHandler} placeholder="검색"></input>
            ) : (
              <input className="hidden"></input>
            )}
          </div>
        </div>
      </Main>
      <SearchModal />
    </Container>
  );
}

export default HeaderSearch;
