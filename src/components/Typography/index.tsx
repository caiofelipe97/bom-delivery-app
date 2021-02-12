import React from 'react';
import { TypographyStyled, TypographyProps } from './styles';

const Typography: React.FC<TypographyProps> = ({
  size,
  color,
  align,
  bold,
  uppercase,
  strike,
  children,
}) => {
  return (
    <TypographyStyled
      size={size}
      color={color}
      align={align}
      bold={bold}
      uppercase={uppercase}
      strike={strike}
    >
      {children}
    </TypographyStyled>
  );
};

export default Typography;
