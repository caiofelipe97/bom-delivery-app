import React from 'react';
import MotocycleIcon from '../../assets/motocycle-icon.svg';
import { Container } from './styles';

const CategoryCircleButton: React.FC = ({ ...rest }) => (
  <Container {...rest}>
    <MotocycleIcon />
  </Container>
);

export default CategoryCircleButton;
