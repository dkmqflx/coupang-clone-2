import { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { ROCKET_ITEM } from '../constants/cart';
import { cartItemType, checkAddedcartItemType, itemType } from '../types/cart';

const useCartItems = (data: cartItemType[], isFetched: boolean) => {
  const [checkAll, setCheckAll] = useState(false);
  const [rocketItems, setRocketItems] = useState<checkAddedcartItemType[]>([]);
  const [sellerItems, setSellerItems] = useState<checkAddedcartItemType[]>([]);
  const queryClient = useQueryClient();

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    queryClient.setQueryData(
      [`cart-items`],
      (
        prevData: checkAddedcartItemType[] | undefined
      ): checkAddedcartItemType[] => {
        if (!prevData) return [];
        const newItems = prevData.map((item) => ({ ...item, checked: true }));
        return newItems;
      }
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

  const setNewQueryData = ({
    rocketItems,
    sellerItems,
  }: {
    rocketItems: checkAddedcartItemType[];
    sellerItems: checkAddedcartItemType[];
  }) => {
    queryClient.setQueryData([`cart-items`], (): checkAddedcartItemType[] => {
      return [...rocketItems, ...sellerItems];
    });
  };

  const getRocketItems = (items: checkAddedcartItemType[]) => {
    return items.filter(
      (item: checkAddedcartItemType) => item.product.rocketType
    );
  };

  const getSellerItems = (items: checkAddedcartItemType[]) => {
    return items.filter(
      (item: checkAddedcartItemType) => !item.product.rocketType
    );
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

      checkItemsChcked(checkRocketItem, sellerItems);
      setNewQueryData({ rocketItems: checkRocketItem, sellerItems });
    } else {
      const checkSellerItem = sellerItems.map((item: checkAddedcartItemType) =>
        item.id === Number(target.id)
          ? { ...item, checked: target.checked }
          : item
      );

      checkItemsChcked(rocketItems, checkSellerItem);
      setNewQueryData({ rocketItems, sellerItems: checkSellerItem });
    }

    if (checkAll && !target.checked) {
      setCheckAll(false);
    }
  };

  useEffect(() => {
    if (!isFetched) return;

    const checkAddedItems = data.map((item) => ({ ...item, checked: false }));
    queryClient.setQueryData([`cart-items`], () => checkAddedItems);

    const rocketItems = getRocketItems(checkAddedItems);
    setRocketItems(rocketItems);

    const sellerItems = getSellerItems(checkAddedItems);
    setSellerItems(sellerItems);
  }, [isFetched]);

  useEffect(() => {
    if (isFetched && data) {
      const cartItems: checkAddedcartItemType[] = queryClient.getQueryData([
        'cart-items',
      ])!;

      const rocketItems = getRocketItems(cartItems);
      setRocketItems(rocketItems);

      const sellerItems = getSellerItems(cartItems);
      setSellerItems(sellerItems);
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
