import React from 'react';
import SelectedLocationIcon from '~/assets/selected-location-icon.svg';
import PastTimeIcon from '~/assets/past-time-icon.svg';

import {
  Container,
  TextContainer,
  AddressText,
  RegionText,
  ComplementText,
  Icon,
} from './styles';

interface DeliveryAddressCardProps {
  address: string;
  region: string;
  complement?: string;
  selected?: boolean;
  handleOnSelect: () => void;
}

const DeliveryAddressCard: React.FC<DeliveryAddressCardProps> = ({
  address,
  region,
  complement,
  selected,
  handleOnSelect,
}) => {
  return (
    <Container selected={selected} onPress={handleOnSelect}>
      {selected ? <SelectedLocationIcon /> : <PastTimeIcon />}
      <TextContainer>
        <AddressText>{address}</AddressText>
        <RegionText>{region}</RegionText>
        <ComplementText>{complement}</ComplementText>
      </TextContainer>
      <Icon name="ellipsis-v" size={16} />
    </Container>
  );
};

export default DeliveryAddressCard;
