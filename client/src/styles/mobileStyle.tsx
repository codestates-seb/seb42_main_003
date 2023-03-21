import styled from 'styled-components';

export const MobileHeader = styled.header`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d9d9d9;
  padding: 10px 15px 10px 15px;
  h1 {
    /* position: absolute; */
    width: 100%;
    text-align: center;
    font-size: 23px;
    font-weight: 500;
    /* color: var() */
  }
  button {
    cursor: pointer;
    /* padding: 12px 16px; */
  }
  Link {
    cursor: pointer;
    /* padding: 12px 16px; */
  }
  a {
    cursor: pointer;
    /* padding: 12px 16px; */
  }
`;
