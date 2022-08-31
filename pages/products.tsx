import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next/types";
import { queryType } from "../src/types/product.types";
import ProductMenu from "../src/components/ProductMenu";
import ProductPagination from "../src/components/ProductPagination";
import Spinner from "../src/components/Spinner";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  margin: 20px auto;
  max-width: 1024px;
`;

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
      <ProductPagination offset={offset} limit={limit} sorter={sorter} />
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
