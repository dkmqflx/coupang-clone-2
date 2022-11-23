import { useRequest } from '../hooks';
import { ProductsService } from '../services';
import { queryType } from '../types/product.types';

export const useGetProductList = ({ offset, limit, sorter }: queryType) => {
  return useRequest([`products-${offset}-${limit}-${sorter}`], () =>
    ProductsService.getProductList({ offset, limit, sorter })
  );
};
