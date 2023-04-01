import styled from 'styled-components';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/reduxTK';
import { getDataTs } from '../../api/tsapi';
import { Link, useNavigate } from 'react-router-dom';

interface CardList {
  data?: string[];
}

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
    padding: 20px 10px 13px 10px;
  }
  h1 {
    font-weight: 600;
    font-size: 16px;
    color: var(--fontBlack__600);
    margin: 0 0 15px 10px;
  }
  .tag {
    align-self: center;
    color: var(--fontBlack__600);
    font-weight: 500;
    font-size: 12px;
  }
  .list_box {
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
    margin-bottom: 10px;
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
      cursor: pointer;
    }
  }
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 15px;
  }
  .body {
    font-size: 13px;
    color: var(--fontBlack__700);
    font-weight: 500;
    line-height: 1.2;
    padding: 3px 0;
  }
  .icon {
    color: var(--chamong__color);
    font-size: 25px;
    cursor: pointer;
  }
  hr {
    width: 50%;
    height: 50px;
    background-color: pink;
  }
  span {
    margin-left: 5px;
  }
`;
// const content = [
//   {
//     id: 1,
//     title: '양양 차박지',
//     tag: ['낚시', '여름'],
//   },
//   {
//     id: 2,
//     title: '거제도 해변',
//     tag: ['반려동물', '섬'],
//   },
//   {
//     id: 3,
//     title: '부산 해운대 근처',
//     tag: ['해변', '전기'],
//   },
// ];

function MyPick({}: CardList) {
  const [content, setContent] = useState<MyPlaceInfo[]>();
  const login = useAppSelector(state => state.isLogin);
  useEffect(() => {
    if (login) {
      getDataTs('pick-places/member').then(res => {
        if (res) setContent(res);
      });
    }
  }, []);
  const navigate = useNavigate();
  return (
    <Container>
      <h1>내가 찾은 차박지</h1>
      <div className="content_box">
        <div className="top">
          <div className="body">
            내가 찾은 차박지를 등록하고<br></br> 사람들과 공유해보세요
          </div>
          <Link to="/mypage">
            <BsFillPlusCircleFill
              onClick={() =>
                login ? navigate('/mypage') : alert('로그인을 해주세요')
              }
              className="icon"
            />
          </Link>
        </div>
        {content?.map(data => {
          return (
            <ul key={data.id} className="list_box">
              <div className="like_box">
                <p>{data.address}</p>
              </div>
              <li className="tag">
                <div className="tag">{data.keyword?.join(', ')}</div>
              </li>
            </ul>
          );
        })}
      </div>
    </Container>
  );
}

export default MyPick;
