import React from 'react';
import { getOffset } from '../utils/product';
import { queryType } from '../types/product.types';
import usePageRoute from '../hooks/usePageRoute';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Select, Space, Row } from 'antd';

const { Option } = Select;

const MenuSortText = styled.span<{ select: boolean }>`
  cursor: pointer;

  ${({ select }) =>
    select &&
    css`
      color: #0073e9;
      font-weight: bold;
    `}
`;

const ProductMenu = ({ offset, limit, sorter }: queryType) => {
  const { updatePage } = usePageRoute();

  return (
    <Row justify='space-between'>
      <Space>
        <MenuSortText
          select={sorter === 'bestAsc'}
          onClick={() => updatePage({ offset, limit, sorter: 'bestAsc' })}
        >
          쿠팡 랭킹순
        </MenuSortText>
        <MenuSortText
          select={sorter === 'salePriceAsc'}
          onClick={() => updatePage({ offset, limit, sorter: 'salePriceAsc' })}
        >
          낮은가격순
        </MenuSortText>
        <MenuSortText
          select={sorter === 'salePriceDesc'}
          onClick={() => updatePage({ offset, limit, sorter: 'salePriceDesc' })}
        >
          높은가격순
        </MenuSortText>
        <MenuSortText
          select={sorter === 'saleCountDesc'}
          onClick={() => updatePage({ offset, limit, sorter: 'saleCountDesc' })}
        >
          판매량순
        </MenuSortText>
        <MenuSortText
          select={sorter === 'latestAsc'}
          onClick={() => updatePage({ offset, limit, sorter: 'latestAsc' })}
        >
          최신순
        </MenuSortText>
      </Space>
      <Select
        defaultValue={`${limit}`}
        style={{
          width: 120,
        }}
        onChange={(limit) =>
          updatePage({
            offset: `${getOffset({
              limit: Number(limit),
              offset: Number(offset),
            })}`,
            limit,
            sorter,
          })
        }
      >
        <Option value='12'>12개씩 보기</Option>
        <Option value='24'>24개씩 보기</Option>
      </Select>
    </Row>
  );
};

export default ProductMenu;
