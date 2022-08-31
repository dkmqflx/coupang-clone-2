import axios from "axios";
import { useQuery } from "react-query";
import { productType, queryType } from "../types/product.types";

const getProductList = async ({ offset, limit, sorter }: queryType) => {
  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_API_HOST +
      `/products?offset=${offset}&limit=${limit}&sorter=${sorter}`
  );

  return data;
};

export const useGetProductList = ({ offset, limit, sorter }: queryType) => {
  return useQuery<productType[]>(
    [`products-${offset}-${limit}-${sorter}`],
    () => getProductList({ offset, limit, sorter })
  );
};
