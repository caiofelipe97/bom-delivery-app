export interface Restaurant {
  id: string;
  user: string;
  name: string;
  img: string;
  foods: string[];
  timeToDelivery: {
    min: number;
    max: number;
  };
  'timeToDelivery.min': number;
  'timeToDelivery.max': number;
  'paymentMethod.cardMachine': boolean;
  'paymentMethod.money': boolean;
  deliveryPrice: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  birthDate: Date;
}

export interface Category {
  id: string;
  imageUrl: string;
  title: string;
}

export interface Promotion {
  id: string;
  bannerUrl: string;
}

export interface UserAddress {
  mainAddress: string;
  mainText: string;
  secondaryText: string;
  streetName?: string;
  streetNumber?: string;
  noNumber?: boolean;
  wrongNumber?: boolean;
  addressType?: 'place' | 'street';
  district?: string;
  city?: string;
  state?: string;
  country?: string;
  CEP?: string;
  location: {
    latitude: number;
    longitude: number;
  };
}
