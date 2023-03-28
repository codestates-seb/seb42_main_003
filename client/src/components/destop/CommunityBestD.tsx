import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getDataTs } from '../../api/tsapi';

interface CardList {
  data?: string[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 14px;
  margin-top: 10px;
  margin-bottom: 50px;
  @media (max-width: 768px) {
    display: none;
  }
  .content_box {
    height: auto;
    border: 0.5px solid var(--fontBlack__500);
    border-radius: 16px;
    padding: 20px 10px 13px 10px;
  }
  h1 {
    font-weight: 600;
    font-size: 16px;
    color: var(--fontBlack__600);
    margin: 0 0 15px 10px;
  }
  .title {
    align-self: center;
    color: var(--fontBlack__600);
    font-weight: 500;
    font-size: 13px;
    list-style: disc;
    line-height: 1.2;
    cursor: pointer;
  }
  .list_box {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    margin-bottom: 10px;
    margin-left: 15px;
  }
  .like_box {
    align-self: center;
    display: flex;
    border-radius: 5px;
    p {
      align-self: center;
      font-size: 12px;
      color: var(--fontBlack__600);
      font-weight: 500;
      margin: 0 5px 0 5px;
    }
  }
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    object-fit: cover;
  }
`;

function CommunityBestD({}: CardList) {
  const [isCommunity, setIsCommunity] = useState<ArticleType[]>([]);
  useEffect(() => {
    getDataTs('articles/popular-web').then(res => {
      if (res) setIsCommunity(res);
    });
  }, []);
  return (
    <Container>
      <h1>커뮤니티 인기글</h1>
      <div className="content_box">
        {isCommunity.map(data => {
          return (
            <ul key={data.id} className="list_box">
              {/* <div className="like_box">
                <img src={data.profileImg} alt="cat" className="avatar"></img>
                <p>{data.nickname}</p>
              </div> */}
              <li className="title">{data.content}</li>
            </ul>
          );
        })}
      </div>
    </Container>
  );
}

export default CommunityBestD;
