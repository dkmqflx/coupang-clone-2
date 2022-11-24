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

  return useMutate(() => CartService.deleteCartItem(cartItemId), {
    onSuccess: () => {
      queryClient.setQueryData(
        [`cart-items`],
        (
          prevData: checkAddedcartItemType[] | undefined
        ): checkAddedcartItemType[] => {
          if (!prevData) return [];
          const newItems = prevData?.filter((item) => item.id != cartItemId);

          console.log({ newItems });
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

  return useMutate(
    (quantity: number) => CartService.updateCartItem(cartItemId, quantity),

    {
      onMutate: async (quantity: number) => {
        await queryClient.cancelQueries({ queryKey: [`cart-items`] });

        const previousData = queryClient.getQueryData([`cart-items`]);

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

        return { previousData };
      },

      onError: (_err, _newTodo, context: any) => {
        queryClient.setQueryData([`cart-items`], context.previousData);

        return alert(
          '선택한 상품의 수량을 변경하는데 실패했습니다. 다시 시도해주세요.'
        );
      },
    }
  );
};
