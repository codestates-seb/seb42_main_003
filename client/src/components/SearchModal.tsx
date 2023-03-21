import styled from 'styled-components';
import { Button } from '../styles/Button';
import { useState, useEffect } from 'react';
import { MouseEvent } from 'react';
import { getArea, getTheme } from '../api/api';
import { useAppSelector, useAppDispatch } from '../hooks/reduxTK';
import { add, remove } from '../store/keywordSlice';

const Container = styled.div`
  @media (max-width: 768px) {
    padding: 10px;
    margin-top: -15px;
  }
`;

const Main = styled.div`
  @media (min-width: 768px) {
    padding: 100px 10px;
    width: 390px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 900;
    opacity: 90%;
  }
  &.active {
    transition: all 700ms linear;
  }
  &.hidden {
    position: absolute;
    left: -100%;
    top: 0;
    bottom: 0;
    right: 100%;
    transition: all 1000ms linear;
    opacity: 0;
  }
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  .back {
    font-size: 35px;
    margin-top: 12px;
    color: var(--fontBlack__600);
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

const Section = styled.div`
  .title {
    font-size: var(--fs__h1);
    font-weight: 600;
    color: var(--fontBlack__700);
    margin: 15px 0 5px 5px;
  }
  .button_box {
    margin-bottom: 30px;
  }
`;

function SearchModal() {
  useEffect(() => {
    getArea().then(res => setArea(res));
    getTheme().then(res => setTheme(res));
  }, []);

  //* id값으로 number 타입 지정이 안됨.
  //* 백엔드로 넘길 때 키워드들 number 타입으로 바꿔서 보내기.
  const dispatch = useAppDispatch();
  type Area = { id: number; keyword: string | null };
  type CustomMouseEvent = MouseEvent<HTMLElement>;

  const [areas, setArea] = useState<Area[]>([]);
  const [themes, setTheme] = useState<Area[]>([]);

  const clickHandler = (event: CustomMouseEvent) => {
    const newData = {
      id: (event.target as HTMLLIElement).id,
      keyword: (event.target as HTMLLIElement).textContent,
    };
    dispatch(add(newData));

    // if (
    //   isKeyword.length < 3 &&
    //   isKeyword.filter(data => data.title === newData.title).length !== 1
    // )
    // setIsKeyword([...isKeyword, newData]);
  };
  const isKeyword = useAppSelector(state => state.keyword);
  const isClicked = useAppSelector(state => state.clicked);

  return (
    <Container onClick={e => e.stopPropagation()}>
      <Main className={isClicked ? 'active' : 'hidden'}>
        <Section>
          <div className="title_field">
            <h1 className="title">지역</h1>
          </div>
          <div className="button_box">
            {areas &&
              areas.map(area => {
                return (
                  <Button
                    key={area.id}
                    id={String(area.id)}
                    onClick={clickHandler}
                    className={
                      isKeyword.filter(keyword => {
                        return keyword.keyword === area.keyword;
                      }).length !== 0
                        ? 'active'
                        : ''
                    }
                  >
                    {area.keyword}
                  </Button>
                );
              })}
          </div>
        </Section>
        <Section>
          <div>
            <h1 className="title">키워드</h1>
          </div>
          <div className="button_box">
            {themes &&
              themes.map(theme => {
                return (
                  <Button
                    key={theme.id}
                    id={String(theme.id)}
                    onClick={clickHandler}
                    className={
                      isKeyword.filter(keyword => {
                        return keyword.keyword === theme.keyword;
                      }).length !== 0
                        ? 'active'
                        : ''
                    }
                  >
                    {theme.keyword}
                  </Button>
                );
              })}
          </div>
        </Section>
      </Main>
    </Container>
  );
}

export default SearchModal;
