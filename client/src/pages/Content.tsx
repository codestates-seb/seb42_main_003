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
  .destop_wrap {
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
`;

function Content() {
  const [isReview, setIsReview] = useState<any>([]);
  useEffect(() => {
    getData('review').then(res => setIsReview(res));
  }, []);
  const dispatch = useAppDispatch();
  const { contentId } = useParams();
  return (
    <Container onClick={() => dispatch(click(false))}>
      <Header width_M={'1000px'}></Header>
      <ContentM contentId={contentId}></ContentM>
      <ContentD contentId={contentId}></ContentD>
      <div className="review_wrap">
        <div className="destop_wrap">
          {isReview.map((ele: any) => (
            <Review key={ele.id} isReview={ele}></Review>
          ))}
        </div>
      </div>
      <Footer width_page={'1000px'}></Footer>
    </Container>
  );
}
export default Content;
