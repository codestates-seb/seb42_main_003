import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../hooks/reduxTK';
import { AiFillStar } from 'react-icons/ai';
import { Button } from '../styles/Button';
import { reset } from '../store/reviewSlice';
import { getDataTs } from '../api/tsapi';
import { useLocation } from 'react-router-dom';
export const Container = styled.div`
  @media (max-width: 768px) {
    .review_input_header {
      display: flex;
      flex-direction: column-reverse;
      justify-content: space-between;
      align-items: center;
    }
    .userInfo {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: start;
      padding: 10px 0;
    }
    .question {
      padding-bottom: 10px;
    }
    .button_field {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      justify-content: center;
    }
  }
  @media (min-width: 768px) {
    .review_input_header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .userInfo {
      display: flex;
      flex-direction: row;
      padding: 10px 0;
    }
    .button_field {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      justify-content: flex-end;
    }
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    margin-right: 10px;
  }
  .review_input {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    width: 100%;
    height: 100%;
    /* border: 2px solid #black; */
    border-radius: 16px;
  }
  textarea {
    align-self: center;
    padding-left: 10px;
    padding-top: 10px;
    width: 100%;
    height: 10em;
    border: 1px solid #eae5e2;
    border-radius: 5px;
    margin-bottom: 12px;
    ::placeholder {
      text-align: start;
    }
  }
  p {
    font-weight: 500;
    font-size: var(--fs__big);
    padding-top: 8px;
  }
`; //font-size: ${props => props.fs || var(--fs__mid)};
export const RatingBox = styled.div`
  padding-left: 10px;

  & svg {
    color: #c4c4c4;
    cursor: pointer;
  }
  :hover svg {
    color: var(--orange__color);
  }
  & svg:hover ~ svg {
    color: #c4c4c4;
  }
  .black {
    color: var(--orange__color);
  }
`;
export function ReviewSubmit() {
  const dispatch = useAppDispatch();
  const edit = useAppSelector(state => state.review);
  useEffect(() => {
    setIsEdit(edit);
    handleStarClick(edit.grade - 1);
  }, [edit]);

  const [clicked, setClicked] = useState<boolean[] | any>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const { pathname } = useLocation();

  type ReviewType = {
    id: number;
    image: string;
    user: string;
    createdAt: string;
    grade: number;
    body: string;
  };
  const [isEdit, setIsEdit] = useState<ReviewType>(edit);
  const array = [0, 1, 2, 3, 4];
  const input = useRef(null);

  const handleStarClick = (index: number) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  const score = clicked.filter(Boolean).length;
  const submitHandler = () => {
    getDataTs(`main/${pathname}`).then(res => console.log(res));
  };
  return (
    <Container>
      <div className="review_input">
        <div className="review_input_header">
          <div className="userInfo">
            <img
              src="https://cdn.pixabay.com/photo/2022/08/17/07/10/strawberries-7391738_1280.jpg"
              alt="img"
            ></img>
            <p>차몽</p>
          </div>
          <div className="rating">
            <p className="question">여행은 어떠셨나요?</p>
            <RatingBox>
              {array.map(el => (
                <AiFillStar
                  key={el}
                  onClick={() => handleStarClick(el)}
                  className={clicked[el] && 'black'}
                  size="20px"
                />
              ))}
            </RatingBox>
          </div>
        </div>
        <div className="text_box">
          <textarea
            placeholder="내용을 작성해주세요"
            ref={input}
            value={isEdit.body}
            onChange={e => setIsEdit({ ...isEdit, body: e.target.value })}
          ></textarea>
        </div>
      </div>
      <div className="button_field">
        <div className="button_wrap">
          <Button
            margin="-5px 0"
            padding="8px 15px"
            border="var(--chamong__color)"
            color="white"
            bg="var(--chamong__color)"
            hover="white"
            hcolor="var(--chamong__color)"
            hborder="var(--chamong__color)"
            font="12px"
            onClick={submitHandler}
          >
            {isEdit.id ? '수정' : '등록'}
          </Button>
        </div>
      </div>
    </Container>
  );
}
