import { useRouter } from 'next/router';
import { queryType } from '../types/product.types';

const usePageRoute = () => {
  const router = useRouter();

  const updatePage = ({ offset, limit, sorter }: queryType) => {
    router.push(`/products?offset=${offset}&limit=${limit}&sorter=${sorter}`);
  };

  return {
    updatePage,
  };
};

export default usePageRoute;
