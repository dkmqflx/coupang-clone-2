import { useQuery } from 'react-query';
import { productType, queryType } from '../types/product.types';
import { request } from '../utils/axios';

const getProductList = async ({ offset, limit, sorter }: queryType) => {
  const { data } = await request({
    url: `/products?offset=${offset}&limit=${limit}&sorter=${sorter}`,
    method: 'get',
  });

  return data;
};

export const useGetProductList = ({ offset, limit, sorter }: queryType) => {
  return useQuery<productType[]>(
    [`products-${offset}-${limit}-${sorter}`],
    () => getProductList({ offset, limit, sorter })
  );
};
