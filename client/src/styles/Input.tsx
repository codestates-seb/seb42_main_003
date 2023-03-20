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
  color?:string;
  height?:string;
}

export const Input = styled.input<inputProps>`
  width: 100%;
  height: 44px;
  font-size: 15px;
  font-weight: 500;
  color: ${(props) => props.color?inputColor(props.color):'var(--chamong__color)'};
  background-color: ${(props) => props.color?inputBackgroundColor(props.color):'white'};
  border: 1px solid ${(props) => props.color?inputBorderColor(props.color):'var(--chamong__color)'};
  border-radius: 12px;
  padding: 0px 12px;
  &:focus {
    box-shadow: 0px 0px 0px 3px ${(props) => props.color?inputFocusColor(props.color):'rgba(249, 87, 56, 0.25)'};
  }
  &::placeholder {
    color: var(--fontBlack__300);
  }
`;

export const TextArea = styled.textarea<inputProps>`
width: 100%;
height: ${props=>props.height||'100px'};
font-size: 15px;
font-weight: 500;
color: ${(props) => props.color?inputColor(props.color):'var(--chamong__color)'};
background-color: ${(props) => props.color?inputBackgroundColor(props.color):'white'};
border: 1px solid ${(props) => props.color?inputBorderColor(props.color):'var(--chamong__color)'};
border-radius: 12px;
padding: 12px 12px;
&:focus {
  box-shadow: 0px 0px 0px 3px ${(props) => props.color?inputFocusColor(props.color):'rgba(249, 87, 56, 0.25)'};
}
&::placeholder {
  color: var(--fontBlack__300);
}
`;
