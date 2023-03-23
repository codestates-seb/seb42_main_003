import styled from 'styled-components';

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

export const Button = styled('button')<ButtonStyled>`
  padding: ${props => props.padding || '12px 14px'};
  width: ${props => props.width || 'fit-content'};
  height: fit-content;
  white-space: nowrap !important;
  background: ${props => props.bg || 'white'};
  color: ${props => props.color || 'var(--fontBlack__600)'};
  border: 1px solid ${props => props.border || 'var(--fontBlack__600)'};
  margin: ${props => props.margin || '8px'};
  border-radius: ${props => props.radius || '8px 8px 8px 8px'};
  font-size: ${props => props.font || 'var(--fs--mid)'};
  font-weight: 550;
  cursor: pointer;
  :hover {
    background: ${props => props.hover || 'var(--fontBlack__500)'};
    color: ${props => props.hcolor || 'white'};
    border: 1px solid ${props => props.hborder || 'var(--fontBlack__500)'};
  }
  &.active {
    background: ${props => props.active || 'var(--fontBlack__500)'};
    color: ${props => props.acolor || 'white'};
    border: 1px solid ${props => props.aborder || 'var(--fontBlack__500)'};
  }
`;
