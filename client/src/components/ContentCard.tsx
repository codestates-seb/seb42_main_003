import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { MdOutlineRateReview } from 'react-icons/md';

interface CardView {
  flex_dir?: string;
  bottom_justify?: string;
  fs_h1?: string;
  body?: string;
  heart?: string;
  radius?: string;
  img_width?: string;
  content_align?: string;
  line?: string;
}

const Container = styled('div')<CardView>`
  display: flex;
  flex-direction: ${props => props.flex_dir || 'column'};
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  .content {
    display: flex;
    flex-direction: column;
    align-items: ${props => props.content_align || 'center'};
    margin: 20px 15px;
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
    color: var(--fontBlack__700);
    font-size: ${props => props.fs_h1 || '22px'};
    font-weight: 500;
    margin: 8px 0;
  }
  .adress {
    font-size: ${props => props.body || 'var(--fs__mid)'};
    color: var(--fontBlack__400);
    margin-bottom: 16px;
    font-weight: 400;
  }
  .body {
    font-size: ${props => props.body || 'var(--fs__mid)'};
    color: var(--fontBlack__700);
    margin-bottom: 10px;
    font-weight: 400;
    line-height: ${props => props.line || 1};
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
  .img_box {
    position: relative;
    width: ${props => props.img_width || ''};
    img {
      width: 100%;
      height: stretch;
      object-fit: cover;
      border-radius: ${props => props.radius || '25px 25px 0px 0px'};
    }
    .heart {
      position: absolute;
      right: 5%;
      top: 5%;
      width: ${props => props.heart || '30px'};
      stroke: white;
      z-index: 999;
    }
  }
`;

function ContentCard({
  flex_dir,
  bottom_justify,
  img_width,
  radius,
  content_align,
  line,
}: CardView) {
  return (
    <Link to="#">
      <Container
        flex_dir={flex_dir}
        bottom_justify={bottom_justify}
        img_width={img_width}
        radius={radius}
        content_align={content_align}
        line={line}
      >
        <div className="img_box">
          <img
            src="https://gocamping.or.kr/upload/camp/87/thumb/thumb_720_6823LIi5eTPTRrI0iWf8ynXt.jpeg"
            alt="img"
            sizes="160"
          />
          <svg viewBox="0 0 24 24" className="heart" fill="none">
            <path
              d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
              fill="var(--chamong__color)"
            />
          </svg>
        </div>
        <div className="content">
          <h1>양촌여울체험캠프</h1>
          <div className="adress">강원도 원주시</div>
          <div className="body">침대에서 누워 즐기는 홍천강 풍경</div>
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
              <div className="text">3</div>
            </div>
          </div>
        </div>
      </Container>
    </Link>
  );
}

export default ContentCard;
