import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { MdOutlineRateReview } from 'react-icons/md';
import { useState } from 'react';

interface CardView {
  flex_dir?: string;
  content_align?: string;
  bottom_justify?: string;
  img_width?: string;
  radius?: string;
  content_rd?: string;
  line?: string;
  content_pd?: string;
  wrap?: string;
  img_height?: string;
  ratio?: string;
  content_width?: string;
  webkit?: string;
  //
  fs_h1?: string;
  body?: string;
  heart?: string;
  data?: any;
  key?: any;
  bg?: URL;
}

const Container = styled('div')<CardView>`
  display: flex;
  flex-direction: ${props => props.flex_dir || 'column'};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: auto;
  border-radius: 25px;
  background-image: url('https://gocamping.or.kr/upload/camp/100358/thumb/thumb_720_3006GPoZLjm1dpqwhevGKAPR.jpg');
  background-size: cover;

  .content {
    width: ${props => props.content_width || 'auto'};
    flex: 0.5;
    border-radius: ${props => props.content_rd || '0px 0px 25px 25px;'};
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: ${props => props.content_align || 'center'};
    padding: ${props => props.content_pd || '0 15px 15px 15px'};
  }
  .img_box {
    flex: ${props => props.ratio || ''};
    position: relative;
    height: ${props => props.img_height || '120px'};
    width: ${props => props.img_width || ''};
    background-image: ${props => `url(${props.bg})`};
    background-size: cover;
    border-radius: ${props => props.radius || '25px 25px 0px 0px'};
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
    justify-content: ${props => props.bottom_justify || 'center'};
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
    display: ${props => props.webkit || 'block'};
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: ${props => props.wrap || 'nowrap'};
    word-break: break-all;
    font-size: ${props => props.body || 'var(--fs__small)'};
    color: var(--fontBlack__700);
    margin-bottom: 10px;
    font-weight: 400;
    line-height: ${props => props.line || 1};
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

function ContentCard({
  flex_dir,
  bottom_justify,
  img_width,
  radius,
  content_rd,
  content_align,
  line,
  data,
  content_pd,
  wrap,
  img_height,
  ratio,
  content_width,
  webkit,
}: CardView) {
  const [isLike, setIsLike] = useState(false);
  return (
    <Link to="/content" style={{ width: '100%' }}>
      <Container
        flex_dir={flex_dir}
        bottom_justify={bottom_justify}
        img_width={img_width}
        radius={radius}
        content_rd={content_rd}
        content_align={content_align}
        line={line}
        bg={data.firstImageUrl}
        content_pd={content_pd}
        wrap={wrap}
        img_height={img_height}
        ratio={ratio}
        content_width={content_width}
        webkit={webkit}
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

export default ContentCard;
