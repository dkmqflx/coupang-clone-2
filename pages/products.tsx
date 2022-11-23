import React, { Suspense } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import ProductMenu from '../src/components/ProductMenu';
import ProductPagination from '../src/components/ProductPagination';
import Spinner from '../src/components/Spinner';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  margin: 20px auto;
  max-width: 1024px;
`;

const ProductList = dynamic(() => import('../src/components/ProductList'), {
  ssr: false,
});

export default function ProductListPage() {
  const route = useRouter();

  const { offset = '0', limit = '12', sorter = 'bestAsc' } = route.query;

  return (
    <Wrapper>
      <ProductMenu offset={offset} limit={limit} sorter={sorter} />
      <Suspense fallback={<Spinner />}>
        <ProductList offset={offset} limit={limit} sorter={sorter} />
      </Suspense>
      <ProductPagination offset={offset} limit={limit} sorter={sorter} />
    </Wrapper>
  );
}
