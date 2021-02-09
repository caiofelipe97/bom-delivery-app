import React, { useCallback } from 'react';
import formatMoney from '../../utils/formatMoney';

import {
  Restaurant,
  RestaurantListContainer,
  RestaurantListItem,
  LogoContainer,
  Logo,
  Infos,
  RestaurantDetails,
  DeliveryDetails,
  Separator,
  TextDescription,
  StarIcon,
  ClockIcon,
} from './styles';

interface RestaurantListProps {
  data: Restaurant[];
}

const RestaurantList: React.FC<RestaurantListProps> = ({ data }) => {
  const categoriesToString = useCallback((foods: string[]) => {
    return foods.join(', ');
  }, []);
  return (
    <RestaurantListContainer
      data={data}
      keyExtractor={item => String(item.user)}
      renderItem={({ item }) => (
        <RestaurantListItem key={item.user}>
          <LogoContainer>
            <Logo source={{ uri: item.img }} />
          </LogoContainer>
          <Infos>
            <TextDescription size="18" color="#333" bold>
              {item.name}
            </TextDescription>
            <RestaurantDetails>
              <StarIcon name="star" />
              <TextDescription color="#dab36d" size="18" bold>
                4,6
              </TextDescription>
              <Separator>●</Separator>
              <TextDescription size="16" color="#999">
                {categoriesToString(item.foods)}
              </TextDescription>
            </RestaurantDetails>
            <DeliveryDetails>
              <ClockIcon name="clock" size={16} />
              <TextDescription size="16" color="#999">
                {`${item.timeToDelivery.min}-${item.timeToDelivery.max} min`}
              </TextDescription>
              <Separator>●</Separator>
              <TextDescription
                size="16"
                color={item.deliveryPrice === 0 ? '#008000' : '#999'}
              >
                {formatMoney(item.deliveryPrice)}
              </TextDescription>
            </DeliveryDetails>
          </Infos>
        </RestaurantListItem>
      )}
    />
  );
};

export default RestaurantList;
