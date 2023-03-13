import styled from 'styled-components';

export const Button = styled.button`
  padding: ${props => props.padding || '10px'};
  width: fit-content;
  height: fit-content;
  margin: ${props => props.margin || 0};
  white-space: nowrap !important;
  background: ${props => props.bg || 'white'};
  color: ${props => props.color || 'var(--fontBlack__600)'};
  border: 1px solid ${props => props.border || 'var(--fontBlack__600)'};
  margin: ${props => props.padding || '8px'};
  border-radius: 5px;
  font-size: var(--fs--mid);
  font-weight: 550;
  cursor: pointer;
  :hover {
    background: ${props => props.hover || 'var(--fontBlack__500)'};
    color: ${props => props.hover || 'white'};
    border: 1px solid ${props => props.border || 'var(--fontBlack__500)'};
  }
`;
