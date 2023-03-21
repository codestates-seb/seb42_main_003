import styled from 'styled-components';

//props에 'green', 'grey'를 전달해주세요(기본은 chamong color)
const inputColor = (color: string) => {
  if (color === 'green') return 'var(--darkGreen__color)';
  else if (color === 'grey') return 'var(--searchbar__color)';
  else return 'var(--chamong__color)';
};
const inputBorderColor = (color: string) => {
  if (color === 'green') return 'var(--darkGreen__color)';
  else if (color === 'grey') return 'none';
  else return 'var(--chamong__color)';
};
const inputBackgroundColor = (color: string) => {
  if (color === 'grey') return 'var(--searchbar__color)';
  else return 'white';
};
const inputFocusColor = (color: string) => {
  if (color === 'green') return 'rgba(121, 193, 111, 0.25)';
  else if (color === 'grey') return 'none';
  else return 'rgba(249, 87, 56, 0.25)';
};

interface inputProps {
  color?: string;
  height?: string;
}

interface ButtonStyled {
  key?: number | string;
  id?: string;
  onClick?: any;
  className?: string;
  padding?: string;
  margin?: string;
  bg?: string;
  color?: string;
  border?: string;
  font?: string;
  hover?: string;
  hcolor?: string;
  hborder?: string;
  active?: string;
  acolor?: string;
  aborder?: string;
  radius?: string;
  width?: string;
}

export const Input = styled.input<inputProps>`
  width: 100%;
  height: 44px;
  font-size: 15px;
  font-weight: 500;
  color: ${(props) =>
    props.color ? inputColor(props.color) : 'var(--chamong__color)'};
  background-color: ${(props) =>
    props.color ? inputBackgroundColor(props.color) : 'white'};
  border: 1px solid
    ${(props) =>
      props.color
        ? inputBorderColor(props.color)
        : 'var(--chamong__color)'};
  border-radius: 12px;
  padding: 0px 12px;
  &:focus {
    box-shadow: 0px 0px 0px 3px
      ${(props) =>
        props.color
          ? inputFocusColor(props.color)
          : 'rgba(249, 87, 56, 0.25)'};
  }
  &::placeholder {
    color: var(--fontBlack__300);
  }
`;

export const TextArea = styled.textarea<inputProps>`
  width: 100%;
  height: ${(props) => props.height || '100px'};
  font-size: 15px;
  font-weight: 500;
  color: ${(props) =>
    props.color ? inputColor(props.color) : 'var(--chamong__color)'};
  background-color: ${(props) =>
    props.color ? inputBackgroundColor(props.color) : 'white'};
  border: 1px solid
    ${(props) =>
      props.color
        ? inputBorderColor(props.color)
        : 'var(--chamong__color)'};
  border-radius: 12px;
  padding: 12px 12px;
  &:focus {
    box-shadow: 0px 0px 0px 3px
      ${(props) =>
        props.color
          ? inputFocusColor(props.color)
          : 'rgba(249, 87, 56, 0.25)'};
  }
  &::placeholder {
    color: var(--fontBlack__300);
  }
`;

interface keywordInputProps {
  isFocus: boolean;
}

export const KeywordInput = styled.div<keywordInputProps>`
  cursor: pointer;
  height: 44px;
  background-color: white;
  position: relative;
  border: 1px solid var(--chamong__color);
  z-index: 999;
  border-radius: 12px;
  .tags {
    transform: translateY(-1.5px);
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    height: 44px;
    /* border: 1px solid green; */
    width: 100%;
    .keyword-box {
      box-sizing: border-box;
      padding: 10px 6px 10px 7px;
      width: fit-content;
      height: fit-content;
      margin: 0px 5px;
      white-space: nowrap !important;
      background: 'white';
      color: var(--chamong__color);
      border: 1.5px solid var(--chamong__color);
      border-radius: 10px;
      font-size: var(--fs__small);
      font-weight: 550;
      cursor: pointer;
    }
    .keyword-title {
      margin-right: 5px;
    }
  }

  .place-holder {
    font-size: 15px;
    color: var(--fontBlack__300);
    position: absolute;
    height: 44px;
    display: flex;
    align-items: center;
    font-weight: 500;
    margin-left: 12px;
  }

  .button-box {
    > h3 {
      font-size: var(--fs__h1);
      padding: 12px;
    }
    display: ${(props) => (props.isFocus ? 'block' : 'none')};
    transform: translateY(44px);
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 12px;
    border: 1px solid var(--fontBlack__300);
  }
  ${(props) =>
    props.isFocus
      ? 'box-shadow: 0px 0px 0px 3px rgba(249, 87, 56, 0.25)'
      : ''};
`;

export const ImageInput = styled.div<ButtonStyled>`
display: flex;
align-items:center;
  > label {
    display: flex;
    align-items: center;
    padding: ${(props) => props.padding || '12px 14px'};
    width: fit-content;
    height: 44px;
    white-space: nowrap !important;
    background: var(--chamong__color);
    color: white;
    border: 1px solid ${(props) => props.border || 'var(--fontBlack__600)'};
    border-radius: ${(props) => props.radius || '8px'};
    font-size: ${(props) => props.font || 'var(--fs--mid)'};
    font-weight: 550;
    cursor: pointer;
    :hover {
      background: white;
      color: var(--chamong__color);
      border: 1px solid
        ${(props) => props.hborder || 'var(--fontBlack__500)'};
    }
    &.active {
      background: ${(props) => props.active || 'var(--fontBlack__500)'};
      color: ${(props) => props.acolor || 'white'};
      border: 1px solid
        ${(props) => props.aborder || 'var(--fontBlack__500)'};
    }
  }
  > input {
    display: none;
  }
`;
