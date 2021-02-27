import React from 'react';
import { SvgProps } from 'react-native-svg';
import { TouchableButton, ButtonContainer, Title } from './styles';

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
  <TouchableButton onPress={onPress} {...rest}>
    <ButtonContainer isSelected={selected}>
      <Title isSelected={selected}>{name}</Title>
      {Icon && <Icon />}
    </ButtonContainer>
  </TouchableButton>
);

export default TagButton;
