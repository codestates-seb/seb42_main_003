import styled from 'styled-components';
import { BiMapAlt } from 'react-icons/bi';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  top: 85%;
  left: 45%;
  transform: transition(-50%);

  .button_box {
    z-index: 996;
    position: fixed;
    top: 85%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    display: flex;
    flex-direction: row;
    padding: 12px;
    background-color: #343434;
    color: white;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
  }
  p {
    margin-left: 5px;
  }
`;
export function MapViewButton() {
  return (
    <Container>
      <button className="button_box">
        <BiMapAlt />
        <p>지도에서 보기</p>
      </button>
    </Container>
  );
}
