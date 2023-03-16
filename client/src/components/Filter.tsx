import styled from 'styled-components';
import { Button } from '../styles/Button';

const Container = styled.div``;

function Filter() {
  return (
    <Container>
      <Button>인기</Button>
      <div className="img_box"></div>
    </Container>
  );
}

export default Filter;
