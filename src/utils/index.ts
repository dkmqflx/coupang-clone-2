import { productType } from '../types/order';

type cookieType = 'accessToken' | 'refreshToken';

export const parseCookie = (
  cookieString: string | undefined,
  type: cookieType
) => {
  if (!cookieString) return undefined;

  const cookieValue = cookieString
    ?.split(';')
    .find((item) => item.includes(type));

  return cookieValue?.split('=')[1];
};

export const dashToPhoneNumber = (phoneNumber: string) => {
  const dashedPhoneNumber =
    phoneNumber.slice(0, 3) +
    '-' +
    phoneNumber.slice(3, 7) +
    '-' +
    phoneNumber.slice(7);
  return dashedPhoneNumber;
};

export const getPaymentInfo = (
  orderItems: { quantity: number; product: productType }[]
) => {
  const totleShppingFee = orderItems.reduce(
    (prev, cur) => prev + cur.product.shippinFee,
    0
  );

  const totlePrice = orderItems.reduce(
    (prev, cur) => prev + cur.product.salePrice,
    0
  );

  const totleSaveCash = orderItems.reduce(
    (prev, cur) => prev + cur.product.maxPoint,
    0
  );

  return { totleShppingFee, totlePrice, totleSaveCash };
};
