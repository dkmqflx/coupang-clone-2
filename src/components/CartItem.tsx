import Image from 'next/image';
import { cartItemType } from '../types/cart';
import { Tr, Td } from './Common/Table';
import styled from '@emotion/styled';

const CartItem = ({ item }: { item: cartItemType }) => {
  const {
    product: {
      imageUrl,
      name,
      expectedDeliveryDate,
      salePrice,
      shippinFee,
      maxPoint,
    },
    quantity,
  } = item;

  return (
    <Tr>
      <Td>
        <input type='checkbox' />
      </Td>
      <Td>
        <Image src={imageUrl} alt={name} width={78} height={78}></Image>
      </Td>
      <Td align='left'>
        <Title>{name}</Title>
        <Delivery>
          <DeliveryText>{`${new Date(
            expectedDeliveryDate
          ).getMonth()}/${new Date(
            expectedDeliveryDate
          ).getDate()} 도착 보장`}</DeliveryText>
          <div>
            <PriceText>{`${salePrice.toLocaleString()}원`}</PriceText>
            <QuantityInput
              type='number'
              defaultValue={quantity}
            ></QuantityInput>
          </div>
        </Delivery>

        <PointText>
          <span>{`최대 ${maxPoint}원 적립`}</span>
        </PointText>
      </Td>
      <PriceTd>{`${salePrice.toLocaleString()}원`}</PriceTd>
      <Td>{shippinFee === 0 ? `무료` : `${shippinFee.toLocaleString()}원`}</Td>
    </Tr>
  );
};

export default CartItem;

const Title = styled.div`
  color: #555;
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const Delivery = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
`;

const DeliveryText = styled.span`
  color: #00891a;
  font-size: 13px;
`;

const PointText = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 8px;
  & > span {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 2px 6px;
    color: #333;
    font-size: 10px;
  }
`;

const PriceTd = styled(Td)`
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  font-size: 12px;
  color: #111;
`;

const QuantityInput = styled.input`
  width: 52px;
  height: 24px;
  border: 1px solid #ddd;
  margin: 0 8px;
`;

const PriceText = styled.span`
  color: #888;
  font-size: 12px;
`;
