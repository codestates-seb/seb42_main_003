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
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';

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
const Container2 = styled('div')`
  display: flex;
  border: 1px solid var(--searchbar__color);
  background-color: var(--searchbar__color);
  border-radius: 20px;
  height: 50px;
  width: 100%;
  position: relative;

  input {
    padding-left: 10px;
    width: 100%;
    ::placeholder {
      font-size: 15px;
    }
  }
  .search_icon {
    position: absolute;
    right: 5%;
    top: 23%;
    font-size: 27px;
    color: var(--chamong__color);
    cursor: pointer;
  }
`;
export function Community() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isCommunity, setIsCommunity] = useState<any>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPages, setCurrentPages] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>('');
  const isLogin = useAppSelector(state => state.isLogin);
  const totalPage = Math.ceil(totalPages / 15);
  const currentPage = currentPages;

  const handlePageChange = (page: number) => {
    getDataTs('articles', { page: page }).then(res =>
      setIsCommunity(res.content)
    );
    setCurrentPages(page);
  };

  useEffect(() => {
    getDataTs('articles').then(res => {
      setIsCommunity(res.content);
      setTotalPages(res.totalElements);
    });
  }, []);

  const submitHandler = () => {
    if (isLogin) setIsSubmit(true);
    else navigate('/mypage');
  };
  const searchHandler = () => {
    getDataTs(`articles?keyword=${keyword}&page=0`).then(res =>
      setIsCommunity(res.content)
    );
  };

  const keywordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    console.log(e.target.value);
  };
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
              <HiOutlineSearch
                onClick={searchHandler}
                className="search_icon"
              />
              <input
                onChange={keywordHandler}
                style={{ width: '100%' }}
                placeholder="??"
              ></input>
            </SearchbarPlain>
            {isLogin && (
              <Button
                margin={'0'}
                padding={'12px 18px'}
                bg={'var(--chamong__color)'}
                border={'var(--chamong__color)'}
                color={'white'}
                hborder={'var(--chamong__color)'}
                hover={'white'}
                hcolor={'var(--chamong__color)'}
                onClick={submitHandler}
              >
                글쓰기
              </Button>
            )}
          </div>
          {isSubmit ? (
            <div className="modal_submit">
              <PostModal setIsSubmit={setIsSubmit}></PostModal>
            </div>
          ) : null}
          <div className="float_Button">
            <FloatButton onClick={submitHandler}>
              <HiPlus />
            </FloatButton>
          </div>
          <MobileHeader className="mobile">
            <h1>커뮤니티</h1>
          </MobileHeader>
          <div className="search_mobile">
            <Container2>
              <HiOutlineSearch
                onClick={searchHandler}
                className="search_icon"
              />
              <input onChange={keywordHandler} placeholder="검색"></input>
            </Container2>
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
        totalPages={totalPage}
        onPageChange={handlePageChange}
      />
      <Footer width_page={'1000px'} fix={'none'}></Footer>
    </Container>
  );
}
