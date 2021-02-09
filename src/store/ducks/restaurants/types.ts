export interface Restaurant {
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

export interface RestaurantsState {
  restaurantList: Restaurant[];
}
