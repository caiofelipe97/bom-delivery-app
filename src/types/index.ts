export interface Restaurant {
  id: string;
  user: string;
  name: string;
  img: string;
  foods: string[];
  timeToDelivery: {
    max: string;
    min: string;
  };
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
