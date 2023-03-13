import styled from 'styled-components';
import { Button } from '../styles/Button';
import { useState } from 'react';
import { areas, themes } from '../datas/areas';
import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { MdOutlineRateReview } from 'react-icons/md';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  border: 1px solid white;
  border-radius: 50px 50px 50px 50px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  img {
    width: 100%;
    height: 30%;
    object-fit: contain;
    margin-bottom: 10px;
    border-radius: 50px 50px 0px 0px;
  }
  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .card_bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    padding: 0px 130px;
  }
  .box {
    display: flex;
    flex-direction: row;
  }
  h1 {
    color: var(--fontBlack__700);
    font-size: var(--fs__h1);
    font-weight: 500;
    margin-bottom: 5px;
  }
  .adress {
    font-size: var(--fs__big);
    color: var(--fontBlack__400);
    margin-bottom: 12px;
    font-weight: 400;
  }
  .body {
    font-size: var(--fs__big);
    color: var(--fontBlack__700);
    margin-bottom: 10px;
    font-weight: 400;
  }
  .icon {
    font-size: var(--fs__big);
    color: var(--fontBlack__700);
    font-weight: 400;
  }
  .text {
    margin-left: 5px;
    font-size: var(--fs__big);
    color: var(--fontBlack__700);
    font-weight: 400;
  }
`;

function ContentList() {
  return (
    <Container>
      <img
        src="https://gocamping.or.kr/upload/camp/11/thumb/thumb_720_4031mKP95kUbSSBNbq5bSC5o.jpg"
        alt="img"
        sizes="160"
      />
      <div className="content">
        <h1>양촌여울체험캠프</h1>
        <div className="adress">강원도 원주시</div>
        <div className="body">침대에서 누워 즐기는 홍천강 풍경</div>
        <div className="card_bottom">
          <div className="box">
            <div className="icon">
              <AiFillStar size="20px" style={{ color: 'FF9F1C' }} />
            </div>
            <div className="text">4.5</div>
          </div>
          <div className="box">
            <div className="icon">
              <MdOutlineRateReview size="20px" />
            </div>
            <div className="text">3</div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ContentList;
