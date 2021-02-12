import styled from 'styled-components/native';

export interface TypographyProps {
  size: string;
  color?: string;
  align?: string;
  bold?: boolean;
  uppercase?: boolean;
  strike?: boolean;
}

export const TypographyStyled = styled.Text<TypographyProps>`
  font-size: ${props => props.size || 16}px;
  color: ${props => props.color || '#333'};
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  text-decoration: ${props => (props.strike ? 'line-through' : 'none')};
  text-align: ${props => (props.align ? props.align : 'left')};
  font-family: 'RobotoSlab-Medium';
`;
