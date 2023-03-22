import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getReview, getCommunity } from '../api/api';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';
import { BsTextCenter } from 'react-icons/bs';
import { FcLikePlaceholder } from 'react-icons/fc';
import { FcLike } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Container = styled.div`
  .post {
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
  .post_bottom {
    line-height: 1.2;
    margin-bottom: 20px;
    @media (min-width: 768px) {
      display: none;
    }
  }
  .post_body {
    padding: 5px 0 0 10px;
    font-size: 16px;
    color: var(--fontBlack__600);
    font-weight: 500;
    @media (max-width: 768px) {
      display: none;
    }
  }
  .post_left {
    @media (min-width: 768px) {
      display: flex;
      flex-direction: row;
    }
  }
  .date {
    padding-top: 3px;
    color: var(--fontBlack__400);
  }
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 12px;
    width: 100%;
  }
  .header_left {
    display: flex;
    flex-direction: row;
  }
  .header_right {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;
    justify-content: space-between;
  }
  .field {
    flex-grow: 1;
    width: 3em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 80%;
    /* margin-left: 0.5em; */
    &.heart {
      :hover {
        cursor: pointer;
        background-color: #f4f2f1;
        border-radius: 16px;
      }
    }
  }
  span {
    margin-top: 2px;
    font-size: var(--fs__small);
    margin-left: 3px;
  }

  .wrap {
    margin: 25px 0;
    border-bottom: 2px solid #ebe1dd;
  }
  .post_icon {
    font-size: 16px;
    &.active {
      color: var(--chamong__color);
    }
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
  return (
    <Container className="post">
      {isCommunity.map((ele: any) => {
        return (
          <div key={ele.id} className="wrap">
            <div className="header">
              <div className="post_left">
                <div className="header_left">
                  <img src={ele.image} alt="img"></img>
                  <div className="top_mid">
                    <div>{ele.user}</div>
                    <div className="date">{ele.createdAt}</div>
                  </div>
                </div>
                <p className="post_body">
                  <Link to={`/community/${ele.id}`}>{ele.title}</Link>
                </p>
              </div>
              <div className="header_right">
                <div className="field">
                  <AiOutlineEye className="post_icon" />
                  <span>{ele.views}</span>
                </div>
                <div className="field">
                  <BsTextCenter className="post_icon" />
                  <span>{ele.comment}</span>
                </div>
                <div className="field heart">
                  {ele.islike ? (
                    <FcLike className="post_icon" />
                  ) : (
                    <FcLikePlaceholder className="post_icon" />
                  )}
                  <span>{ele.like}</span>
                </div>
              </div>
            </div>
            <p className="post_bottom">
              <Link to={`/community/${ele.id}`}>{ele.title}</Link>
            </p>
          </div>
        );
      })}
    </Container>
  );
}
