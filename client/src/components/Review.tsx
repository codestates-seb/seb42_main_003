import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getReview } from '../api/api';
import { AiFillStar } from 'react-icons/ai';
const Container = styled.div`
  .top {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 7px;
  }
  .top_mid {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 10px;
  }
  img {
    width: 36px;
    border-radius: 100%;
    margin-right: 10px;
  }
  .top_right {
    display: flex;
    flex-direction: row;
    .star {
      color: var(--orange__color);
      font-size: 20px;
      margin-right: 2px;
    }
    .grade {
      margin-top: 2px;
      font-size: var(--fs__mid);
    }
  }
  .bottom {
    line-height: 1.2;
    margin-bottom: 20px;
  }
`;

function Review() {
  const [isReview, setIsReview] = useState<any>([]);
  useEffect(() => {
    getReview().then(res => setIsReview(res));
  }, []);
  return (
    <Container>
      {isReview.map((ele: any) => {
        return (
          <>
            <div className="top">
              <img src={ele.image} alt="img"></img>
              <div className="top_mid">
                <div>{ele.user}</div>
                <div>{ele.createAt}</div>
              </div>
              <div className="top_right">
                <AiFillStar className="star" />
                <div className="grade">{ele.grade}</div>
              </div>
            </div>
            <p className="bottom">{ele.body}</p>
          </>
        );
      })}
    </Container>
  );
}

export default Review;
