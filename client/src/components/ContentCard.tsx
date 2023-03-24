import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { MdOutlineRateReview } from 'react-icons/md';
import { BsFillPencilFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { RiShareBoxLine } from 'react-icons/ri';
import { getData } from '../api/api';
import { Button } from '../styles/Button';
import { CiHashtag } from 'react-icons/ci';
import { Modal } from '../styles/Modal';

interface CardView {
  //
  fs_h1?: string;
  body?: string;
  like?: string;
  data?: any;
  key?: any;
  bg?: URL;
  maxWidth?: string;
  remove?: string;
  edit?: string;
}

const Container = styled('div')<CardView>`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: auto;
  border-radius: 25px;
  background-image: url('https://gocamping.or.kr/upload/camp/100358/thumb/thumb_720_3006GPoZLjm1dpqwhevGKAPR.jpg');
  background-size: cover;

  .content {
    width: auto;
    flex: 0.5;
    border-radius: 0px 0px 25px 25px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 15px 15px 15px;
    position: relative;
    .delete {
      position: absolute;
      top: 6%;
      right: 6%;
      cursor: pointer;
      font-size: 15px;
      /* align-self: flex-end; */
      &.remove {
        display: ${props => props.remove || 'none'};
        /* display: inline; */
      }
    }
  }
  .img_box {
    position: relative;
    height: 120px;
    background-image: ${props => `url(${props.bg})`};
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 25px 25px 0px 0px;
    .heart {
      position: absolute;
      right: 8%;
      top: 8%;
      width: 30px;
      stroke: white;
      stroke-width: 2px;
      z-index: 1;
      fill: white;
      fill-opacity: 0;
    }
    .active {
      position: absolute;
      right: 8%;
      top: 8%;
      width: 30px;
      stroke: white;
      stroke-width: 2px;
      z-index: 1;
      fill: var(--chamong__color);
      fill-opacity: 1;
    }
  }
  .card_bottom {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
  .box {
    display: flex;
    flex-direction: row;
  }
  h1 {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    color: var(--fontBlack__700);
    font-size: ${props => props.fs_h1 || '20px'};
    font-weight: 500;
    margin: 8px 0;
  }
  .adress {
    font-size: ${props => props.body || 'var(--fs__mid)'};
    color: var(--fontBlack__400);
    margin-bottom: 8px;
    font-weight: 400;
  }
  .body {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: nowrap;
    word-break: break-all;
    font-size: ${props => props.body || 'var(--fs__small)'};
    color: var(--fontBlack__700);
    margin-bottom: 10px;
    font-weight: 400;
    line-height: 1;
    text-align: center;
  }
  .icon {
    font-size: ${props => props.body || 'var(--fs__mid)'};
    color: var(--fontBlack__700);
    font-weight: 400;
  }
  .text {
    margin-left: 5px;
    font-size: ${props => props.body || 'var(--fs__mid)'};
    color: var(--fontBlack__700);
    font-weight: 400;
    &.mg12 {
      margin-right: 15px;
    }
  }
`;
export function ContentCard({ data, remove }: CardView) {
  const [isLike, setIsLike] = useState(false);
  return (
    <Link to={`/content/${data.contentId}`} style={{ width: '100%' }}>
      <Container remove={remove} bg={data.firstImageUrl}>
        <div key={data.contentId} className="img_box">
          <svg
            viewBox="0 0 24 24"
            className={!isLike ? 'heart' : 'active'}
            fill="none"
            onClick={e => {
              e.preventDefault();
              setIsLike(!isLike);
            }}
          >
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" />
          </svg>
        </div>
        <div className="content">
          <AiFillDelete className="delete remove" />
          <h1>{data.facltNm}</h1>
          <div className="adress">
            {data.doNm} {data.sigunguNm}
          </div>
          <div className="body">
            {data.lineIntro.length !== 0
              ? data.lineIntro
              : data.themaEnvrnCl.length !== 0
              ? data.themaEnvrnCl
              : data.featureNm.length !== 0
              ? data.featureNm
              : `${data.facltNm}입니다.`}
          </div>
          <div className="card_bottom">
            <div className="box">
              <div className="icon">
                <AiFillStar size="20px" style={{ color: 'FF9F1C' }} />
              </div>
              <div className="text mg12">4.5</div>
            </div>
            <div className="box">
              <div className="icon">
                <MdOutlineRateReview size="20px" />
              </div>
              <div className="text">{data.contendId}</div>
            </div>
          </div>
        </div>
      </Container>
    </Link>
  );
}

const ContainerRow = styled('div')<CardView>`
  display: flex;
  flex-direction: row;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: auto;
  border-radius: 25px;
  background-image: url('https://gocamping.or.kr/upload/camp/100358/thumb/thumb_720_3006GPoZLjm1dpqwhevGKAPR.jpg');
  background-size: cover;

  .content {
    width: 50%;
    flex: 0.5;
    border-radius: 0px 25px 25px 0px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
    position: relative;
    :hover {
      background-color: red;
    }
    .delete {
      position: absolute;
      top: 6%;
      right: 6%;
      cursor: pointer;
      font-size: 16px;
      color: var(--fontBlack__600);
      /* align-self: flex-end; */
      &.remove {
        display: ${props => props.remove || 'none'};
        /* display: inline; */
      }
      &.edited {
        display: ${props => props.edit || 'none'};
        right: 16%;
        font-size: 15px;
      }
    }
  }
  .img_box {
    flex: 0.5;
    position: relative;
    height: auto;
    width: auto;
    background-image: ${props => `url(${props.bg})`};
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 25px 0px 0px 25px;
    .heart {
      display: ${props => props.like || 'block'};
      position: absolute;
      right: 8%;
      top: 8%;
      width: 30px;
      stroke: white;
      stroke-width: 2px;
      z-index: 1;
      fill: white;
      fill-opacity: 0;
    }
    .active {
      display: ${props => props.like || 'block'};
      position: absolute;
      right: 8%;
      top: 8%;
      width: 30px;
      stroke: white;
      stroke-width: 2px;
      z-index: 1;
      fill: var(--chamong__color);
      fill-opacity: 1;
    }
  }
  .card_bottom {
    display: flex;
    flex-direction: row;
    justify-content: start;
    width: 100%;
  }
  .box {
    display: flex;
    flex-direction: row;
  }
  h1 {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    color: var(--fontBlack__700);
    font-size: ${props => props.fs_h1 || '20px'};
    font-weight: 500;
    margin: 8px 0;
  }
  .adress {
    font-size: ${props => props.body || 'var(--fs__mid)'};
    color: var(--fontBlack__400);
    margin-bottom: 8px;
    font-weight: 400;
  }
  .body {
    flex-grow: 1;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: wrap;
    word-break: break-all;
    font-size: ${props => props.body || 'var(--fs__small)'};
    color: var(--fontBlack__700);
    margin-bottom: 10px;
    font-weight: 400;
    line-height: 1.2;
    /* text-align: center; */
  }
  .icon {
    font-size: ${props => props.body || 'var(--fs__mid)'};
    color: var(--fontBlack__700);
    font-weight: 400;
  }
  .text {
    margin-left: 5px;
    font-size: ${props => props.body || 'var(--fs__mid)'};
    color: var(--fontBlack__700);
    font-weight: 400;
    &.mg12 {
      margin-right: 15px;
    }
  }
  .userpick_bottom {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
  }
  /* .tag_box {
    flex-direction: row;
    max-width: 90px;
    white-space: nowrap;
    overflow: auto;
    text-overflow: ellipsis;
  } */
  .tag {
    max-width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 2px;
    font-size: 13px;
  }
  /* .tag_icon {
    font-size: 30px;
    padding: 5px;
    margin-top: 8px;
    margin-right: 10px;
    background-color: #ece0d9;
    border-radius: 5px;
    :hover {
      background-color: red;
      .tag_box &.modal {
        display: inline;
      }
    }
  } */
  .share_icon {
    /* position: absolute;
    right: 3%; */
    font-size: 30px;
    padding: 5px;
    cursor: pointer;
    :hover {
      background-color: #ece0d9;
      border-radius: 5px;
    }
  }
`;
type MycampType = {
  id: number;
  memo: string;
  keyword: string[];
  placeImg: string;
  shared: true;
  mapX: string;
  mapY: string;
  createdAt: string;
  updatedAt: string;
  adress: string;
  memberId: number;
};
export function ContentCardRow({ data, remove, edit, like }: CardView) {
  const [isLike, setIsLike] = useState(false);
  const [isShare, setIsShare] = useState(false);

  // const [mycamp, setMycamp] = useState<MycampType>();
  // useEffect(() => {
  //   getData('userpick').then(res => setMycamp(res));
  // });
  //TODO 공유확인 모달창
  return (
    <Link
      to={`/content/${data.contentId}`}
      style={{ width: '100%', maxWidth: '420px' }}
    >
      <ContainerRow
        remove={remove}
        like={like}
        edit={edit}
        bg={data.firstImageUrl}
      >
        <div key={data.contentId} className="img_box">
          <svg
            viewBox="0 0 24 24"
            className={!isLike ? 'heart' : 'active'}
            fill="none"
            onClick={e => {
              e.preventDefault();
              setIsLike(!isLike);
            }}
          >
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" />
          </svg>
        </div>
        <div className="content">
          <BsFillPencilFill className="delete edited" />
          <AiFillDelete className="delete remove" />
          {/* <h1>{data.facltNm}</h1> */}
          <h1>
            {data.adress
              ? data.adress.split(' ').slice(0, 2).join(' ')
              : data.facltNm}
          </h1>
          {data.doNm ? (
            <div className="adress">
              {data.doNm} {data.sigunguNm}
            </div>
          ) : null}
          <div className="body">
            {data.memo
              ? data.memo
              : data.lineIntro
              ? data.lineIntro
              : data.themaEnvrnCl
              ? data.themaEnvrnCl
              : data.featureNm
              ? data.featureNm
              : `${data.facltNm}입니다.`}
          </div>
          {data.facltNm ? (
            <div className="card_bottom">
              <div className="box">
                <div className="icon">
                  <AiFillStar size="20px" style={{ color: 'FF9F1C' }} />
                </div>
                <div className="text mg12">4.5</div>
              </div>
              <div className="box">
                <div className="icon">
                  <MdOutlineRateReview size="20px" />
                </div>
                <div className="text">{data.contendId}</div>
              </div>
            </div>
          ) : (
            <div className="userpick_bottom">
              {/* <CiHashtag className="tag_icon" /> */}
              {/* <ul className="tag_box active">
                {data.keyword.map((ele: any) => {
                  return <li className="tag">{ele}</li>;
                })}
              </ul> */}
              <div className="tag">{data.keyword.join(' ')}</div>
              <RiShareBoxLine
                className="share_icon"
                onClick={() => setIsShare(true)}
              />
              {/* <Modal>
                <h2>내가 찾은 차박지를 공유하시겠습니까?</h2>
              </Modal> */}
            </div>
          )}
        </div>
      </ContainerRow>
    </Link>
  );
}
