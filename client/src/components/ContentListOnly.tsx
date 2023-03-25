import styled from 'styled-components';
import { ContentCard, ContentCardRow } from './ContentCard';
import { useLocation } from 'react-router-dom';
interface CardList {
  flex_dir?: string;
  bottom_justify?: string;
  fs_h1?: string;
  body?: string;
  heart?: string;
  radius?: string;
  img_width?: string;
  content_align?: string;
  line?: string;
  data?: any;
}

const Container = styled('div')<CardList>`
  display: flex;
  justify-content: center;
  @media (min-width: 768px) {
    width: 100%;
    max-width: 1000px;
    min-height: 560px;
  }
  .wrapper {
    @media (max-width: 768px) {
      /* grid-template-columns: repeat(1, minmax(0, 1fr));
      width: 100%;
      max-width: 500px; */
      margin: 0 0 100px 0;
    }
    overflow: visible;
    display: flex;
    flex-direction: row;
    margin-bottom: 50px;
    width: 100%;
  }

  .coloum {
    display: grid !important;
    justify-self: center;
    margin: 10px;
    gap: 12px 12px;
    width: 100%;
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 30px 30px;
    }
  }
  .row {
    display: grid !important;
    justify-self: center;
    margin: 10px;
    gap: 12px 12px;
    width: 100%;
    /* /@media (max-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    } */
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 30px 30px;
    }
  }
`;

function ContentListOnly({ data }: CardList) {
  console.log(data);
  let { pathname } = useLocation();
  console.log(pathname);
  return (
    <Container>
      <div className="wrapper">
        <div className={pathname === '/wishlist' ? 'row' : 'coloum'}>
          {data &&
            data.map((e: any, idx: number) => {
              return pathname === '/wishlist' ? (
                <ContentCardRow
                  key={idx}
                  data={e}
                  like={'none'}
                  remove={'inline'}
                />
              ) : (
                <ContentCard data={e} />
              );
            })}
        </div>
      </div>
    </Container>
  );
}

export default ContentListOnly;
