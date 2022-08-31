export type productType = {
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
  rocketType: string | null;
  salePrice: number;
  shippinFee: number;
  weight: number | null;
  wowPrice: number;
};

export type queryType = {
  offset: string;
  limit: string;
  sorter: string;
};
