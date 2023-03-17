import styled from 'styled-components';
import { useRef, useState } from 'react';
// import Banner1 from '../../assets/banner/banner1.png';
// import Banner2 from '../../assets/banner/banner2.png';
// import Banner3 from '../../assets/banner/banner3.png';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';
import { images } from '../../assets/banner/banner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
  white-space: nowrap; */
  overflow: hidden;
  @media (max-width: 768px) {
    display: none;
  }
  .carousel {
    display: flex;
    /* flex-direction: row; */
    overflow: hidden;
    /* white-space: nowrap; */
  }
  img {
    width: 100vw;
    height: 350px;
    /* max-width: 1268px; */
    object-fit: cover;
    box-sizing: border-box;
  }
  .pointer_L {
    font-size: 45px;
    top: -220px;
    left: 50px;
    color: white;
    position: absolute;
    cursor: pointer;
  }
  .pointer_R {
    cursor: pointer;
    font-size: 45px;
    right: 50px;
    top: -220px;
    color: white;
    position: absolute;
  }

  /* .image {
    width: 500px;
    height: 300px;
    box-sizing: border-box;
  } */

  .controller {
    position: relative;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 30px;
  }
`;

type OnSelectImageType = {
  currentIndex: number;
  behavior?: 'auto' | 'smooth';
};

function Banner() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const imageRef = useRef<HTMLDivElement[] | null[]>([]);

  function onSelectImage({
    currentIndex,
    behavior = 'smooth',
  }: OnSelectImageType) {
    setCurrentImageIndex(currentIndex);
    imageRef.current[currentIndex]?.scrollIntoView({
      inline: 'center',
      block: 'nearest',
      behavior,
    });
  }

  function handleImageMove(currentIndex: number) {
    const firstIndex = 0;
    const lastIndex = images?.length - 1;

    if (currentIndex < firstIndex) {
      return onSelectImage({ currentIndex: lastIndex, behavior: 'auto' });
    }
    if (currentIndex > lastIndex) {
      return onSelectImage({ currentIndex: firstIndex, behavior: 'auto' });
    }

    onSelectImage({ currentIndex });
  }

  return (
    <Container>
      <section className="carousel">
        {images.map((image, index) => (
          <div key={image.id} ref={el => (imageRef.current[index] = el)}>
            <img
              className={`image ${
                currentImageIndex === index ? 'selected' : ''
              }`}
              alt={`carousel-img-${index}`}
              src={image.location}
            />
          </div>
        ))}
      </section>

      <section className="controller">
        <AiOutlineLeft
          className="pointer_L"
          onClick={() => handleImageMove(currentImageIndex - 1)}
        />
        <AiOutlineRight
          className="pointer_R"
          onClick={() => handleImageMove(currentImageIndex + 1)}
        />
      </section>
    </Container>
  );
}

export default Banner;
