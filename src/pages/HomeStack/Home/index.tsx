import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
import { Creators as restaurantsCreators } from '../../../store/ducks/restaurants/actions';

import Section from '../../../components/Section';
import RestaurantList from '../../../components/RestaurantList';
import { useAuth } from '../../../hooks/auth';
import { Container, Title } from './styles';
import { Restaurant } from '../../../store/ducks/restaurants/types';

const Home: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const restaurantList = useSelector<ApplicationState, Restaurant[]>(
    state => state.restaurants.restaurantList,
  );

  useEffect(() => {
    dispatch(restaurantsCreators.getAllRestaurants());
  }, [dispatch]);

  return (
    <Container>
      <Title>Bem-Vindo ao Bom Delivery, {user?.name}!</Title>
      <Section title="Lojas" noMargin>
        <RestaurantList data={restaurantList} />
      </Section>
    </Container>
  );
};

export default Home;
