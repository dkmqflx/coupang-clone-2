import React from 'react';
import { ROCKET_ITEM } from '../constants/cart';
import { checkAddedcartItemType, itemType } from '../types/cart';
import styled from '@emotion/styled';

const ROCKET_MIN_TOTAL = 19800;

const CartItemOrderAmount = ({
  items,
  type,
}: {
  items: checkAddedcartItemType[];
  type: itemType;
}) => {
  const checkedItems = items.filter((item) => item.checked);
  const totalPrice = checkedItems.reduce(
    (prev, cur) => prev + cur.product.salePrice,
    0
  );

  const shippingFee = checkedItems.reduce(
    (prev, cur) => prev + cur.product.shippinFee,
    0
  );

  return (
    <tr>
      <Td colSpan={5}>
        {type === ROCKET_ITEM && totalPrice < ROCKET_MIN_TOTAL && (
          <RocketShppingText>
            로켓배송 상품을 {ROCKET_MIN_TOTAL - totalPrice}원이상 추가하면 구매
            가능!
          </RocketShppingText>
        )}

        <Text>상품가격 </Text>
        <Price>{totalPrice}</Price>
        <Text>원</Text>

        <Icon>+</Icon>

        <Text>배송비 </Text>
        <Price>{shippingFee}</Price>
        <Text>원</Text>

        <Icon>=</Icon>

        <Text>주문금액 </Text>
        <TotalPrice>{totalPrice + shippingFee}</TotalPrice>
        <Text>원</Text>
      </Td>
    </tr>
  );
};

export default CartItemOrderAmount;

const Td = styled.td`
  padding: 20px 35px 16px 0;
  background: #f7f7f7;
  font-size: 12px;
  line-height: 29px;
  text-align: right;
  position: relative;
`;

const Text = styled.span`
  color: #111;
`;

const Price = styled.span`
  color: #111;
  font-size: 15px;
`;

const TotalPrice = styled.span`
  color: #111;
  font-weight: bold;
  font-size: 15px;
`;

const Icon = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin: 0 4px;
`;

const RocketShppingText = styled.span`
  background-color: #fff;
  padding: 8px 15px 7px 16px;
  border: 1px solid #999;

  position: absolute;
  top: 50%;
  left: 35%;
  transform: translate(-50%, -50%);
`;
