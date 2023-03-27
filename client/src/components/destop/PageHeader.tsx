import styled from 'styled-components';
import background from '../../assets/PageHeader/pageImage.png'

export const Container = styled.div<HeaderType>`
  @media (max-width: 768px) {
    display: none;
  }
  width: ${props => props.width};
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  .wrap {
    background-image: url(${background});
    background-repeat: no-repeat;
    background-position: right;
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 16px;
    margin-bottom: 10px;
    width: 100%;
    max-width: 1000px;

    .icon {
      font-size: 2rem;
      margin-right: 10px;
      color: var( --fontBlack__900);
    }

    .text-container {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: center;

      h1 {
        font-size: var(--fs__h1);
        color: var( --fontBlack__900);
        font-weight: 500;
        margin: 0;
        padding: 0;
      }

      .subtitle {
        font-size: var(--fs__small);
        color: var(--fontGray__700);
        font-weight: 400;
        margin: 0;
        padding: 0;
      }
    }
  }
`;

type HeaderType = { title?: string, icon?: any, width?: string };

export function PageHeader({ title, icon, width }: HeaderType) {
  return (
    <Container width={width || "100%"}>
     <div className="wrap">
       <div className="text-container">
        {icon && <div className="icon">{icon}</div>}
        <h1>{title}</h1>
      </div>
     </div>
    </Container>
  );
}
