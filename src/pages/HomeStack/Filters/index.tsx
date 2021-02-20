import React from 'react';
import { View } from 'react-native';
import Button from '~/components/Button';
import Typography from '../../../components/Typography';
import CategoryCircleButton from '../../../components/CategoryCircleButton';

import {
  Container,
  SectionContainer,
  ShowResultsContainer,
  ShowResultsButton,
} from './styles';

const Filters: React.FC = () => {
  return (
    <Container>
      <SectionContainer>
        <Typography color="#3E4462" size="18">
          Ordenar por
        </Typography>
        <CategoryCircleButton />
      </SectionContainer>
      <SectionContainer>
        <Typography color="#3E4462" size="18">
          Formas de pagamento
        </Typography>
      </SectionContainer>
      <SectionContainer>
        <Typography bold color="#3E4462" size="18">
          Categorias
        </Typography>
      </SectionContainer>
      <ShowResultsContainer>
        <ShowResultsButton>Exibir resultados</ShowResultsButton>
      </ShowResultsContainer>
    </Container>
  );
};

export default Filters;
