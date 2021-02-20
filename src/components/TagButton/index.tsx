import React from 'react';
import { SvgProps } from 'react-native-svg';
import { Container, Title } from './styles';

interface TagButtonProps {
  name: string;
  selected: boolean;
  Icon?: React.FC<SvgProps>;
  onPress(): void;
}

const TagButton: React.FC<TagButtonProps> = ({
  name,
  Icon,
  selected,
  onPress,
  ...rest
}) => (
  <Container isSelected={selected} onPress={onPress} {...rest}>
    <Title isSelected={selected}>{name}</Title>
    {Icon && <Icon />}
  </Container>
);

export default TagButton;
