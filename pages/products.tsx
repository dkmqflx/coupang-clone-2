import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next/types";
import { queryType } from "../src/types/product.types";
import ProductMenu from "../src/components/ProductMenu";
import Spinner from "../src/components/Spinner";
import styled from "@emotion/styled";
import { Pagination } from "antd";

const Wrapper = styled.div`
  margin: 20px auto;
  max-width: 1024px;
`;

const DEFAULT_TOTAL = 10;

const ProductList = dynamic(() => import("../src/components/ProductList"), {
  ssr: false,
});

export default function ProductListPage({ offset, limit, sorter }: queryType) {
  return (
    <Wrapper>
      <ProductMenu />
      <Suspense fallback={<Spinner />}>
        <ProductList offset={offset} limit={limit} sorter={sorter} />
      </Suspense>
      <Pagination
        defaultCurrent={Number(offset)}
        pageSize={Number(limit)}
        total={DEFAULT_TOTAL * Number(limit)}
        showSizeChanger={false}
      />
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { offset, limit, sorter },
  } = context;

  return {
    props: {
      offset,
      limit,
      sorter,
    },
  };
};
