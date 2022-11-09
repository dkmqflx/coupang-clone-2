import { useState, useEffect } from 'react';
import { ROCKET_ITEM } from '../constants/cart';
import { cartItemType, checkAddedcartItemType, itemType } from '../types/cart';

const useCartItems = (data: cartItemType[]) => {
  const [checkAll, setCheckAll] = useState(false);
  const [rocketItems, setRocketItems] = useState<checkAddedcartItemType[]>([]);
  const [sellerItems, setSellerItems] = useState<checkAddedcartItemType[]>([]);

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    setRocketItems((items) =>
      items.map((item: checkAddedcartItemType) => ({
        ...item,
        checked: target.checked,
      }))
    );

    setSellerItems((items) =>
      items.map((item: checkAddedcartItemType) => ({
        ...item,
        checked: target.checked,
      }))
    );
    setCheckAll(target.checked);
  };

  const checkItemsChcked = (
    rocketItems: checkAddedcartItemType[],
    sellerItems: checkAddedcartItemType[]
  ) => {
    const isRocketItemsChecked = rocketItems.every((item) => item.checked);
    const isSellserItemsChecked = sellerItems.every((item) => item.checked);
    if (isRocketItemsChecked && isSellserItemsChecked) {
      setCheckAll(true);
    }
  };

  const handleCheck = (
    type: itemType,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = e.target as HTMLInputElement;

    if (type === ROCKET_ITEM) {
      const checkRocketItem = rocketItems.map((item: checkAddedcartItemType) =>
        item.id === Number(target.id)
          ? { ...item, checked: target.checked }
          : item
      );
      setRocketItems(checkRocketItem);
      checkItemsChcked(checkRocketItem, sellerItems);
    } else {
      const checkSellerItem = sellerItems.map((item: checkAddedcartItemType) =>
        item.id === Number(target.id)
          ? { ...item, checked: target.checked }
          : item
      );
      setSellerItems(checkSellerItem);
      checkItemsChcked(rocketItems, checkSellerItem);
    }

    if (checkAll && !target.checked) {
      setCheckAll(false);
    }
  };

  useEffect(() => {
    if (!data) return;

    const checkAddedItems = data.map((item) => ({ ...item, checked: false }));

    const rocketItems = checkAddedItems.filter(
      (item: checkAddedcartItemType) => item.product.rocketType
    );
    setRocketItems(rocketItems);

    const sellerItems = checkAddedItems.filter(
      (item: checkAddedcartItemType) => !item.product.rocketType
    );
    setSellerItems(sellerItems);
  }, [data]);

  return { rocketItems, sellerItems, handleCheckAll, handleCheck, checkAll };
};

export default useCartItems;
