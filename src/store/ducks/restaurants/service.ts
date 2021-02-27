import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import { Restaurant } from '~/types';

export const getAll = async (): Promise<Restaurant[]> => {
  const snapshot = await firestore()
    .collection<Restaurant>('restaurants')
    .get();
  return snapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id } as Restaurant;
  });
};

export const getByCategory = async (
  category: string,
): Promise<Restaurant[]> => {
  const snapshot = await firestore()
    .collection<Restaurant>('restaurants')
    .where('foods', 'array-contains', category)
    .get();
  return snapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id } as Restaurant;
  });
};

export const getByFilters = async (
  sortFilter: string,
  paymentMethodFilter: string,
  categoriesFilter: string[],
): Promise<Restaurant[]> => {
  const restaurantsRef = firestore().collection<Restaurant>('restaurants');
  let firestoreQuery = restaurantsRef as FirebaseFirestoreTypes.Query<
    Restaurant
  >;

  if (paymentMethodFilter && paymentMethodFilter === 'Máquina móvel') {
    firestoreQuery = firestoreQuery.where(
      'paymentMethod.cardMachine',
      '==',
      true,
    );
  }

  if (categoriesFilter && categoriesFilter.length > 0) {
    firestoreQuery = firestoreQuery.where(
      'foods',
      'array-contains-any',
      categoriesFilter,
    );
  }

  if (sortFilter) {
    if (sortFilter === 'deliveryPrice') {
      firestoreQuery = firestoreQuery.orderBy('deliveryPrice');
    } else if (sortFilter === 'timeToDelivery') {
      firestoreQuery = firestoreQuery.orderBy('timeToDelivery.min');
    }
  }
  const snapshot = await firestoreQuery.get();
  return snapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id } as Restaurant;
  });
};
