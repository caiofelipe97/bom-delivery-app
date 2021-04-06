import { createReducer } from 'reduxsauce';
import { Types } from './actions';
import { DeliveryAddressState } from './types';

import { UserAddress } from '~/types';

/* Initial State */
const initialState: DeliveryAddressState = {
  newDeliveryAddress: {} as UserAddress,
  selectedDeliveryAddress: {} as UserAddress,
  userAddresses: [],
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

const successCreateDeliveryAddress = (
  state = initialState,
  { deliveryAddress }: setNewDeliveryAddressPayload,
): DeliveryAddressState => {
  return {
    ...state,
    selectedDeliveryAddress: deliveryAddress,
    userAddresses: [...state.userAddresses, deliveryAddress],
  };
};

interface getUserDeliveryAddressListPayload {
  deliveryAddressList: UserAddress[];
}
const getUserDeliveryAddressListSuccess = (
  state = initialState,
  { deliveryAddressList }: getUserDeliveryAddressListPayload,
): DeliveryAddressState => {
  return {
    ...state,
    userAddresses: deliveryAddressList,
  };
};

const setSelectedDeliveryAddress = (
  state = initialState,
  { deliveryAddress }: setNewDeliveryAddressPayload,
): DeliveryAddressState => {
  return {
    ...state,
    selectedDeliveryAddress: deliveryAddress,
  };
};

const deliveryAddress = {
  [Types.SET_NEW_DELIVERY_ADDRESS]: setNewDeliveryAddress,
  [Types.SUCCESS_CREATE_DELIVERY_ADDRESS]: successCreateDeliveryAddress,
  [Types.GET_USER_DELIVERY_ADDRESS_LIST_SUCCESS]: getUserDeliveryAddressListSuccess,
  [Types.SET_SELECTED_DELIVERY_ADDRESS]: setSelectedDeliveryAddress,
};

export default createReducer(initialState, deliveryAddress);
