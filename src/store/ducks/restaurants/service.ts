import firestore from '@react-native-firebase/firestore';
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
