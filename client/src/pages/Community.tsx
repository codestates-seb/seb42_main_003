import styled from 'styled-components';
import { Post } from '../components/Review';
import { HiOutlineSearch } from 'react-icons/hi';
import SearchBar from '../components/SearchBar';
import { MobileHeader } from '../styles/mobileStyle';
import Header from '../components/destop/Header';
import Footer from '../components/destop/Footer';
import { SearchbarPlain } from '../styles/searchbarPlain';

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
        padding: 10px;
      }
      .wrapper {
        width: 100%;
        max-width: 900px;
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

  .desktop_header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .desktop_h1 {
      font-size: var(--fs__h1);
      font-weight: 500;
    }
  }
`;
export function Community() {
  // useEffect(() => {
  //   getCommunity().then(res => setIsCommunity(res));
  // }, []);
  return (
    <Container>
      <Header width_M={'1000px'}></Header>
      <div className="desktop">
        <div className="wrapper">
          <MobileHeader className="mobile">
            <h1>커뮤니티</h1>
          </MobileHeader>
          <div className="desktop_header">
            <h1 className="desktop_h1">커뮤니티</h1>
            <div className="search_mobile">
              <SearchbarPlain>
                <HiOutlineSearch className="search_icon" />
                <input placeholder="검색"></input>
              </SearchbarPlain>
            </div>{' '}
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
