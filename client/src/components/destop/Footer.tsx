import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 20px;
  position: fixed;
  bottom: 0;
  background-color: white;
  z-index: 999;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  @media (max-width: 768px) {
    display: none;
  }
  .title {
    color: var(--chamong__color);
    font-size: 25px;
    font-weight: 700;
    padding-bottom: 10px;
  }
  .line {
    padding: 5px;
    border-top: 2px solid black;
    width: 20px;
  }
  .member {
    color: black;
    padding-bottom: 10px;
    font-size: 12px;
    font-weight: 500;
  }
  .sub_title {
    color: black;
    font-size: 12px;
    font-weight: 500;
  }
`;

function Footer() {
  return (
    <Container>
      <h1 className="title">Chamong</h1>
      <div className="body">
        <div className="member">최준영 박진선 김연주 이세환 신현민 김윤혜</div>
        {/* <div className="line"></div> */}
        <div className="sub_title">
          build by codestates main project team_That's coding.
        </div>
      </div>
    </Container>
  );
}

export default Footer;
