import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import TagButton from '~/components/TagButton';
import { categories } from '../../../constants';
import Typography from '../../../components/Typography';
import CategoryCircleButton from '../../../components/CategoryCircleButton';
import MotocycleIcon from '../../../assets/motocycle-icon.svg';
import PurpleMotocycleIcon from '../../../assets/purple-motocycle-icon.svg';
import SortIcon from '../../../assets/sort-icon.svg';
import PurpleSortIcon from '../../../assets/purple-sort-icon.svg';
import ClockIcon from '../../../assets/clock-icon.svg';
import PurpleClockIcon from '../../../assets/purple-clock-icon.svg';
import StarIcon from '../../../assets/star-icon.svg';
import PurpleStarIcon from '../../../assets/purple-star-icon.svg';
import { Creators as restaurantsCreators } from '../../../store/ducks/restaurants/actions';
import { RestaurantsState } from '~/store/ducks/restaurants/types';
import { ApplicationState } from '~/store';

import {
  ClearFilterContainer,
  ClearFiltersButton,
  ClearFiltersText,
  Container,
  SectionContainer,
  CircleButtonsContainer,
  TagsContainer,
  ShowResultsContainer,
  ShowResultsButton,
} from './styles';

interface RouteParams {
  selectedCategory?: string;
}

const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();

  const [sortFilter, setSortFilter] = useState('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('');
  const [categoriesFilter, setCategoriesFilter] = useState<string[]>([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ClearFilterContainer>
          <ClearFiltersButton
            onPress={() => {
              setSortFilter('');
              setPaymentMethodFilter('');
              setCategoriesFilter([]);
            }}
          >
            <ClearFiltersText>Limpar</ClearFiltersText>
          </ClearFiltersButton>
        </ClearFilterContainer>
      ),
    });
  }, [navigation]);

  const {
    sortFilter: reducerSortFilter,
    paymentMethodFilter: reducerPaymentMethodFilter,
    categoriesFilter: reducerCategoryFilter,
  } = useSelector<ApplicationState, RestaurantsState>(
    state => state.restaurants,
  );

  useEffect(() => {
    setSortFilter(reducerSortFilter);
    setPaymentMethodFilter(reducerPaymentMethodFilter);
    setCategoriesFilter(reducerCategoryFilter);
  }, [reducerSortFilter, reducerPaymentMethodFilter, reducerCategoryFilter]);

  const handleSelectSortFilter = useCallback(sortBy => {
    setSortFilter(sortBy);
  }, []);

  const handleSelectPaymentMethodFilter = useCallback(
    paymentFilter => {
      if (paymentFilter === paymentMethodFilter) {
        setPaymentMethodFilter('');
      } else {
        setPaymentMethodFilter(paymentFilter);
      }
    },
    [paymentMethodFilter],
  );

  const handleSelectCategoryFilter = useCallback(
    (categoryName: string) => {
      const findCategory = categoriesFilter.find(
        categoryTitle => categoryName === categoryTitle,
      );
      if (findCategory) {
        const filteredCategories = categoriesFilter.filter(
          categoryTitle => categoryName !== categoryTitle,
        );
        setCategoriesFilter(filteredCategories);
      } else {
        setCategoriesFilter([...categoriesFilter, categoryName]);
      }
    },
    [categoriesFilter],
  );

  const renderTagsContainer = useCallback(() => {
    return (
      <TagsContainer>
        {categories.map(category => (
          <TagButton
            key={category.title}
            name={category.title}
            selected={categoriesFilter.includes(category.title)}
            onPress={() => handleSelectCategoryFilter(category.title)}
          />
        ))}
      </TagsContainer>
    );
  }, [categoriesFilter, handleSelectCategoryFilter]);

  const handleFilterResults = useCallback(() => {
    const selectedCategory = params?.selectedCategory
      ? params.selectedCategory
      : '';

    dispatch(
      restaurantsCreators.getFilteredRestaurants(
        sortFilter,
        paymentMethodFilter,
        categoriesFilter,
        selectedCategory,
      ),
    );
    navigation.goBack();
  }, [
    categoriesFilter,
    dispatch,
    navigation,
    params,
    paymentMethodFilter,
    sortFilter,
  ]);

  return (
    <Container>
      <SectionContainer>
        <Typography color="#3E4462" size="18">
          Ordenar por
        </Typography>
        <CircleButtonsContainer>
          <CategoryCircleButton
            title="Ordenação padrão"
            Icon={SortIcon}
            selected={sortFilter === ''}
            SelectedIcon={PurpleSortIcon}
            onPress={() => {
              handleSelectSortFilter('');
            }}
          />
          <CategoryCircleButton
            title="Taxa de entrega"
            Icon={MotocycleIcon}
            selected={sortFilter === 'deliveryPrice'}
            SelectedIcon={PurpleMotocycleIcon}
            onPress={() => {
              handleSelectSortFilter('deliveryPrice');
            }}
          />
          <CategoryCircleButton
            title="Tempo de entrega"
            Icon={ClockIcon}
            selected={sortFilter === 'timeToDelivery'}
            SelectedIcon={PurpleClockIcon}
            onPress={() => {
              handleSelectSortFilter('timeToDelivery');
            }}
          />
          <CategoryCircleButton
            title="Avaliação"
            Icon={StarIcon}
            selected={sortFilter === 'rating'}
            SelectedIcon={PurpleStarIcon}
            onPress={() => {
              handleSelectSortFilter('rating');
            }}
          />
        </CircleButtonsContainer>
      </SectionContainer>
      <SectionContainer>
        <Typography color="#3E4462" size="18">
          Formas de pagamento
        </Typography>
        <TagsContainer>
          <TagButton
            name="Máquina móvel"
            selected={paymentMethodFilter === 'Máquina móvel'}
            onPress={() => {
              handleSelectPaymentMethodFilter('Máquina móvel');
            }}
          />
        </TagsContainer>
      </SectionContainer>
      <SectionContainer>
        <Typography bold color="#3E4462" size="18">
          Categorias
        </Typography>
        {renderTagsContainer()}
      </SectionContainer>
      <ShowResultsContainer>
        <ShowResultsButton onPress={handleFilterResults}>
          Exibir resultados
        </ShowResultsButton>
      </ShowResultsContainer>
    </Container>
  );
};

export default Filters;
