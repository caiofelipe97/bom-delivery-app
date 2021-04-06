import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  setNewDeliveryAddress: ['deliveryAddress'],
  createDeliveryAddress: ['deliveryAddress'],
  successCreateDeliveryAddress: ['deliveryAddress'],
  getUserDeliveryAddressListRequest: ['userId'],
  getUserDeliveryAddressListSuccess: ['deliveryAddressList'],
  setSelectedDeliveryAddress: ['deliveryAddress'],
});
