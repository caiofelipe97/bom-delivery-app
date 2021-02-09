import firestore from '@react-native-firebase/firestore';
import { Restaurant } from './types';

export const getAll = async (): Promise<Restaurant[]> => {
  const snapshot = await firestore()
    .collection<Restaurant>('restaurants')
    .get();
  return snapshot.docs.map(doc => doc.data());
};
