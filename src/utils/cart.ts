import { itemType, cartItemType } from '../types/cart';
import { ROCKET_ITEM, SELLER_ITEM } from '../constants/cart';

export const getTotalPrice = (
  items: cartItemType[],
  checkedItems: string[]
) => {
  const filtertedItems = items.filter((item) =>
    checkedItems.includes(`${item.id}`)
  );

  return filtertedItems.reduce(
    (prev, cur) => prev + cur.product.salePrice * cur.quantity,
    0
  );
};

export const getShippingFee = (
  items: cartItemType[],
  checkedItems: string[]
) => {
  const filtertedItems = items.filter((item) =>
    checkedItems.includes(`${item.id}`)
  );
  return filtertedItems.reduce((prev, cur) => prev + cur.product.shippinFee, 0);
};

export const filterItemsByType = (items: cartItemType[], type: itemType) => {
  switch (type) {
    case ROCKET_ITEM:
      return items.filter((item: cartItemType) => item.product.rocketType);
    case SELLER_ITEM:
      return items.filter((item: cartItemType) => !item.product.rocketType);
    default:
      return items;
  }
};
