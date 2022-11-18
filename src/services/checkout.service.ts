import axios from 'axios';
import cookies from 'js-cookie';
import { paymentType } from './../types/order';

class CheckoutService {
  private request;

  constructor() {
    this.request = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_HOST,
    });
  }

  getOrderSheet = async (id: string, accessToken: string | undefined) => {
    const { data } = await this.request({
      method: 'get',
      url: `/ordersheet/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  };

  getAddress = async () => {
    const accessToken = cookies.get('accessToken');

    const { data } = await this.request({
      method: 'get',
      url: `/address`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  };

  payment = async (paymentInfo: paymentType) => {
    const accessToken = cookies.get('accessToken');

    const { data } = await this.request({
      method: 'post',
      url: `/order/complete`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        ...paymentInfo,
      },
    });

    return data;
  };
}

export default new CheckoutService();
