import styled from 'styled-components';
import { BiMapAlt } from 'react-icons/bi';
import { BsList } from 'react-icons/bs';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  top: 85%;
  left: 45%;
  transform: transition(-50%);
  .button_box {
    z-index: 901;
    position: fixed;
    @media (min-width: 768px) {
      top: 85%;
      left: 38%;
    }
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
    &.hide {
      @media (max-width: 768px) {
        display: none;
      }
    }
    p {
      margin-left: 5px;
    }
  }
`;
type MapViewType = { setIsMap: (foo: any) => void; isMap?: boolean };
export function MapViewButton({ setIsMap, isMap }: MapViewType) {
  return (
    <Container>
      <button
        className={isMap ? 'button_box hide' : 'button_box'}
        onClick={() => setIsMap(!isMap)}
      >
        {isMap ? <BsList /> : <BiMapAlt />}
        {isMap ? <p>목록으로 보기</p> : <p>지도에서 보기</p>}
      </button>
    </Container>
  );
}
