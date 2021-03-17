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
  onPress(): void;
}

const InvisibleButton: React.FC<InvisibleButtonProps> = ({
  title,
  subTitle,
  Icon,
  onPress,
}) => {
  return (
    <Container onPress={onPress}>
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
