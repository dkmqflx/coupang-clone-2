import React from 'react';
import { productType } from '../types/product.types';
import { useGetProductList } from '../quries.ts/product';
import usePageRoute from '../hooks/usePageRoute';
import Product from './Product';
import styled from '@emotion/styled';

const ProductList = () => {
  const { offset, limit, sorter } = usePageRoute();
  const { data } = useGetProductList({ offset, limit, sorter });

  return (
    <Container>
      {data?.map((product: productType) => (
        <Product key={product.id} product={product} />
      ))}
    </Container>
  );
};

export default ProductList;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 230px);
  gap: 20px;
  margin: 20px 0;
`;
