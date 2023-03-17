import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .header {
    height: 75px;
    padding: 1rem;
    color: white;
    /* background: teal; */
    font-weight: bold;
    border: 1px solid teal;
    width: 100%;
    max-width: 1268px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
function Header() {
  return (
    <Container>
      <div className="header"></div>
    </Container>
  );
}

export default Header;
