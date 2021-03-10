import React from 'react';
import { SvgProps } from 'react-native-svg';

import {
  Container,
  IconContainer,
  TextContainer,
  ButtonTitle,
  ButtonSubTitle,
} from './styles';

interface InvisibleButtonProps {
  title: string;
  subTitle?: string;
  Icon: React.FC<SvgProps>;
}

const InvisibleButton: React.FC<InvisibleButtonProps> = ({
  title,
  subTitle,
  Icon,
}) => {
  return (
    <Container>
      <IconContainer>
        <Icon />
      </IconContainer>
      <TextContainer>
        <ButtonTitle>{title}</ButtonTitle>
        {subTitle && <ButtonSubTitle>{subTitle}</ButtonSubTitle>}
      </TextContainer>
    </Container>
  );
};

export default InvisibleButton;
