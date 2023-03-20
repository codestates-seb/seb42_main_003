import styled from 'styled-components';
import { useRef, useState } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';
import { BsDot } from 'react-icons/bs';
import { images } from '../../assets/banner/banner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: auto;
  @media (max-width: 768px) {
    display: none;
  }
  .carousel {
    display: flex;
    overflow: hidden;
  }
  img {
    width: 100vw;
    height: 100%;
    object-fit: none;
    box-sizing: border-box;
  }
  .pointer_L {
    font-size: 45px;
    top: -190px;
    left: 50px;
    color: white;
    position: absolute;
    opacity: 0.5;
    cursor: pointer;
  }
  .pointer_R {
    cursor: pointer;
    font-size: 45px;
    right: 50px;
    top: -190px;
    color: white;
    opacity: 0.5;
    position: absolute;
  }
  .controller {
    position: relative;
    display: flex;
    justify-content: center;
    gap: 30px;
  }
  .ba_img {
    height: 330px;
    position: relative;
    background-color: black;
  }
  .img_text {
    position: absolute;
    color: white;
    top: 50%;
    right: 10%;
    font-size: 25px;
    font-weight: 600;
  }
  .controller_dot {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 5px 10px 20px 10px;
  }
  .dot {
    color: var(--fontBlack__100);
    font-size: 45px;
    margin-right: -10px;
    path {
      cursor: pointer;
    }
    &.active {
      color: var(--fontBlack__500);
    }
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
          <div
            className="ba_img"
            key={image.id}
            ref={el => (imageRef.current[index] = el)}
          >
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

      <section className="controller_dot">
        <BsDot
          className={currentImageIndex === 0 ? 'dot active' : 'dot'}
          onClick={() => handleImageMove(0)}
        />
        <BsDot
          className={currentImageIndex === 1 ? 'dot active' : 'dot'}
          onClick={() => handleImageMove(1)}
        />
        <BsDot
          className={currentImageIndex === 2 ? 'dot active' : 'dot'}
          onClick={() => handleImageMove(2)}
        />
      </section>
    </Container>
  );
}

export default Banner;
