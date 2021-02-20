import React from 'react';
import { SvgProps } from 'react-native-svg';
import { Container, Content, Title } from './styles';

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
    <Content isSelected={selected} {...rest} onPress={onPress}>
      {selected ? <SelectedIcon /> : <Icon />}
    </Content>
    <Title isSelected={selected}>{title}</Title>
  </Container>
);

export default CategoryCircleButton;
