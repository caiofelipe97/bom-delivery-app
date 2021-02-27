import React, { useEffect, useMemo, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { ApplicationState } from '../../../store';
import { Creators as restaurantsCreators } from '../../../store/ducks/restaurants/actions';

import Section from '../../../components/Section';
import RestaurantList from '../../../components/RestaurantList';

import {
  Container,
  EmptyListContainer,
  EmptyListText,
  ClearFiltersButton,
  ClearFiltersText,
} from './styles';
import { Restaurant } from '~/types';

interface RouteParams {
  category: string;
}

const List: React.FC = () => {
  const dispatch = useDispatch();
  const { params } = useRoute();
  const { category } = params as RouteParams;

  const filteredRestaurants = useSelector<ApplicationState, Restaurant[]>(
    state => state.restaurants.filteredRestaurants,
  );

  const isLoading = useSelector<ApplicationState, boolean>(
    state => state.loading.loading,
  );

  useEffect(() => {
    if (category) {
      dispatch(restaurantsCreators.getRestaurantsByCategory(category));
    }
  }, [category, dispatch]);

  const handleClearFilters = useCallback(() => {
    dispatch(restaurantsCreators.getRestaurantsByCategory(category));
    dispatch(restaurantsCreators.setFilters('', '', [], 0));
  }, [category, dispatch]);

  const isEmpty = useMemo(() => {
    return filteredRestaurants.length === 0;
  }, [filteredRestaurants]);

  return (
    <ScrollView contentContainerStyle={isLoading || isEmpty ? { flex: 1 } : {}}>
      <Container>
        {isLoading ? (
          <ActivityIndicator size={50} color="#78308c" style={{ flex: 1 }} />
        ) : (
          <>
            {!isEmpty ? (
              <Section>
                <RestaurantList data={filteredRestaurants} />
              </Section>
            ) : (
              <EmptyListContainer>
                <EmptyListText>Nenhum Resultado encontrado</EmptyListText>
                <ClearFiltersButton onPress={handleClearFilters}>
                  <ClearFiltersText>Limpar filtros</ClearFiltersText>
                </ClearFiltersButton>
              </EmptyListContainer>
            )}
          </>
        )}
      </Container>
    </ScrollView>
  );
};

export default List;
