import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  position: fixed;
  bottom: 0;
  background-color: var(--fontBlack__500);

  @media (max-width: 768px) {
    display: none;
  }
  .title {
    color: white;
    font-size: 25px;
    font-weight: 700;
    padding-bottom: 10px;
  }
  .line {
    padding: 10px;
    border-top: 2px solid #dddddd;
    width: 20px;
  }
  .member {
    color: white;
    padding-bottom: 20px;
    font-size: 12px;
    font-weight: 500;
  }
  .sub_title {
    color: white;
    font-size: 12px;
    font-weight: 500;
  }
`;

function Footer() {
  return (
    <Container>
      <h1 className="title">Chamong</h1>
      <div className="member">최준영 박진선 김연주 이세환 신현민 김윤혜</div>
      <div className="line"></div>
      <div className="sub_title">
        build by codestates main project team_That's coding.
      </div>
    </Container>
  );
}

export default Footer;
