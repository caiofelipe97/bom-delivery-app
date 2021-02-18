import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { ApplicationState } from '../../../store';
import { Creators as restaurantsCreators } from '../../../store/ducks/restaurants/actions';

import FilterIcon from '../../../assets/filterListIcon.png';
import Section from '../../../components/Section';
import RestaurantList from '../../../components/RestaurantList';
import CategorySlider from '../../../components/CategorySlider';
import PromoSlider from '../../../components/PromoSlider';
import {
  Container,
  Header,
  SearchButton,
  SearchText,
  ChevronDownIcon,
  FilterButton,
  FilterText,
  FilterImage,
} from './styles';
import { Restaurant } from '~/types';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const allRestaurants = useSelector<ApplicationState, Restaurant[]>(
    state => state.restaurants.allRestaurants,
  );

  const isLoading = useSelector<ApplicationState, boolean>(
    state => state.loading.loading,
  );

  useEffect(() => {
    dispatch(restaurantsCreators.getAllRestaurants());
  }, [dispatch]);

  const handleCategoryFilter = useCallback(
    category => {
      navigation.navigate('List', {
        category,
      });
    },
    [navigation],
  );

  return (
    <ScrollView contentContainerStyle={isLoading ? { flex: 1 } : {}}>
      <Container>
        <Header>
          <SearchButton>
            <SearchText numberOfLines={1}>Luiza Bezerra Motta, 720</SearchText>
            <ChevronDownIcon name="chevron-down" size={24} />
          </SearchButton>
          <FilterButton>
            <FilterText>Filtros</FilterText>
            <FilterImage source={FilterIcon} />
          </FilterButton>
        </Header>
        {isLoading ? (
          <ActivityIndicator size={50} color="#78308c" style={{ flex: 1 }} />
        ) : (
          <>
            <Section title="Categorias" noMargin>
              <CategorySlider
                data={[
                  {
                    id: 'hkhjkhgf',
                    title: 'Mercado',
                    imageUrl:
                      'https://buscaperfeita.com.br/portal3/public/upload/gallery/mercado-da-familia_3754-b.jpg',
                  },
                  {
                    id: 'aafsads',
                    title: 'Lanches',
                    imageUrl:
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFxXfpvWfq6fUV5Bf9ZswLKsyTanSEZy5trQ&usqp=CAU',
                  },
                  {
                    id: 'asdasdg',
                    title: 'Pizza',
                    imageUrl:
                      'https://www.cvc.com.br/dicas-de-viagem/wp-content/uploads/2020/07/Topo-Pizza.jpg',
                  },
                  {
                    id: 'zxcbsag',
                    title: 'Açai',
                    imageUrl:
                      'https://content.portaldofranchising.com.br/wp-content/uploads/2018/04/17180153/franquias-de-acai-1.jpg',
                  },
                ]}
                onCategoryClick={handleCategoryFilter}
              />
            </Section>
            <Section>
              <PromoSlider
                data={[
                  {
                    id: '123124',
                    bannerUrl:
                      'https://static-images.ifood.com.br/image/upload/t_high,q_100/webapp/landing/landing-banner-1.png',
                  },
                  {
                    id: '124125',
                    bannerUrl:
                      'https://static-images.ifood.com.br/image/upload/t_high,q_100/webapp/landing/landing-banner-2.png',
                  },
                ]}
              />
            </Section>
            <Section title="Lojas" noMargin>
              <RestaurantList data={allRestaurants} />
            </Section>
          </>
        )}
      </Container>
    </ScrollView>
  );
};

export default Home;
