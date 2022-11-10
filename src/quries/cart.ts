import { useRequest, useMutate } from './../hooks/useRequest';
import { checkAddedcartItemType } from '../types/cart';
import { CartService } from '../services';
import { useQueryClient } from 'react-query';

export const useGetCartItems = () => {
  return useRequest([`cart-items`], () => CartService.getCartItem());
};

export const useDeleteCartItem = (cartItemId: number) => {
  const queryClient = useQueryClient();

  return useMutate(() => CartService.deleteCartItem(cartItemId), {
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
