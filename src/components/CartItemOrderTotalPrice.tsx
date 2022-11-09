import { checkAddedcartItemType } from '../types/cart';
import { getTotalPrice, getShippingFee } from '../utils/cart';
import styled from '@emotion/styled';

const CartItemOrderTotalPrice = ({
  rocketItems,
  sellerItems,
}: {
  rocketItems: checkAddedcartItemType[];
  sellerItems: checkAddedcartItemType[];
}) => {
  const totalPrice = getTotalPrice(rocketItems) + getTotalPrice(sellerItems);
  const totalShippingFee =
    getShippingFee(rocketItems) + getShippingFee(sellerItems);
  return (
    <Wrapper>
      <Text>총 상품가격 </Text>
      <Price>{totalPrice.toLocaleString()}원</Price>

      <Icon>+</Icon>

      <Text>총 배송비</Text>
      <Price>{totalShippingFee.toLocaleString()}원</Price>

      <Icon>=</Icon>

      <Text> 총 주문금액 </Text>
      <TotalPrice>
        {(totalPrice + totalShippingFee).toLocaleString()}원
      </TotalPrice>
    </Wrapper>
  );
};

export default CartItemOrderTotalPrice;

const Wrapper = styled.div`
  border: 4px solid #c8c8c8;
  text-align: center;
  vertical-align: middle;
`;

const Text = styled.span`
  color: #555;
  font-size: 16px;
`;

const Price = styled.span`
  color: #111;
  font-size: 18px;
`;

const TotalPrice = styled.span`
  color: #ea0000;
  font-size: 18px;
  font-weight: bold;
`;

const Icon = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin: 0 8px;
`;
