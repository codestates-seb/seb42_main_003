import styled from 'styled-components';
import { Post } from '../components/Review';
import { HiOutlineSearch } from 'react-icons/hi';
import SearchBar from '../components/SearchBar';
import { MobileHeader } from '../styles/mobileStyle';
import Header from '../components/destop/Header';
import Footer from '../components/destop/Footer';
import { useEffect, useState } from 'react';
import { SearchbarPlain } from '../styles/searchbarPlain';
import { getData } from '../api/api';
import { PageHeader } from '../components/destop/PageHeader';

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
      .search_mobile {
        display: none;
      }
    }
    @media (min-width: 768px) {
      .search_mobile {
        padding: 10px;
      }
      .max_width {
        width: 100%;
        max-width: 900px;
        margin-bottom: 50px;
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

  @media (max-width: 768px) {
    .desktop_header {
      display: none;
    }
  }
  @media (min-width: 768px) {
    .desktop_header {
      display: flex;
      flex-direction: column;
      /* align-items: center; */
      justify-content: space-between;
      padding: 20px;
      .desktop_h1 {
        justify-self: flex-start;
        font-size: var(--fs__h1);
        font-weight: 500;
        flex-grow: 1;
      }
      .header_bg {
      }
    }
  }
`;
export function Community() {
  const [isCommunity, setIsCommunity] = useState<any>([]);
  useEffect(() => {
    getData('community').then(res => setIsCommunity(res));
  }, []);
  return (
    <Container>
      <Header width_M={'1000px'}></Header>
      <div className="desktop">
        <PageHeader title={'커뮤니티'}></PageHeader>
        <div className="max_width">
          <div className="desktop_header">
            <SearchbarPlain>
              <HiOutlineSearch className="search_icon" />
              <input placeholder="검색"></input>
            </SearchbarPlain>
          </div>
          <MobileHeader className="mobile">
            <h1>커뮤니티</h1>
          </MobileHeader>
          <div className="search_mobile">
            <SearchBar></SearchBar>
          </div>
          <div className="post">
            {isCommunity.map((ele: any) => (
              <Post key={ele.id} data={ele} />
            ))}
          </div>
        </div>
      </div>
      <Footer width_page={'1000px'} fix={'none'}></Footer>
    </Container>
  );
}
