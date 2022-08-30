import React from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Select, Space, Row } from "antd";

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

const ProductMenu = () => {
  const router = useRouter();
  const { offset, limit, sorter } = router.query;

  const handleSelectSorter = (sorter: string) => {
    router.push(`/products?offset=${offset}&limit=${limit}&sorter=${sorter}`);
  };

  const handleSelectLimit = (limit: string) => {
    router.push(`/products?offset=${offset}&limit=${limit}&sorter=${sorter}`);
  };

  return (
    <Row justify="space-between">
      <Space>
        <MenuSortText
          select={sorter === "bestAsc"}
          onClick={() => handleSelectSorter("bestAsc")}
        >
          쿠팡 랭킹순
        </MenuSortText>
        <MenuSortText
          select={sorter === "salePriceAsc"}
          onClick={() => handleSelectSorter("salePriceAsc")}
        >
          낮은가격순
        </MenuSortText>
        <MenuSortText
          select={sorter === "salePriceDesc"}
          onClick={() => handleSelectSorter("salePriceDesc")}
        >
          높은가격순
        </MenuSortText>
        <MenuSortText
          select={sorter === "saleCountDesc"}
          onClick={() => handleSelectSorter("saleCountDesc")}
        >
          판매량순
        </MenuSortText>
        <MenuSortText
          select={sorter === "latestAsc"}
          onClick={() => handleSelectSorter("latestAsc")}
        >
          최신순
        </MenuSortText>
      </Space>
      <Select
        defaultValue={`${limit}`}
        style={{
          width: 120,
        }}
        onChange={(value) => handleSelectLimit(value)}
      >
        <Option value="12">12개씩 보기</Option>
        <Option value="24">24개씩 보기</Option>
      </Select>
    </Row>
  );
};

export default ProductMenu;
