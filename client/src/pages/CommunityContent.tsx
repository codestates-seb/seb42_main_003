import styled from 'styled-components';
import { Post } from '../components/Review';
import SearchBar from '../components/SearchBar';
import { MobileHeader } from '../styles/mobileStyle';
import Header from '../components/destop/Header';

export const Container = styled.div`
  .search {
    margin-top: 60px;
    padding: 10px;
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
export function CommunityContent() {
  return (
    <Container>
      <MobileHeader className="mobile">
        <h1>커뮤니티</h1>
      </MobileHeader>
      <Header width_M={'1000px'}></Header>
      <div className="search">
        <SearchBar></SearchBar>
      </div>
      <div className="post">
        <Post />
      </div>
    </Container>
  );
}
