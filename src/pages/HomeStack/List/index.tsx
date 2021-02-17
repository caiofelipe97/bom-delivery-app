import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { ApplicationState } from '../../../store';
import { Creators as restaurantsCreators } from '../../../store/ducks/restaurants/actions';

import Section from '../../../components/Section';
import RestaurantList from '../../../components/RestaurantList';

import { Container } from './styles';
import { Restaurant } from '~/types';

interface RouteParams {
  category: string;
}

const List: React.FC = () => {
  const dispatch = useDispatch();
  const { params } = useRoute();
  const { category } = params as RouteParams;

  const restaurantList = useSelector<ApplicationState, Restaurant[]>(
    state => state.restaurants.restaurantList,
  );

  useEffect(() => {
    if (category) {
      dispatch(restaurantsCreators.getRestaurantsByCategory(category));
    }
  }, [category, dispatch]);

  return (
    <ScrollView>
      <Container>
        <Section>
          <RestaurantList data={restaurantList} />
        </Section>
      </Container>
    </ScrollView>
  );
};

export default List;
