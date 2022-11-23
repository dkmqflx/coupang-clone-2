import cookies from 'js-cookie';
import { paymentType } from './../types/order';
import Service from './service';

class CheckoutService extends Service {
  async getOrderSheet(id: string, accessToken: string | undefined) {
    const { data } = await super.get(`/ordersheet/${id}`, accessToken);

    return data;
  }

  async getAddress() {
    const accessToken = cookies.get('accessToken');

    const { data } = await super.get(`/address`, accessToken);

    return data;
  }

  async payment(paymentInfo: paymentType) {
    const accessToken = cookies.get('accessToken');

    const { data } = await super.post(
      `/order/complete`,
      paymentInfo,
      accessToken
    );

    return data;
  }
}

export default new CheckoutService();
