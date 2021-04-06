import { UserAddress } from '~/types';

export interface DeliveryAddressState {
  newDeliveryAddress: UserAddress;
  selectedDeliveryAddress: UserAddress;
  userAddresses: UserAddress[];
}
