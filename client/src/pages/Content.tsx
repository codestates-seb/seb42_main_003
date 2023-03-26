import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Header from '../components/destop/Header';
import Footer from '../components/destop/Footer';
import { ContentM } from '../components/mobile/ContentM';
import { ContentD } from '../components/destop/ContentD';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTK';
import { click } from '../store/clickedSlice';
import { useParams } from 'react-router-dom';
import { Review } from '../components/Review';
import { getData } from '../api/api';
import { AiFillStar } from 'react-icons/ai';
import { Button } from '../styles/Button';
import { Modal } from '../styles/Modal';
import { ReviewSubmit } from '../components/ReviewSubmit';
import { reset } from '../store/reviewSlice';
const Container = styled.div`
  .review_wrap {
    @media (max-width: 768px) {
      padding: 0 15px 60px 15px;
    }
    @media (min-width: 768px) {
      display: flex;
      justify-content: center;
    }
  }
  .desktop_wrap {
    @media (min-width: 768px) {
      padding: 0 15px;
      width: 100%;
      max-width: 1000px;
      display: grid;
      gap: 17px 50px;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      margin-bottom: 90px;
    }
  }
  .review_top_mobile {
    @media (min-width: 768px) {
      display: none;
    }
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 15px 20px 15px;
  }
  .review_left {
    display: flex;
    flex-direction: row;
    .grade_title {
      display: flex;
      flex-direction: row;
    }
  }
  .h1_title {
    font-size: var(--fs__h2);
    color: var(--fontBlack__700);
    font-weight: 600;
    margin-bottom: 12px;
    margin-right: 5px;
  }
  .mobile_view_modal {
    @media (min-width: 768px) {
      display: none;
    }
  }
`;

function Content() {
  const [isReview, setIsReview] = useState<any>([]);
  const [isModal, setIsModal] = useState(false);
  const [isContent, setIsContent] = useState<any>({});
  const dispatch = useAppDispatch();
  const { contentId } = useParams();

  useEffect(() => {
    getData('review').then(res => setIsReview(res));
    getData('content').then(res => {
      const content = res.filter((ele: any) => {
        return ele.contentId === contentId;
      });
      setIsContent(content[0]);
    });
    return () => {
      dispatch(
        reset({
          id: 0,
          image: '',
          user: '',
          createdAt: '',
          grade: 0,
          body: '',
        })
      );
    };
    // window.scrollTo(0, 0);
  }, [contentId]);

  return (
    <Container onClick={() => dispatch(click(false))}>
      <Header width_M={'1000px'}></Header>
      <ContentM
        isContent={isContent}
        contentId={contentId}
        isModal={isModal}
        setIsModal={setIsModal}
      ></ContentM>
      <ContentD isContent={isContent} contentId={contentId}></ContentD>

      <div className="review_top_mobile">
        <div className="review_left">
          <h1 className="h1_title">리뷰 3</h1>
          <div className="grade_title">
            <AiFillStar
              size="20px"
              style={{ color: 'var(--chamong__color)' }}
            />
            <h1 className="mg_left h1_title">4.5</h1>
          </div>
        </div>
        <Button
          margin="-5px 0"
          padding="9px 15px"
          border="var(--chamong__color)"
          color="var(--chamong__color)"
          hover="white"
          hcolor="var(--chamong__color)"
          hborder="var(--chamong__color)"
          onClick={() => setIsModal(!isModal)}
        >
          작성
        </Button>
      </div>

      <div className="review_wrap">
        <div className="desktop_wrap">
          {isReview.map((ele: any) => (
            <Review
              key={ele.id}
              isReview={ele}
              setIsModal={setIsModal}
            ></Review>
          ))}
        </div>
      </div>
      {isModal ? (
        <Modal
          className="mobile_view_modal"
          onClick={() => {
            setIsModal(!isModal);
            dispatch(
              reset({
                id: 0,
                image: '',
                user: '',
                createdAt: '',
                grade: 0,
                body: '',
              })
            );
          }}
        >
          <div className="wrapper" onClick={e => e.stopPropagation()}>
            <div
              className="header"
              style={{ fontSize: '18px', fontWeight: '500' }}
              onClick={() => {
                setIsModal(!isModal);
                dispatch(
                  reset({
                    id: 0,
                    image: '',
                    user: '',
                    createdAt: '',
                    grade: 0,
                    body: '',
                  })
                );
              }}
            >
              &times;
            </div>
            <ReviewSubmit></ReviewSubmit>
          </div>
        </Modal>
      ) : null}
      <Footer width_page={'1000px'}></Footer>
    </Container>
  );
}
export default Content;
