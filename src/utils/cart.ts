import { checkAddedcartItemType } from '../types/cart';

export const getTotalPrice = (items: checkAddedcartItemType[]) => {
  const checkedItems = items.filter((item) => item.checked);
  return checkedItems.reduce(
    (prev, cur) => prev + cur.product.salePrice * cur.quantity,
    0
  );
};

export const getShippingFee = (items: checkAddedcartItemType[]) => {
  const checkedItems = items.filter((item) => item.checked);
  return checkedItems.reduce((prev, cur) => prev + cur.product.shippinFee, 0);
};
