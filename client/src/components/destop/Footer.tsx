import styled from 'styled-components';
import logo from '../../assets/logo/logo_chamong.svg';
import chamong from '../../assets/logo/logo_eng.svg';

const Container = styled.div<Info>`
  display: flex;
  justify-content: center;
  height: auto;
  background-color: var(--searchbar__color);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  width: 100%;
  z-index: 800;
  position: ${props => props.fix || 'fixed'};
  bottom: 0;
  .wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 20px 16px;
    max-width: ${props => props.width_page || '1268px'};
  }
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
  .logo {
    display: flex;
  }
`;
type Info = { width_page?: string; fix?: string };
function Footer({ width_page, fix }: Info) {
  return (
    <Container width_page={width_page} fix={fix}>
      <div className="wrapper">
        <div className="logo">
          <img
            src={logo}
            alt="logo"
            style={{ width: '30px', paddingRight: '5px' }}
          ></img>
          <img src={chamong} alt="logo" style={{ width: '110px' }}></img>
        </div>
        <div className="body">
          <div className="member">
            최준영 박진선 김연주 이세환 신현민 김윤혜
          </div>
          <div className="sub_title">
            build by codestates main project team_That's coding.
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Footer;
