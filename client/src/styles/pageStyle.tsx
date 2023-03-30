import styled from 'styled-components';
import { Tab } from './Tab';
import { FloatButton } from './mapStyle';
import { Button } from './Button';

interface PageMainProps {
  top?: string;
  bottom?: string;
}

export const PageMain = styled.main<PageMainProps>`
  padding-top: ${(props) => props.top || '50px'};
  padding-bottom: ${(props) => props.bottom || '64px'};
  @media screen and (min-width: 768px) {
    padding: 0px 12px 100px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PageArticle = styled.article`
  max-width: 1000px;
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #d9d9d9;
  .history-wrapper {
    display: none;
  }
  @media screen and (min-width: 768px) {
    border: 1px solid #d9d9d9;
    border-radius: 12px;
    margin-top: 24px;
    .mobile-only {
      display: none;
    }
    .history-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding: 12px;

      .history {
        h4 {
          font-size: var(--fs__h2);
        }
        > div {
          height: 400px;
          overflow: auto;
          width: 100%;
          margin: 12px 0px;
          border: 1px solid #d9d9d9;
          border-radius: 12px;
          padding: 12px 12px;
        }
      }
    }
  }
  @media screen and (min-width: 1000px) {
  }
  ${Button} {
    width: fit-content;
  }
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
    .member-info-car {
      color: var(--fontBlack__300);
    }
    .member-info-about-desktop {
      display: none;
    }
  }
  button {
  }
  .member-info-about-mobile {
    padding-top: 16px;
    font-size: var(--fs__mid);
  }
  @media screen and (min-width: 768px) {
    img {
      width: 100px;
      height: 100px;
      border-radius: 60px;
    }
    .member-info-upper {
      .member-info-about-desktop {
        padding: 6px 0px;
        font-size: var(--fs__big);
        display: block;
      }
    }

    .member-info-about-mobile {
      display: none;
    }
  }
`;

export const PostArticle = styled(MyPageMemberInfo)`
  @media screen and (min-width: 768px) {
    margin-top: 12px !important;
    border: none;
    h2 {
      font-size: var(--fs__h1);
      font-weight: 500;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--chamong__color);
      margin-bottom: 12px;
    }
  }
  img {
    width: 35px;
    height: 35px;
  }
  .member-info-upper {
    .member-info-nickname {
      font-size: var(--fs__h2);
      padding-bottom: 5px;
    }
    .member-created-at {
      color: var(--fontBlack__100);
    }
  }
  .post-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 18px;
    div { 
      display: flex;
      .post-info-span {
        display: flex;
        align-items: center;
        span {
          padding:12px;
        }
      }
    }
    button {
        cursor: pointer;
        transition: 0.1s;
        &:hover {
          transition:0.1s;
          transform: scale(1.2);
        }
      }
  }
  p {
    padding-top: 12px;
    line-height: 1.3em;
    padding-bottom: 24px;
    @media screen and (min-width: 768px) {
      font-size: var(--fs__big);
      padding-top: 12px;
      min-height: 100px;
    }
  }
  .post-buttonbox {
    display: flex;
    justify-content: end;
  }
`;

export const CommentCounter = styled.div`
  max-width: 1000px;
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #d9d9d9;
  @media screen and (min-width: 768px) {
    border-bottom: 1px solid var(--chamong__color);
  }
`;

export const CommentArticle = styled(MyPageMemberInfo)`
width: 100%;
position: relative;
  p {
    padding-top: 12px;
  }
  @media screen and (min-width: 768px) {
    border: none;
  }
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
  .comment-delete-button {
    cursor:pointer;
    position: absolute;
    font-size: var(--fs__h2);
    right:12px;
    transition:0.2s;
    &:hover {
      transition:0.2s;
      transform: scale(1.2);
    }
  }
  @media screen and (min-width: 768px) {
    margin-top: 0px;
  }
`;

export const PostCommentStyle = styled.form`
  position: fixed;
  display: flex;
  width: 100%;
  max-width: 1000px;
  height: 128px;
  padding: 6px 12px 64px;
  border-radius: 25px 25px 0px 0px;
  background-color: var(--searchbar__color);
  bottom: 0;
  .post-comment-input {
    width: 100%;
    height: 100%;
    align-items: center;
    display: flex;
    .post-comment-mobile-button {
      font-size: var(--fs__h1);
      color: var(--chamong__color);
      padding: 12px;
      cursor: pointer;
    }
    ${Button} {
      display: none;
    }
  }
  @media screen and (min-width: 768px) {
    position: static;
    background-color: transparent;
    height: auto;
    padding: 6px 12px;
    .post-comment-input {
      .post-comment-mobile-button {
        display: none;
      }
      ${Button} {
        display: inline-block;
      }
    }
  }
`;

export const ErrorPageStyle = styled(PageMain)`
  pointer-events: none;
  height: 80vh;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: var(--fs__h1);
    padding: 24px;
  }
`;

export const ButtonBoxStyle = styled.div`
  ${Button} {
    display: flex;
    align-items: center;
  }
  .button-desktop {
    display: none;
  }
  .button-mobile {
    display: inline-block;
  }
  @media screen and (min-width: 768px) {
    .button-desktop {
      display: inline-block;
    }
    .button-mobile {
      display: none;
    }
  }
`;
