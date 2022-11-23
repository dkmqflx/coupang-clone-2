import Service from './service';
import { queryType } from '../types/product.types';

class Products extends Service {
  async getProductList({ offset, limit, sorter }: queryType) {
    const { data } = await super.get(
      `/products?offset=${offset}&limit=${limit}&sorter=${sorter}`
    );
    return data;
  }
}

export default new Products();
