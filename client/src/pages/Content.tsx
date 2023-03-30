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
import { getDataTs } from '../api/tsapi';
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
  // const [isReview, setIsReview] = useState<any>([]);
  const [isModal, setIsModal] = useState(false);
  const [isContent, setIsContent] = useState<any>({});
  const dispatch = useAppDispatch();
  const { contentId } = useParams();
  const isReview = [
    {
      createdAt: '2023-03-24',
      image:
        'https://cdn.pixabay.com/photo/2023/03/25/10/59/hedgehog-fly-7875687_1280.jpg',
      user: '땡구리',
      updatedat: '2023-03-24',
      reviewId: 1,
      content:
        '이번 주말 캠핑을 가서 힐링하고 왔는데 정말 좋았어요. 조용하고 한적해서 마음이 편해졌고, 산책로에서 산책하면서 몸도 좀 움직이고 좋았어요. 다음에 또 방문할 계획이에요.',
      rating: 5,
    },
    {
      createdAt: '2023-03-22',
      image:
        'https://cdn.pixabay.com/photo/2022/12/19/13/51/flowers-7665747_1280.jpg',
      user: '차몽',
      updatedat: '2023-03-22',
      reviewId: 2,
      content:
        '처음뵙겠습니다. 이번 주말 캠핑을 다녀왔는데, 너무 좋았습니다. 청결한 시설과 친절한 직원들, 그리고 마음에 드는 캠핑장 분위기가 모두 좋았어요. 덕분에 집에서 힘들게 지내던 일상을 잊고 푹 쉴 수 있었습니다. 추천합니다!',
      rating: 5,
    },
    {
      createdAt: '2023-03-26',
      image:
        'https://cdn.pixabay.com/photo/2022/10/23/02/26/hotel-7540353_1280.jpg',
      user: '옥수수',
      updatedat: '2023-03-26',
      reviewId: 3,
      content:
        '이번 주말에 가족과 함께 캠핑을 다녀왔는데, 정말 좋았습니다. 아이들이 즐길 수 있는 다양한 시설이 있어서 아이들도 즐거웠고, 저도 한가지 일만 하면 느긋하게 쉴 수 있어서 좋았어요. 다음에 또 방문할 계획입니다!',
      rating: 4,
    },
    {
      createdAt: '2023-03-26',
      image:
        'https://cdn.pixabay.com/photo/2022/12/19/17/37/bee-7666216_1280.jpg',
      user: '감자',
      updatedat: '2023-03-26',
      reviewId: 3,
      content: '좋았어요 굳굳',
      rating: 4,
    },
  ];
  useEffect(() => {
    // getData('main?page=1').then(res => {
    //   const content = res.filter((ele: any) => {
    //     return ele.contentId === contentId;
    //   });
    //   setIsContent(content[0]);
    getDataTs(`main/${contentId}`).then(res => {
      setIsContent(res);
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
              isContent={isContent}
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
