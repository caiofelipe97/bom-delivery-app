import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { ApplicationState } from '../../../store';
import { Creators as restaurantsCreators } from '../../../store/ducks/restaurants/actions';

import Section from '../../../components/Section';
import RestaurantList from '../../../components/RestaurantList';

import { Container } from './styles';
import { Restaurant } from '~/types';

const List: React.FC = () => {
  const dispatch = useDispatch();

  const restaurantList = useSelector<ApplicationState, Restaurant[]>(
    state => state.restaurants.restaurantList,
  );

  useEffect(() => {
    dispatch(restaurantsCreators.getAllRestaurants());
  }, [dispatch]);

  return (
    <ScrollView>
      <Container>
        <Section noMargin>
          <RestaurantList data={restaurantList} />
        </Section>
      </Container>
    </ScrollView>
  );
};

export default List;
