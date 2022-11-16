import { useRequest } from '../hooks/useRequest';
import CheckoutService from '../services/checkout.service';

export const useGetAddress = () => {
  return useRequest([`checkout-address`], () => CheckoutService.getAddress());
};
