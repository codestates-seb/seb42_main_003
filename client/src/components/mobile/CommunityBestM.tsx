import styled from 'styled-components';

interface CardList {
  data?: string[];
}

const Container = styled('div')<CardList>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: var(--searchbar__color);
  border-top: 0.5px solid var(--chamong__color);
  border-bottom: 0.5px solid var(--chamong__color);
  margin-bottom: 15px;
  @media (min-width: 768px) {
    display: none;
  }
  h1 {
    font-weight: 600;
    font-size: var(--fs__small);
    color: var(--fontBlack__600);
    margin-bottom: 4px;
  }
  .title {
    color: var(--fontBlack__700);
    font-weight: 400;
    font-size: var(--fs__big);
    margin-bottom: 10px;
  }

  .dot {
    width: 7px;
    fill: var(--fontBlack__100);
    margin-right: 10px;
    &.active {
      fill: var(--fontBlack__500);
    }
  }
`;

function CommunityBestM({}: CardList) {
  return (
    <Container>
      <h1>커뮤니티 인기글</h1>
      <div className="title">낚시할 수 있는 차박지 추천해주세요</div>
      <div className="dot_field">
        <svg viewBox="0 0 56 56" fill="none" className="dot active">
          <path d="M56 28C56 33.5379 54.3578 38.9514 51.2812 43.556C48.2045 48.1605 43.8315 51.7494 38.7151 53.8686C33.5988 55.9879 27.969 56.5424 22.5375 55.462C17.106 54.3816 12.1169 51.7149 8.20103 47.799C4.28516 43.8831 1.61841 38.894 0.538025 33.4625C-0.542361 28.0311 0.0121319 22.4012 2.13139 17.2849C4.25064 12.1685 7.83947 7.79553 12.444 4.71885C17.0486 1.64217 22.4621 0 28 0C35.4261 0 42.548 2.94999 47.799 8.20101C53.05 13.452 56 20.5739 56 28Z" />
        </svg>
        <svg viewBox="0 0 56 56" fill="none" className="dot active">
          <path d="M56 28C56 33.5379 54.3578 38.9514 51.2812 43.556C48.2045 48.1605 43.8315 51.7494 38.7151 53.8686C33.5988 55.9879 27.969 56.5424 22.5375 55.462C17.106 54.3816 12.1169 51.7149 8.20103 47.799C4.28516 43.8831 1.61841 38.894 0.538025 33.4625C-0.542361 28.0311 0.0121319 22.4012 2.13139 17.2849C4.25064 12.1685 7.83947 7.79553 12.444 4.71885C17.0486 1.64217 22.4621 0 28 0C35.4261 0 42.548 2.94999 47.799 8.20101C53.05 13.452 56 20.5739 56 28Z" />
        </svg>
        <svg viewBox="0 0 56 56" fill="none" className="dot active">
          <path d="M56 28C56 33.5379 54.3578 38.9514 51.2812 43.556C48.2045 48.1605 43.8315 51.7494 38.7151 53.8686C33.5988 55.9879 27.969 56.5424 22.5375 55.462C17.106 54.3816 12.1169 51.7149 8.20103 47.799C4.28516 43.8831 1.61841 38.894 0.538025 33.4625C-0.542361 28.0311 0.0121319 22.4012 2.13139 17.2849C4.25064 12.1685 7.83947 7.79553 12.444 4.71885C17.0486 1.64217 22.4621 0 28 0C35.4261 0 42.548 2.94999 47.799 8.20101C53.05 13.452 56 20.5739 56 28Z" />
        </svg>
      </div>
    </Container>
  );
}

export default CommunityBestM;
