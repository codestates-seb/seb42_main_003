import styled from 'styled-components';

interface ButtonStyled {
  key?: number;
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
}

export const Button = styled('button')<ButtonStyled>`
  padding: ${props => props.padding || '10px'};
  width: fit-content;
  height: fit-content;
  white-space: nowrap !important;
  background: ${props => props.bg || 'white'};
  color: ${props => props.color || 'var(--fontBlack__600)'};
  border: 1px solid ${props => props.border || 'var(--fontBlack__600)'};
  margin: ${props => props.padding || '8px'};
  border-radius: 5px;
  font-size: ${props => props.font || 'var(--fs--mid)'};
  font-weight: 550;
  cursor: pointer;
  :hover {
    background: ${props => props.hover || 'var(--fontBlack__500)'};
    color: ${props => props.hover || 'white'};
    border: 1px solid ${props => props.border || 'var(--fontBlack__500)'};
  }
  &.active {
    background: ${props => props.hover || 'var(--fontBlack__500)'};
    color: ${props => props.hover || 'white'};
    border: 1px solid ${props => props.border || 'var(--fontBlack__500)'};
  }
`;
