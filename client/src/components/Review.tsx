import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getReview, getCommunity } from '../api/api';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';
import { BsTextCenter } from 'react-icons/bs';
import { BiLike } from 'react-icons/bi';

const Container = styled.div`
  .review {
    @media (min-width: 768px) {
      display: grid;
      gap: 17px 50px;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      margin-bottom: 90px;
    }
  }
  .top {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 13px;
  }
  .top_mid {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
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
  .date {
    padding-top: 3px;
    color: var(--fontBlack__400);
  }
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 15px;
    /* position: relative; */
    width: 100%;
  }
  .header_left {
    display: flex;
    flex-direction: row;
  }
  .header_right {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* position: absolute;
    left: 62%; */
  }
  .field {
    flex-grow: 1;
    width: 3em;
    display: flex;
    flex-direction: row;
    justify-self: flex-start;
    margin-left: 0.5em;
  }
  span {
    margin-top: 2px;
    font-size: var(--fs__small);
    margin-left: 3px;
  }
  .active {
    color: var(--chamong__color);
  }
  .wrap {
    margin: 25px 0;
    border-bottom: 2px solid #ebe1dd;
  }
`;

export function Review() {
  const [isReview, setIsReview] = useState<any>([]);
  useEffect(() => {
    getReview().then(res => setIsReview(res));
  }, []);
  return (
    <Container>
      {isReview.map((ele: any) => {
        return (
          <div key={ele.id}>
            <div className="top">
              <img src={ele.image} alt="img"></img>
              <div className="top_mid">
                <div>{ele.user}</div>
                <div className="date">{ele.createdAt}</div>
              </div>
              <div className="top_right">
                <AiFillStar className="star" />
                <div className="grade">{ele.grade}</div>
              </div>
            </div>
            <p className="bottom">{ele.body}</p>
          </div>
        );
      })}
    </Container>
  );
}

export function Post() {
  const [isCommunity, setIsCommunity] = useState<any>([]);
  useEffect(() => {
    getCommunity().then(res => setIsCommunity(res));
  }, []);
  return (
    <Container className="review">
      {isCommunity.map((ele: any) => {
        return (
          <div key={ele.id} className="wrap">
            <div className="header">
              <div className="header_left">
                <img src={ele.image} alt="img"></img>
                <div className="top_mid">
                  <div>{ele.user}</div>
                  <div className="date">{ele.createdAt}</div>
                </div>
              </div>
              <div className="header_right">
                <div className="field">
                  <AiOutlineEye style={{ fontSize: '16px' }} />
                  <span>{ele.views}</span>
                </div>
                <div className="field">
                  <BsTextCenter style={{ fontSize: '16px' }} />
                  <span>{ele.comment}</span>
                </div>
                <div className="field">
                  <BiLike
                    style={{ fontSize: '16px' }}
                    className={ele.islike ? 'active' : ''}
                  />
                  <span>{ele.like}</span>
                </div>
              </div>
            </div>
            <p className="bottom">{ele.title}</p>
          </div>
        );
      })}
    </Container>
  );
}
