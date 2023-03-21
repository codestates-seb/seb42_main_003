import styled from 'styled-components';
import { Post } from '../components/Review';
import SearchBar from '../components/SearchBar';
import { MobileHeader } from '../styles/mobileStyle';
import Header from '../components/destop/Header';
import Footer from '../components/destop/Footer';

export const Container = styled.div`
  @media (max-width: 768px) {
    .search_mobile {
      margin-top: 60px;
      padding: 10px;
    }
  }
  @media (min-width: 768px) {
    .desktop {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    @media (min-width: 768px) {
      .search_mobile {
        /* display: none; */
        padding: 10px;
      }
      .wrapper {
        width: 100%;
        max-width: 900px;

        /* justify-content: center; */
      }
    }
  }
  .post {
    padding: 0 10px 10px 10px;
  }
  .mobile {
    @media (min-width: 768px) {
      display: none;
    }
  }
`;
export function Community() {
  return (
    <Container>
      <Header width_M={'1000px'}></Header>
      <div className="desktop">
        <div className="wrapper">
          <MobileHeader className="mobile">
            <h1>커뮤니티</h1>
          </MobileHeader>
          <div className="search_mobile">
            <SearchBar></SearchBar>
          </div>
          <div className="post">
            <Post />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </Container>
  );
}
