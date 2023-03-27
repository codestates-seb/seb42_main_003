import Header from '../components/destop/Header';
import Footer from '../components/destop/Footer';
import { PageMain } from '../styles/pageStyle';
import notFound from '../assets/not_found.png';
import { ErrorPageStyle } from '../styles/pageStyle';

export function ErrorPage() {
  return (
    <>
      <Header width_M={'1000px'}></Header>
      <ErrorPageStyle>
        <img src={notFound} width='300px' alt='Not Found'></img>
        <h1>페이지를 찾을 수 없습니다.</h1>
      </ErrorPageStyle>
      <Footer></Footer>
    </>
  );
}
