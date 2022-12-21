import { useQueryClient } from 'react-query';
import { useRequest, useMutate } from './../hooks/useRequest';
import { checkAddedcartItemType } from '../types/cart';
import { CartService } from '../services';

export const useGetCartItems = () => {
  return useRequest([`cart-items`], () => CartService.getCartItem(), {
    refetchOnMount: false,
  });
};

export const useDeleteCartItem = (cartItemId: number) => {
  const queryClient = useQueryClient();

  return useMutate<boolean>(() => CartService.deleteCartItem(cartItemId), {
    onSuccess: () => {
      queryClient.setQueryData(
        [`cart-items`],
        (
          prevData: checkAddedcartItemType[] | undefined
        ): checkAddedcartItemType[] => {
          if (!prevData) return [];
          const newItems = prevData?.filter((item) => item.id != cartItemId);

          return newItems;
        }
      );
    },
    onError: () =>
      alert('선택한 상품을 삭제하는데 실패했습니다. 다시 시도해주세요.'),
  });
};

export const useUpdateCartItem = (cartItemId: number) => {
  const queryClient = useQueryClient();

  return useMutate<boolean, number>(
    (quantity: number) => CartService.updateCartItem(cartItemId, quantity),

    {
      onSuccess: (_data, quantity: number) => {
        queryClient.setQueryData(
          [`cart-items`],
          (
            prevData: checkAddedcartItemType[] | undefined
          ): checkAddedcartItemType[] => {
            if (!prevData) return [];
            const newItems = prevData.map((item) =>
              item.id === cartItemId ? { ...item, quantity } : item
            );
            return newItems;
          }
        );
      },

      onError: () =>
        alert(
          '선택한 상품의 수량을 변경하는데 실패했습니다. 다시 시도해주세요.'
        ),
    }
  );
};
