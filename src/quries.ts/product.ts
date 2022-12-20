import { useRequest } from '../hooks';
import { ProductsService } from '../services';
import { queryType, productType } from '../types/product.types';

export const useGetProductList = ({ offset, limit, sorter }: queryType) => {
  return useRequest<productType[]>(
    [`products-${offset}-${limit}-${sorter}`],
    () => ProductsService.getProductList({ offset, limit, sorter })
  );
};
