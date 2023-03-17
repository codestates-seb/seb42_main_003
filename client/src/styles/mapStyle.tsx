import styled from 'styled-components';

export const MapInfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  justify-content: end;
  flex-direction: column;
`;

export const MapWrapper = styled.article`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
`;

export const MapFloatButton = styled.button`
  cursor: pointer;
  font-size: 24px;
  min-width: 42px;
  min-height: 42px;
  border-radius: 50%;
  color: white;
  background-color: var(--chamong__color);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transition: 0.2s;
  &:hover {
    transition: 0.2s;
    transform: scale(1.1);
  }
  &:active {
    transition: 0.1s;
    transform: scale(0.9);
  }
`;
