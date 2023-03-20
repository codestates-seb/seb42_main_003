import styled from 'styled-components';

export const Modal = styled.div`
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
  top: 50px;
  box-sizing: border-box;
  padding-bottom: 64px;
  left: 0px;
  position: fixed;
  border: 1px solid red;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  .wrapper {
    width: 100%;
    background-color: white;
    padding: 16px;
    margin: 16px 16px 64px;
    border-radius: 16px;
    border: 1px solid blue;
    > * {
      margin: 8px 0px;
    }
    .header {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: end;
      align-items: center;
      h2 {
        position: absolute;
        font-size: var(--fs__h1);
        width: 100%;
        text-align: center;
      }
      button {
        z-index: 999;
        font-size: 28px;
        /* border:1px solid red; */
        cursor: pointer;
      }
    }
    h3 {
      font-size: var(--fs__h2);
      font-weight: 700;
    }
    .map {
      width: 100%;
      height: 150px;
      @media screen and (min-height: 800px) {
        height: 300px;
      }
    }
  }
`;

const keywordOffer=styled.div`
  
`