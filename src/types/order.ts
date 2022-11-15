export type orderSheetType = {
  buyer: {
    name: string;
    email: string;
    phoneNumber: string;
  };
  coupons: [];
  coupangCash: number;
  coupayMoney: number;
  address: {
    id: number;
    receiver: string;
    phoneNumber: string;
    base: string;
    detail: string;
    isFreshAvailable: boolean;
    isWowAAvailable: boolean;
  };
  orderItems: { product: productType; quantity: number }[];
};

export type productType = {
  name: string;
  imageUrl: string;
  reviewCount: number;
  originalPrice: number;
  id: number;
  rocketType: string | null;
  weight: number | null;
  salePrice: number;
  wowPrice: number;
  shippinFee: number;
  isRecommended: boolean;
  isMdRecommended: boolean;
  isSoldout: boolean;
  maxPoint: number;
  expectedDeliveryDate: string;
  isAssured: boolean;
  isEarlyDelivery: boolean;
};
