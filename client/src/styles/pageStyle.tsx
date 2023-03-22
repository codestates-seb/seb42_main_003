import styled from 'styled-components';
import { Tab } from './Tab';
import { FloatButton } from './mapStyle';

interface PageMainProps {
  top?: string;
  bottom?: string;
}

export const PageMain = styled.main<PageMainProps>`
  padding-top: ${(props) => props.top || '50px'};
  padding-bottom: ${(props) => props.bottom || '64px'};
  @media screen and (min-width: 768px) {
    padding-top: none;
    padding-bottom: none;
  }
`;

export const PageArticle = styled.article`
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #d9d9d9;
  h2 {
    font-size: var(--fs__h2);
    font-weight: 700;
    padding-bottom: 16px;
  }
  > div {
    display: flex;
  }
  .map-container {
    display: flex;
    width: 100%;
    height: 350px;
    flex-direction: column;
    align-items: center;
    position: relative;
    ${Tab} {
      position: absolute;
      z-index: 500;
      width: 270px;
      padding-top: 16px;
    }
    ${FloatButton} {
      position: absolute;
      z-index: 500;
      bottom: 25px;
      right: 25px;
    }
    @media screen and (min-width: 481px) {
      height: 450px;
    }
    @media screen and (min-width: 768px) {
      height: 600px;
    }
  }
`;

export const MyPageMemberInfo = styled(PageArticle)`
  width: 100%;

  img {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }
  > div {
    display: flex;
    justify-content: space-between;
    > div {
      display: flex;
      align-items: center;
    }
  }
  .member-info-upper {
    padding-left: 8px;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    .member-info-nickname {
      font-size: var(--fs__h1);
      padding-bottom: 5px;
    }
  }
  button {
  }
  p {
    padding-top: 16px;
    font-size: var(--fs__mid);
  }
`;

export const PostArticle = styled(MyPageMemberInfo)`
  img {
    width: 35px;
    height: 35px;
  }
  .member-info-upper {
    .member-info-nickname {
      font-size: 16px;
      padding-bottom: 5px;
    }
    .member-created-at {
      color: var(--fontBlack__100);
    }
  }
  .post-info {
    font-size: 16px;
    span {
      padding-right: 12px;
      span {
        padding-left: 4px;
      }
    }
  }
`;
export const CommentArticle = styled(MyPageMemberInfo)`
  img {
    width: 35px;
    height: 35px;
  }
  .member-info-upper {
    flex-direction: row;
    .member-info-nickname {
      font-size: 16px;
      padding-bottom: 5px;
    }
    .member-created-at {
      color: var(--fontBlack__100);
      margin-left: 12px;
    }
  }
`;

export const PostCommentStyle = styled.form`
  position: fixed;
  display: flex;
  width:100%;
  height:128px;
  padding: 6px 12px 64px;
  border-radius: 25px 25px 0px 0px;
  background-color: var(--searchbar__color);
  bottom: 0;
  .post-comment-input {
    width: 100%;
    height: 100%;
    align-items: center;
    display: flex;
    > button {
      font-size: var(--fs__h1);
      color:var(--chamong__color);
      padding:12px;
      cursor: pointer;
    }
  }
`;
