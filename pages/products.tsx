import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import ProductMenu from '../src/components/ProductMenu';
import ProductPagination from '../src/components/ProductPagination';
import Spinner from '../src/components/Spinner';
import styled from '@emotion/styled';

const ProductList = dynamic(() => import('../src/components/ProductList'), {
  ssr: false,
});

export default function ProductListPage() {
  return (
    <Wrapper>
      <ProductMenu />
      <Suspense fallback={<Spinner />}>
        <ProductList />
      </Suspense>
      <ProductPagination />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 20px auto;
  max-width: 1024px;
`;
