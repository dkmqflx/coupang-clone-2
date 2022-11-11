import { ROCKET_ITEM, SELLER_ITEM } from './../constants/cart';

export type cartItemType = {
  id: number;
  product: {
    expectedDeliveryDate: string;
    id: number;
    imageUrl: string;
    isAssured: boolean;
    isEarlyDelivery: boolean;
    isMdRecommended: boolean;
    isRecommended: boolean;
    isSoldout: boolean;
    maxPoint: number;
    name: string;
    originalPrice: number;
    rating: number;
    reviewCount: number;
    rocketType: string;
    salePrice: number;
    shippinFee: number;
    weight: number;
    wowPrice: number;
  };
  quantity: number;
};

export type checkAddedcartItemType = cartItemType & { checked: boolean };

export type itemType = typeof ROCKET_ITEM | typeof SELLER_ITEM;