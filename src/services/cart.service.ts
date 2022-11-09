import httpService, { httpImpl } from './http.service';

class Cart {
  constructor(public http: httpImpl) {}

  async getCartItem() {
    const { data } = await this.http.get(`/cart`);

    return data;
  }

  async resetCartItems() {
    await this.http.post(`/cart/reset`);
  }
}

export default new Cart(httpService);
