import React from 'react';
import RestaurantList from '../../../components/RestaurantList';
import { useAuth } from '../../../hooks/auth';
import { Container, Title } from './styles';

const Home: React.FC = () => {
  const { user } = useAuth();
  return (
    <Container>
      <Title>Bem-Vindo ao Bom Delivery, {user?.name}!</Title>
      <RestaurantList
        data={[
          {
            name: 'Weslley Lanches',
            img:
              'https://firebasestorage.googleapis.com/v0/b/bom-delivery.appspot.com/o/restaurantLogos%2FQFDaKpe67EvkpwSSepCB.jpeg?alt=media&token=1afa0c40-b029-4418-8f08-32da6ff46abf',
            deliveryPrice: 0,
            id: '123124214',
            foods: ['Açai', 'Hamburguer', 'Lanches'],
            timeToDelivery: {
              min: '10',
              max: '30',
            },
          },
          {
            name: 'Açai Mania',
            img:
              'https://firebasestorage.googleapis.com/v0/b/bom-delivery.appspot.com/o/restaurantLogos%2F4UkNBPaCP7SB3B1q1Qyb.jpeg?alt=media&token=d444944b-b400-48df-a7a8-93e9f945c54a',
            deliveryPrice: 4,
            foods: ['Açai', 'Bebidas', 'Lanches'],
            id: '12312423',
            timeToDelivery: {
              min: '0',
              max: '0',
            },
          },
        ]}
      />
    </Container>
  );
};

export default Home;
