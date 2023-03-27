import styled from 'styled-components';
import { Post } from '../components/Review';
import { HiPlus, HiOutlineSearch } from 'react-icons/hi';
import { AiOutlineComment } from 'react-icons/ai';
import SearchBar from '../components/SearchBar';
import { MobileHeader } from '../styles/mobileStyle';
import Header from '../components/destop/Header';
import Footer from '../components/destop/Footer';
import { useEffect, useState } from 'react';
import { SearchbarPlain } from '../styles/searchbarPlain';
import { getData } from '../api/api';
import { PageHeader } from '../components/destop/PageHeader';
import { Button } from '../styles/Button';
import PostModal from '../components/PostModal';
import { FloatButton } from '../styles/mapStyle';
import Pagination from '../components/destop/Pagination';
import { useAppSelector, useAppDispatch } from '../hooks/reduxTK';
import { click } from '../store/clickedSlice';
import { getDataTs } from '../api/tsapi';

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
        position: relative;
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
      flex-direction: row;
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
  .float_Button {
    @media (min-width: 768px) {
      display: none;
    }
    position: absolute;
    bottom: 10%;
    right: 10%;
  }
  .modal_submit {
    .wrapper {
      max-width: 600px;
      height: 500px;
    }
  }
`;
export function Community() {
  const dispatch = useAppDispatch();
  const [isCommunity, setIsCommunity] = useState<any>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const currentPage = 1;
  const totalPages = 10;

  const handlePageChange = (page: number) => {
    console.log('Page changed to', page);
  };

  useEffect(() => {
    getDataTs('articles').then(res => setIsCommunity(res.content));
  }, []);

  return (
    <Container onClick={() => dispatch(click(false))}>
      <Header width_M={'1000px'}></Header>
      <div className="desktop">
        <PageHeader
          title="커뮤니티"
          icon={<AiOutlineComment />}
          width="900px"
        />
        <div className="max_width">
          <div className="desktop_header">
            <SearchbarPlain>
              <HiOutlineSearch className="search_icon" />
              <input style={{ width: '100%' }} placeholder="검색"></input>
            </SearchbarPlain>
            <Button
              margin={'0'}
              padding={'12px 18px'}
              bg={'var(--chamong__color)'}
              border={'var(--chamong__color)'}
              color={'white'}
              hborder={'var(--chamong__color)'}
              hover={'white'}
              hcolor={'var(--chamong__color)'}
              onClick={() => setIsSubmit(true)}
            >
              글쓰기
            </Button>
          </div>
          {isSubmit ? (
            <div className="modal_submit">
              <PostModal setIsSubmit={setIsSubmit}></PostModal>
            </div>
          ) : null}
          <div className="float_Button">
            <FloatButton onClick={() => setIsSubmit(true)}>
              <HiPlus />
            </FloatButton>
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Footer width_page={'1000px'} fix={'none'}></Footer>
    </Container>
  );
}
