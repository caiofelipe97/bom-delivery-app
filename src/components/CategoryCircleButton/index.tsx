import React from 'react';
import { SvgProps } from 'react-native-svg';
import { Container, TouchableButton, ButtonContainer, Title } from './styles';

interface CategoryCircleButtonProps {
  title: string;
  Icon: React.FC<SvgProps>;
  selected: boolean;
  SelectedIcon: React.FC<SvgProps>;
  onPress(): void;
}

const CategoryCircleButton: React.FC<CategoryCircleButtonProps> = ({
  title,
  Icon,
  selected,
  SelectedIcon,
  onPress,
  ...rest
}) => (
  <Container>
    <TouchableButton {...rest} onPress={onPress}>
      <ButtonContainer isSelected={selected}>
        {selected ? <SelectedIcon /> : <Icon />}
      </ButtonContainer>
    </TouchableButton>
    <Title isSelected={selected}>{title}</Title>
  </Container>
);

export default CategoryCircleButton;
