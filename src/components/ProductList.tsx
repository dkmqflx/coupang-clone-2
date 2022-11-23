import React from 'react';
import { queryType } from '../types/product.types';
import { useGetProductList } from '../quries.ts/product';
import Product from './Product';
import styled from '@emotion/styled';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 230px);
  gap: 20px;
  margin: 20px 0;
`;

const ProductList = ({ offset, limit, sorter }: queryType) => {
  const { data, isLoading } = useGetProductList({ offset, limit, sorter });

  return (
    <Container>
      {data?.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </Container>
  );
};

export default ProductList;
