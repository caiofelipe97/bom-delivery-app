import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { UserAddress } from '~/types';

export const addDeliveryAddress = async (
  deliveryAddress: UserAddress,
): Promise<string> => {
  const docRef = await firestore()
    .collection<UserAddress>('deliveryAddress')
    .add(deliveryAddress);
  return docRef.id;
};

export const getUserDeliveryAddressList = async (
  userId: string,
): Promise<UserAddress[]> => {
  const snapshot = await firestore()
    .collection<UserAddress>('deliveryAddress')
    .where('userId', '==', userId)
    .get();
  return snapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id } as UserAddress;
  });
};
