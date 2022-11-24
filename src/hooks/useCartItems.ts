import { useQueryClient } from 'react-query';
import { useState, useEffect } from 'react';
import { ROCKET_ITEM, SELLER_ITEM } from '../constants/cart';
import { cartItemType, checkAddedcartItemType } from '../types/cart';
import { filterItemsByType } from '../utils/cart';

const useCartItems = (data: cartItemType[]) => {
  const [checkAll, setCheckAll] = useState(false);
  const [rocketItems, setRocketItems] = useState<checkAddedcartItemType[]>([]);
  const [sellerItems, setSellerItems] = useState<checkAddedcartItemType[]>([]);
  const [items, setItems] = useState<checkAddedcartItemType[] | undefined>();
  const queryClient = useQueryClient();

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      setCheckAll(target.checked);

      const checkAllItems = items?.map((item) =>
        item.checked ? item : { ...item, checked: !item.checked }
      );
      queryClient.setQueryData([`cart-items`], checkAllItems);
      setItems(checkAllItems);
    } else {
      setCheckAll(target.checked);

      const uncheckAllItems = items?.map((item) =>
        !item.checked ? item : { ...item, checked: !item.checked }
      );

      queryClient.setQueryData([`cart-items`], uncheckAllItems);
      setItems(uncheckAllItems);
    }
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    const checkedNewItems = items?.map((item) =>
      `${item.id}` === target.id ? { ...item, checked: !item.checked } : item
    );
    queryClient.setQueryData([`cart-items`], checkedNewItems);
    setItems(checkedNewItems);
    setCheckAll(checkedNewItems?.every((item) => item.checked) ? true : false);
  };

  useEffect(() => {
    if (!data) return;

    if (!items) {
      const checkAddedItems = data.map((item) => ({ ...item, checked: false }));
      setItems(checkAddedItems);
      queryClient.setQueryData([`cart-items`], checkAddedItems);
    } else {
      const currentData = queryClient.getQueryData<checkAddedcartItemType[]>([
        `cart-items`,
      ])!;

      const rocketItems = filterItemsByType(currentData, ROCKET_ITEM);
      setRocketItems(rocketItems);
      const sellerItems = filterItemsByType(currentData, SELLER_ITEM);
      setSellerItems(sellerItems);

      setItems(currentData);

      if (currentData.length === 0) {
        setCheckAll(false);
      }
    }
  }, [data]);

  return {
    rocketItems,
    sellerItems,
    handleCheckAll,
    handleCheck,
    checkAll,
  };
};

export default useCartItems;
