import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
import { Creators as restaurantsCreators } from '../../../store/ducks/restaurants/actions';

import Section from '../../../components/Section';
import RestaurantList from '../../../components/RestaurantList';
import CategorySlider from '../../../components/CategorySlider';
import PromoSlider from '../../../components/PromoSlider';
import { useAuth } from '../../../hooks/auth';
import { Container, Title } from './styles';
import { Restaurant } from '~/types';

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
      <Section title="Categorias">
        <CategorySlider
          data={[
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
            {
              id: 'hkhjkhgf',
              title: 'Mercado',
              imageUrl:
                'https://buscaperfeita.com.br/portal3/public/upload/gallery/mercado-da-familia_3754-b.jpg',
            },
          ]}
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
        <RestaurantList data={restaurantList} />
      </Section>
    </Container>
  );
};

export default Home;
