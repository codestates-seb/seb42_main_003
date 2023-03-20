import styled from 'styled-components';

export const MobileHeader = styled.header`
  position: fixed;
  z-index: 999;
  top:0;
  left:0;
  right:0;
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom:1px solid #d9d9d9;
  h1 {
    position: absolute;
    width: 100%;
    text-align: center;
    font-size: var(--fs__h1);
    font-weight: 500;
  }
  button {
    cursor:pointer;
    padding: 12px 16px;
  }
`;
