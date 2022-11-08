import httpService, { httpImpl } from './http.service';

class Cart {
  constructor(public http: httpImpl) {}

  async getCartItem() {
    const { data } = await this.http.get(`/cart`);

    return data;
  }
}

export default new Cart(httpService);
