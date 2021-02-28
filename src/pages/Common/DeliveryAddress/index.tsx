import React from 'react';
import GpsIcon from '../../../assets/gps-icon.svg';
import SearchIcon from '../../../assets/search-icon.svg';
import InvisibleButton from './InvisibleButton';
import DeliveryAddressCard from './DeliveryAddressCard';

import { Container, DeliveryAddressesContainer } from './styles';

const DeliveryAddress: React.FC = () => {
  return (
    <Container>
      <InvisibleButton
        title="Usar localização atual"
        subTitle="Ativar localização"
        Icon={GpsIcon}
      />
      <InvisibleButton title="Pesquisar endereço" Icon={SearchIcon} />
      <DeliveryAddressesContainer>
        <DeliveryAddressCard
          selected
          address="R. Maria Lima, 33"
          region="Alagoa Nova - PB"
          complement="Próximo ao colégio Monsenhor Borges"
        />
        <DeliveryAddressCard
          address="R. Álvaro Machado, 130"
          region="Alagoa Nova - PB"
          complement="Rádio Piráua FM"
        />
        <DeliveryAddressCard
          address="R. Ver. Clementino Leite, 131"
          region="Alagoa Nova - PB"
          complement="Ao lado do cartório"
        />
        <DeliveryAddressCard
          address="R. Luiza Bezerra Mota, 720"
          region="Campina Grande - PB"
          complement="Rua do Motiva"
        />
      </DeliveryAddressesContainer>
    </Container>
  );
};

export default DeliveryAddress;
