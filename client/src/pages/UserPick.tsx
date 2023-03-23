import styled from 'styled-components';
import Header from '../components/destop/Header';
import Footer from '../components/destop/Footer';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTK';
import { click } from '../store/clickedSlice';
import { MapViewButton } from '../components/MapViewButton';
import ContentListOnly from '../components/ContentListOnly';
import { PageHeader } from '../components/destop/PageHeader';
import { MobileHeader } from '../styles/mobileStyle';
const Container = styled.div``;

function UserPick() {
  const dispatch = useAppDispatch();
  return (
    <Container onClick={() => dispatch(click(false))}>
      <MapViewButton></MapViewButton>
      <Header width_M={'1000px'}></Header>
      <MobileHeader>
        <h1>유저픽</h1>
      </MobileHeader>
      <PageHeader title={'유저픽'}></PageHeader>
      <ContentListOnly></ContentListOnly>
      <Footer width_page={'1000px'} fix={'none'}></Footer>
    </Container>
  );
}
export default UserPick;
