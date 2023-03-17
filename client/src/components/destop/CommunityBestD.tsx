import styled from 'styled-components';
import { useState } from 'react';
import { BiLike } from 'react-icons/bi';
import avatarCat from '../../assets/avatarCat.png';

interface CardList {
  data?: string[];
  // content: {
  //   id: number;
  //   title: string;
  //   like: number;
  // }[];
}

// const Container = styled('div')<CardList>`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 14px;
  margin-top: 10px;
  @media (max-width: 768px) {
    display: none;
  }
  .content_box {
    height: auto;
    border: 0.5px solid var(--fontBlack__500);
    border-radius: 16px;
    padding: 25px 10px;
  }
  h1 {
    font-weight: 600;
    font-size: 20px;
    color: var(--fontBlack__600);
    margin: 0 0 15px 10px;
  }
  .title {
    align-self: center;
    color: var(--fontBlack__600);
    font-weight: 500;
    font-size: 15px;
  }
  .list_box {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    margin-bottom: 20px;
  }
  .like_box {
    align-self: center;
    /* border: 2px solid var(--chamong__color); */
    /* background-color: var(--chamong__color); */
    display: flex;
    border-radius: 5px;
    p {
      align-self: center;
      font-size: 13px;
      color: var(--fontBlack__600);
      font-weight: 500;
      margin: 0 5px 0 5px;
    }
    .like_icon {
      font-size: 19px;
      fill: var(--chamong__color);
    }
  }
  .avatar {
    width: 35px;
    height: 35px;
    border-radius: 100%;
    object-fit: cover;
  }
`;
const content = [
  {
    id: 1,
    title: '낚시할 수 있는 차박지 추천해주세요',
    author: '차몽',
  },
  {
    id: 2,
    title: '낚시할 수 있는 차박지 추천해주세요',
    author: '차몽',
  },
  {
    id: 3,
    title: '낚시할 수 있는 차박지 추천해주세요',
    author: '차몽',
  },
  {
    id: 4,
    title: '낚시할 수 있는 차박지 추천해주세요',
    author: '차몽',
  },
  {
    id: 5,
    title: '낚시할 수 있는 차박지 추천해주세요',
    author: '차몽',
  },
];

function CommunityBestD({}: CardList) {
  return (
    <Container>
      <h1>커뮤니티 인기글</h1>
      <div className="content_box">
        {content.map(data => {
          return (
            <ul className="list_box">
              <div className="like_box">
                <img src={avatarCat} alt="cat" className="avatar"></img>
                <p>{data.author}</p>
              </div>
              <li className="title">{data.title}</li>
            </ul>
          );
        })}
      </div>
    </Container>
  );
}

export default CommunityBestD;
