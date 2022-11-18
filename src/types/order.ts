export type orderSheetType = {
  buyer: buyerType;
  coupons: [];
  coupangCash: number;
  coupayMoney: number;
  address: addressType;
  orderItems: { product: productType; quantity: number }[];
};

export type buyerType = {
  name: string;
  email: string;
  phoneNumber: string;
};

export type addressType = {
  id: number;
  receiver: string;
  phoneNumber: string;
  base: string;
  detail: string;
  isFreshAvailable: boolean;
  isWowAAvailable: boolean;
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

export type payMethodType = 'mobile' | 'coupaymoney';
export type mobileCarrierType = 'skt' | 'kt' | 'hello' | 'kct';

export type paymentType = {
  ordersheetId: number;
  addressId: number;
  usedCash: number;
  payMethod: payMethodType;
  mobileCarrier?: mobileCarrierType;
  usedCoupaymoney?: number;
};
