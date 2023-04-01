import styled from 'styled-components';

interface ModalStyleProps {
  maxWidth?:string;
}
export const Modal = styled.div<ModalStyleProps>`
  width: 100%;
  height: 100%;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50px;
  box-sizing: border-box;
  padding-bottom: 64px;
  left: 0px;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  span.error-message {
    display: block;
    color: var(--chamong__color);
    font-weight: 500;
    font-size: var(--fs__mid);
    margin-top: 0px;
  }

  @media screen {
   top:0px;
   padding-bottom : 0px;
  }
  

  .wrapper {
    max-width: ${props=>props.maxWidth||'1000px'};
    width: 100%;
    background-color: white;
    padding: 16px;
    margin: 16px 16px 64px;
    border-radius: 16px;
    > * {
      margin: 8px 0px;
    }
    .header {
      margin-top:0px;
      position: relative;
      width: 100%;
      display: flex;
      justify-content: end;
      align-items: center;
      h2 {
        position: absolute;
        font-size: var(--fs__xl);
        width: 100%;
        text-align: center;
      }
      button {
        z-index: 500;
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
    .modal-text {
    width: 100%;
    text-align: center;
    font-size:var(--fs__big);
    font-weight: 500;
    margin-bottom:0px !important;
  }
  }
`;

