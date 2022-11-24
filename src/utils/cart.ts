import { checkAddedcartItemType, itemType } from '../types/cart';
import { ROCKET_ITEM, SELLER_ITEM } from '../constants/cart';

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

export const filterItemsByType = (
  items: checkAddedcartItemType[],
  type: itemType
) => {
  switch (type) {
    case ROCKET_ITEM:
      return items.filter(
        (item: checkAddedcartItemType) => item.product.rocketType
      );
    case SELLER_ITEM:
      return items.filter(
        (item: checkAddedcartItemType) => !item.product.rocketType
      );
    default:
      return items;
  }
};

export const handleCheckAllState = (
  rocketItems: checkAddedcartItemType[],
  sellerItems: checkAddedcartItemType[]
) => {
  if (
    rocketItems.every((item) => item.checked) &&
    sellerItems.every((item) => item.checked)
  ) {
    return true;
  } else {
    return false;
  }
};
