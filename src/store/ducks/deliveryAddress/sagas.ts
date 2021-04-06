import { takeLatest, put, call, all } from 'typed-redux-saga';
import { UserAddress } from '~/types';
import {
  Creators as deliveryAddressCreators,
  Types as deliveryAddressTypes,
} from './actions';

import { Creators as loadingCreators } from '../loading/actions';

import { addDeliveryAddress, getUserDeliveryAddressList } from './service';

interface createDeliveryAddressProps {
  deliveryAddress: UserAddress;
}
function* createDeliveryAddress({
  deliveryAddress,
}: createDeliveryAddressProps) {
  try {
    yield put(loadingCreators.start());
    const deliveryAddressId = yield* call(addDeliveryAddress, deliveryAddress);
    yield put(
      deliveryAddressCreators.successCreateDeliveryAddress({
        ...deliveryAddress,
        id: deliveryAddressId,
      }),
    );
    yield put(loadingCreators.stop());
  } catch (error) {
    console.log(error);
    yield put(loadingCreators.stop());
  }
}

function* getUserDeliveryAddressListRequest({ userId }: { userId: string }) {
  try {
    yield put(loadingCreators.start());
    const deliveryAddressList = yield* call(getUserDeliveryAddressList, userId);
    yield put(
      deliveryAddressCreators.getUserDeliveryAddressListSuccess(
        deliveryAddressList,
      ),
    );
    yield put(loadingCreators.stop());
  } catch (error) {
    console.log(error);
    yield put(loadingCreators.stop());
  }
}

export function* deliveryAddresses() {
  return yield* all([
    takeLatest(
      deliveryAddressTypes.CREATE_DELIVERY_ADDRESS,
      createDeliveryAddress,
    ),
    takeLatest(
      deliveryAddressTypes.GET_USER_DELIVERY_ADDRESS_LIST_REQUEST,
      getUserDeliveryAddressListRequest,
    ),
  ]);
}

export default deliveryAddresses;
