import { useGetCartItems } from '../quries/cart';
import { checkAddedcartItemType } from '../types/cart';
import { ROCKET_ITEM, SELLER_ITEM } from './../constants/cart';
import useCartItems from '../hooks/useCartItems';
import CartItemOrderAmount from './CartItemOrderAmount';
import CartItem from './CartItem';
import styled from '@emotion/styled';
import { Table, Tr, Th } from './Common/Table';

const CartItems = () => {
  const { data } = useGetCartItems();
  const { rocketItems, sellerItems, handleCheckAll, handleCheck, checkAll } =
    useCartItems(data);

  if (!data) return null;

  return (
    <Table>
      <colgroup>
        <col width='10' />
        <col width='40' />
        <col width='200' />
        <col width='20' />
        <col width='30' />
      </colgroup>
      <thead>
        <Tr>
          <Th scope='col'>
            <label htmlFor='checkAll'>
              <CheckBoxInput
                type='checkbox'
                name='checkAll'
                onChange={handleCheckAll}
                checked={checkAll}
              />
            </label>
            <CheckBoxText>전체선택</CheckBoxText>
          </Th>
          <Th scope='scope=colgroup' colSpan={2}>
            상품정보
          </Th>
          <Th scope='col'>상품금액</Th>
          <Th scope='col'>배송비</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <RocketTd colSpan={5}>
            <RocketTitle>로켓배송 상품 (로켓와우 포함)</RocketTitle>
            <RocketDeliveryInfo>무료배송</RocketDeliveryInfo>
            <RockDeliveryMinCondition>
              (19,800원 이상 구매가능)
            </RockDeliveryMinCondition>
          </RocketTd>
        </Tr>

        {rocketItems.length > 0 && (
          <>
            {rocketItems.map((item: checkAddedcartItemType) => (
              <CartItem
                key={item.id}
                item={item}
                handleCheck={handleCheck}
                type={ROCKET_ITEM}
              ></CartItem>
            ))}
            <CartItemOrderAmount
              type={ROCKET_ITEM}
              items={rocketItems}
            ></CartItemOrderAmount>
          </>
        )}

        {sellerItems.length > 0 && (
          <>
            {sellerItems.map((item: checkAddedcartItemType) => (
              <CartItem
                key={item.id}
                item={item}
                handleCheck={handleCheck}
                type={SELLER_ITEM}
              ></CartItem>
            ))}
            <CartItemOrderAmount
              type={SELLER_ITEM}
              items={sellerItems}
            ></CartItemOrderAmount>
          </>
        )}
      </tbody>
    </Table>
  );
};

export default CartItems;

const RocketTitle = styled.span`
  color: #111;
  font-size: 16px;
  font-weight: 700;
`;

const RocketDeliveryInfo = styled.span`
  margin-left: 10px;
  color: #555;
  font-size: 12px;
  font-weight: 700;
`;

const RockDeliveryMinCondition = styled.span`
  font-size: 12px;
  color: #555;
  margin-left: 5px;
`;

const RocketTd = styled.td`
  text-align: left;
  line-height: 16px;
  padding: 26px 22px 24px 8px;
`;

const CheckBoxInput = styled.input`
  margin-top: 4px;
`;

const CheckBoxText = styled.span`
  margin-left: 4px;
  position: absolute;
`;
