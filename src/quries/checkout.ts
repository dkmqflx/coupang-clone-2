import { useRequest, useMutate } from '../hooks/useRequest';
import CheckoutService from '../services/checkout.service';
import { paymentType } from './../types/order';

export const useGetAddress = () => {
  return useRequest([`checkout-address`], () => CheckoutService.getAddress());
};

export const usePayment = () => {
  return useMutate<boolean, paymentType>(
    (data: paymentType) => CheckoutService.payment(data),
    {
      onSuccess() {
        window.alert('결제가 완료되었습니다.');
      },
    }
  );
};
