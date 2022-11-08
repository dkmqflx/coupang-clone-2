import { useRequest } from './../hooks/useRequest';
import { CartService } from '../services';

export const useGetCartItems = () => {
  return useRequest([`cart-items`], () => CartService.getCartItem());
};
