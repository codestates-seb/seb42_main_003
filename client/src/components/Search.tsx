import styled from 'styled-components';
import { Button } from '../styles/Button';
import { useState } from 'react';
import keywords from '../datas/keywords.json';
import { MouseEvent } from 'react';

const Container = styled.div`
  padding: 10px;
  height: 100vh;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;

  .input_field {
    border: 1px solid black;
    height: 50px;
    padding-left: 10px;
  }
  input {
    height: 50px;
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

function Search() {
  type Info = string;
  const [isClicked, setIsClicked] = useState(false);
  const [isKeyword, setIsKeyword] = useState<Info[]>([]);
  type CustomMouseEvent = MouseEvent<HTMLElement>;

  const clickHandler = (event: CustomMouseEvent) => {
    // const newData = (event.target as HTMLLIElement).textContent;
    // setIsKeyword([...isKeyword, newData]);
  };
  // const removeTags = index => console.log(index);
  // interface Areas {
  //   id: number;
  //   keyword: string;
  // }
  // [];
  console.log(isKeyword);
  return (
    <Container>
      <Main>
        <div style={{ display: 'flex' }}>
          <Button onClick={() => setIsClicked(false)}>⬅️</Button>
          <div className="input_field">
            {/* <ul id="tags">
              {isKeyword &&
                isKeyword.map((keyword, index) => (
                  <li key={index} className="addTag_box">
                    <span className="tag-title">{keyword}</span>
                    <span
                      className="tag-close-icon"
                      // onClick={() => removeTags(index)}
                    >
                      &times;
                    </span>
                  </li>
                ))}
            </ul> */}
            <div>{isKeyword}</div>
            <input
              style={{ width: '300px' }}
              onClick={e => {
                e.stopPropagation();
                setIsClicked(true);
              }}
            ></input>
          </div>
        </div>
        {isClicked ? (
          <>
            <Section>
              <div className="title_field">
                <h1 className="title">지역</h1>
              </div>
              <div className="button_box">
                {/* {keywords.map((value: {id: number; keyword: string;}, index: number, array: {id: number; keyword: string; }[]) => {
                  <Button key={area.id}>{area.title}</Button>;
                })} */}
                {/* <div>{keywords.keyword}</div> */}
                <Button id="1" onClick={clickHandler}>
                  서울
                </Button>
                <Button id="2">대구/경북</Button>
                <Button id="3">강원</Button>
                <Button id="4">경기/인천</Button>
                <Button id="5">광주/전라</Button>
                <Button id="6">대전/충청</Button>
                <Button id="7">제주</Button>
                <Button id="8">부산/경남</Button>
              </div>
            </Section>
            <Section>
              <div>
                <h1 className="title">키워드</h1>
              </div>
              <div className="button_box">
                <Button id="1">화장실</Button>
                <Button id="2">산</Button>
                <Button id="3">강</Button>
                <Button id="4">섬</Button>
                <Button id="5">숲</Button>
                <Button id="6">호수</Button>
                <Button id="7">해변</Button>
                <Button id="8">와이파이</Button>
                <Button id="9">전기</Button>
                <Button id="10">운동시설</Button>
                <Button id="11">물놀이</Button>
                <Button id="12">마트</Button>
                <Button id="13">편의점</Button>
                <Button id="14">체험활동</Button>
                <Button id="15">낚시</Button>
                <Button id="16">반려동물</Button>
                <Button id="17">운영중</Button>
              </div>
            </Section>
          </>
        ) : (
          <></>
        )}
      </Main>
    </Container>
  );
}

export default Search;
