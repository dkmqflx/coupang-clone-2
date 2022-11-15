import axios from 'axios';

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
}

export default new CheckoutService();
