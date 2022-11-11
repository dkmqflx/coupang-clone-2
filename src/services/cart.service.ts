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

  async deleteCartItem(cartItemId: number) {
    const { data } = await this.http.delete(`/cart-items/${cartItemId}`);
    return data;
  }

  async updateCartItem(cartItemId: number, quantity: number) {
    const { data } = await this.http.patch(
      `/cart-items/${cartItemId}`,
      quantity
    );
    return data;
  }
}

export default new Cart(httpService);
