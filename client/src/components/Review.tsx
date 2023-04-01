import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';
import { BsTextCenter } from 'react-icons/bs';
import { FcLikePlaceholder } from 'react-icons/fc';
import { BsFillPencilFill } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import { FcLike } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/reduxTK';
import { edit } from '../store/reviewSlice';
import { Button } from '../styles/Button';
import { Modal } from '../styles/Modal';
import { ReviewSubmit } from './ReviewSubmit';
import { useState, useEffect } from 'react';
import { timeParser } from '../utils/timeParser';
import { getDataTs, sendDataTs } from '../api/tsapi';

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
    justify-content: space-between;
    margin-bottom: 13px;
  }
  .right {
    display: flex;
    flex-direction: row;
    font-size: 14px;
    height: 100%;
    svg {
      cursor: pointer;
      margin-left: 5px;
      fill: var(--fontBlack__600);
    }
    .delete {
      font-size: 15px;
    }
  }
  .top_mid {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    margin-right: 10px;
  }
  img {
    width: 40px;
    height: 40px;
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
    /* margin-bottom: 20px; */
    @media (min-width: 768px) {
      display: none;
    }
  }
  .post_body {
    padding: 8px 0 0 10px;
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
    /* margin-top: 2px; */
    font-size: var(--fs__small);
    margin-left: 3px;
  }

  .wrap {
    padding: 25px 0;
    border-bottom: 2px solid #ebe1dd;
  }
  .post_icon {
    font-size: 16px;
    &.active {
      color: var(--chamong__color);
    }
    .heart_icon {
      fill: var(--chamong__color);
    }
  }
  .edit {
    text-align: right;
  }
  .left {
    display: flex;
  }
`;
type ReviewType =
  | {
      reviewId: number;
      createdAt: string;
      updatedat: string;
      contend: string;
      rating: number;

      id: number;
      image: string;
      user: string;
      setIsModal: (foo: any) => void;
      isContent?: any;
    }
  | any;
export function Review({ isReview, setIsModal }: ReviewType) {
  // const [isModal, setIsModal] = useState(false);
  const dispatch = useAppDispatch();
  const [memberId, setMemberId] = useState();
  const login = useAppSelector(state => state.isLogin);
  const reviewDeleteHandler = () => {
    sendDataTs(`review/${isReview.id}`, 'delete', {}).then(res =>
      console.log(res)
    );
  };
  useEffect(() => {
    if (login)
      getDataTs(`members/token`).then(res => {
        if (res) setMemberId(res.id);
      });
  });

  return (
    <Container className="post">
      <div key={isReview.id} className="top">
        <div className="left">
          <img src={isReview.member?.profileImg} alt="img"></img>
          <div className="top_mid">
            <div>{isReview.member?.nickname}</div>
            <div className="date">{timeParser(isReview.createdAt)}</div>
          </div>
          <div className="top_right">
            <AiFillStar className="star" />
            <div className="grade">{isReview.rating}</div>
          </div>
        </div>
        {isReview.member.id === memberId ? (
          <div className="right">
            <BsFillPencilFill
              onClick={() => {
                dispatch(edit(isReview));
                setIsModal(true);
              }}
            />
            <AiFillDelete className="delete" onClick={reviewDeleteHandler} />
          </div>
        ) : null}
      </div>
      <p className="bottom">{isReview.content}</p>
    </Container>
  );
}

type Community = {
  data: ArticleType;
};
export function Post({ data }: Community) {
  return (
    <Container className="post">
      {/* {isCommunity.map((ele: any) => { */}
      <div key={data.id} className="wrap">
        <div className="header">
          <div className="post_left">
            <div className="header_left">
              <img src={data.profileImg} alt="img"></img>
              <div className="top_mid">
                <div>{data.nickname}</div>
                <div className="date">{timeParser(data.createdAt)}</div>
              </div>
            </div>
            <p className="post_body">
              <Link to={`/community/${data.id}`}>{data.title}</Link>
            </p>
          </div>
          <div className="header_right">
            <div className="field">
              <AiOutlineEye className="post_icon" />
              <span>{data.viewCnt}</span>
            </div>
            <div className="field">
              <BsTextCenter className="post_icon" />
              <span>{data.commentCnt}</span>
            </div>
            <div className="field heart">
              {!data.isLiked ? (
                <FcLikePlaceholder className="post_icon" />
              ) : (
                <FcLike className="post_icon" />
              )}
              <span>{data.likeCnt}</span>
            </div>
          </div>
        </div>
        <p className="post_bottom">
          <Link to={`/community/${data.id}`}>{data.title}</Link>
        </p>
      </div>
    </Container>
  );
}
