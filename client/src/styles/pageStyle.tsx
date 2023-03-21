import styled from "styled-components";
import { Tab } from "./Tab";
import { FloatButton } from "./mapStyle";

export const PageMain = styled.main`
  padding-bottom: 64px;
  padding-top: 50px;
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