import React from "react";
import { productType } from "../types/product.types";
import { getExpectedDeliveryDate } from "../utils";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Rate, Space } from "antd";

const IsFreeShipText = styled.div`
  font-size: 12px;
  color: #555;
`;

const NameText = styled.div`
  font-size: 12px;
  color: #111;
`;

const PriceText = styled.strong`
  font-size: 16px;
  color: #ae0000;
`;
const PriceUnit = styled.span`
  color: #ae0000;
`;

const RewardBox = styled.div`
  box-sizing: border-box;
  display: inline-block;
  padding: 0 8px;
  height: 20px;
  border-radius: 10px;
  border: solid 1px #ccc;
  background-color: #fff;

  & > span {
    line-height: 19px;
    vertical-align: top;
    color: #333;
    font-size: 12px;
  }
`;

const Rating = styled(Rate)`
  font-size: 12px !important;

  & li {
    margin-right: 4px !important;
  }
  & svg {
    width: 12px;
    height: 12px;
  }
`;

const SubInfoText = styled.span<{ isOriginalPrice: boolean }>`
  color: #888;
  font-size: 11px;
  ${({ isOriginalPrice }) =>
    isOriginalPrice &&
    css`
      text-decoration: line-through;
    `}
`;

const getPrice = ({
  originalPrice,
  salePrice,
}: {
  originalPrice: number;
  salePrice: number;
}) => {
  if (originalPrice === salePrice) {
    return (
      <>
        <PriceText>{originalPrice}</PriceText>
        <PriceUnit> 원</PriceUnit>
      </>
    );
  } else {
    return (
      <>
        <div>
          <SubInfoText isOriginalPrice={true}>{originalPrice}</SubInfoText>
        </div>
        <PriceText>{salePrice}</PriceText>
        <PriceUnit> 원</PriceUnit>
      </>
    );
  }
};

const Product = ({ product }: { key: number; product: productType }) => {
  const {
    imageUrl,
    name,
    shippinFee,
    originalPrice,
    expectedDeliveryDate,
    maxPoint,
    rating,
    reviewCount,
    salePrice,
  } = product;

  return (
    <div>
      <img src={imageUrl} alt={name} />
      <IsFreeShipText>
        {shippinFee === 0 ? `무료배송` : `배송비 ${shippinFee}원`}
      </IsFreeShipText>
      <NameText>{name}</NameText>

      {getPrice({ originalPrice, salePrice })}

      <div>{getExpectedDeliveryDate(expectedDeliveryDate)} 도착 예정</div>
      <RewardBox>
        <span>최대 {maxPoint}원 적립</span>
      </RewardBox>
      <div>
        <Space>
          <Rating allowHalf defaultValue={rating} disabled={true} />
          <SubInfoText isOriginalPrice={false}>({reviewCount})</SubInfoText>
        </Space>
      </div>
    </div>
  );
};

export default Product;
