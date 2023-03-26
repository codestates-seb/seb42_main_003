import styled from 'styled-components';
import background from '../../assets/background.png';
export const Container = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
  width: 100vw;
  background-color: var(--searchbar__color);
  display: flex;
  justify-content: center;
  /* margin-bottom: 30px; */
  .wrap {
    background-image: url(${background});
    display: flex;
    justify-content: center;
    padding: 30px 16px;
    margin-bottom: 10px;
    width: 100%;
    max-width: 1000px;
    h1 {
      font-size: var(--fs__h1);
      color: var(--fontBlack__600);
      font-weight: 500;
    }
  }
`;

type HeaderType = { title: string };
export function PageHeader({ title }: HeaderType) {
  return (
    <Container>
      <div className="wrap">
        <h1>{title}</h1>
      </div>
    </Container>
  );
}
