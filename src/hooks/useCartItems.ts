import { useState, useEffect } from 'react';
import { ROCKET_ITEM, SELLER_ITEM } from '../constants/cart';
import { cartItemType } from '../types/cart';
import { filterItemsByType } from '../utils/cart';

const useCartItems = (data: cartItemType[]) => {
  const [checkAll, setCheckAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [rocketItems, setRocketItems] = useState<cartItemType[]>([]);
  const [sellerItems, setSellerItems] = useState<cartItemType[]>([]);
  const [items, setItems] = useState<cartItemType[]>([]);

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      setCheckAll(target.checked);

      const checkAllItems = items?.map((item) => `${item.id}`);
      setCheckedItems(checkAllItems);
    } else {
      setCheckAll(target.checked);

      setCheckedItems([]);
    }
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (checkedItems.includes(target.id)) {
      const filteredItems = checkedItems.filter((id) => id !== target.id);
      setCheckedItems(filteredItems);
      setCheckAll(false);
    } else {
      const newItems = [...checkedItems, target.id];
      setCheckedItems(newItems);

      if (newItems.length === items.length) {
        setCheckAll(true);
      }
    }
  };

  const resetCheckedState = () => {
    setCheckAll(false);
    setCheckedItems([]);
  };

  useEffect(() => {
    if (!data) return;

    setItems(data);

    const rocketItems = filterItemsByType(data, ROCKET_ITEM);
    setRocketItems(rocketItems);
    const sellerItems = filterItemsByType(data, SELLER_ITEM);
    setSellerItems(sellerItems);
  }, [data]);

  return {
    rocketItems,
    sellerItems,
    handleCheckAll,
    handleCheck,
    checkAll,
    checkedItems,
    resetCheckedState,
  };
};

export default useCartItems;
