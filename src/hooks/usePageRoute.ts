import { useRouter } from 'next/router';
import { queryType } from '../types/product.types';

const usePageRoute = () => {
  const router = useRouter();
  const { offset = '0', limit = '12', sorter = 'bestAsc' } = router.query;

  const updatePage = ({ offset, limit, sorter }: queryType) => {
    router.push(`/products?offset=${offset}&limit=${limit}&sorter=${sorter}`);
  };

  return {
    updatePage,
    offset,
    limit,
    sorter,
  };
};

export default usePageRoute;
