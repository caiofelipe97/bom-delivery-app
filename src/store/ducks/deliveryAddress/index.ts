import { createReducer } from 'reduxsauce';
import { Types } from './actions';
import { DeliveryAddressState } from './types';

import { UserAddress } from '~/types';

/* Initial State */
const initialState: DeliveryAddressState = {
  newDeliveryAddress: {} as UserAddress,
};

interface setNewDeliveryAddressPayload {
  deliveryAddress: UserAddress;
}
const setNewDeliveryAddress = (
  state = initialState,
  { deliveryAddress }: setNewDeliveryAddressPayload,
): DeliveryAddressState => {
  return {
    ...state,
    newDeliveryAddress: deliveryAddress,
  };
};

const deliveryAddress = {
  [Types.SET_NEW_DELIVERY_ADDRESS]: setNewDeliveryAddress,
};

export default createReducer(initialState, deliveryAddress);
