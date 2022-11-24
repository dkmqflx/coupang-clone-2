import Service from './service';
import cookies from 'js-cookie';

class Cart extends Service {
  private static accessToken = cookies.get('accessToken') || '';

  async getCartItem() {
    const { data } = await super.get(`/cart`, Cart.accessToken);

    return data;
  }

  async resetCartItems() {
    await super.post(`/cart/reset`, null, Cart.accessToken);
  }

  async deleteCartItem(cartItemId: number) {
    const { data } = await super.delete(
      `/cart-items/${cartItemId}`,
      Cart.accessToken
    );
    return data;
  }

  async updateCartItem(cartItemId: number, quantity: number) {
    const { data } = await super.patch(
      `/cart-items/${cartItemId}`,
      {
        quantity,
      },
      Cart.accessToken
    );
    return data;
  }
}

export default new Cart();
