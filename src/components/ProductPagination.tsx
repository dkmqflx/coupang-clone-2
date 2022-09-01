import React from "react";
import { useRouter } from "next/router";
import { queryType } from "../types/product.types";
import { Pagination } from "antd";
import { SHOW_TWENTY_FOUR } from "../constants";

const DEFAULT_TOTAL = 38;

const ProductPagination = ({ offset, limit, sorter }: queryType) => {
  const router = useRouter();

  const handleChangeOffset = (pagination: number) => {
    const offset = pagination === 1 ? 0 : (pagination - 1) * Number(limit);
    router.push(
      `/products?offset=${offset}&limit=${limit}&sorter=${sorter}`,
      undefined,
      { shallow: true }
    );
  };

  const getCurrentPage = () => {
    if (Number(limit) === SHOW_TWENTY_FOUR) {
      return Number(offset) === 0 ? 1 : 2;
    } else {
      return Number(offset) === 0 ? 1 : Number(offset) / Number(limit) + 1;
    }
  };

  return (
    <Pagination
      current={getCurrentPage()}
      pageSize={Number(limit)}
      total={DEFAULT_TOTAL}
      showSizeChanger={false}
      onChange={(pagination) => handleChangeOffset(pagination)}
    />
  );
};

export default ProductPagination;
