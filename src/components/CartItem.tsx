import Image from 'next/image';
import { debounce } from 'lodash';
import { useDeleteCartItem, useUpdateCartItem } from '../quries/cart';
import { checkAddedcartItemType, itemType } from '../types/cart';
import styled from '@emotion/styled';
import { Tr, Td } from './Common/Table';

const CartItem = ({
  item,
  handleCheck,
  type,
}: {
  item: checkAddedcartItemType;
  handleCheck: (type: itemType, e: React.ChangeEvent<HTMLInputElement>) => void;
  type: itemType;
}) => {
  const {
    id,
    product: {
      imageUrl,
      name,
      expectedDeliveryDate,
      salePrice,
      shippinFee,
      maxPoint,
    },
    quantity,
    checked,
  } = item;

  const { mutate: deleteMutate } = useDeleteCartItem(id);
  const { mutate: updateMutate } = useUpdateCartItem(id);

  const handleUpdateQuantity = debounce((quantity: string) => {
    updateMutate(Number(quantity));
  }, 500);

  return (
    <Tr>
      <Td>
        <input
          type='checkbox'
          id={`${id}`}
          onChange={(e) => handleCheck(type, e)}
          checked={checked}
        />
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
          <ItemInfoWrapper>
            <PriceText>{`${salePrice.toLocaleString()}원`}</PriceText>
            <QuantityInput
              type='number'
              min={0}
              value={quantity}
              onChange={(e) => handleUpdateQuantity(e.target.value)}
            ></QuantityInput>
            <DeleteButton onClick={deleteMutate}>x</DeleteButton>
          </ItemInfoWrapper>
        </Delivery>

        <PointText>
          <span>{`최대 ${maxPoint}원 적립`}</span>
        </PointText>
      </Td>
      <PriceTd>{`${(salePrice * quantity).toLocaleString()}원`}</PriceTd>
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

const ItemInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 6px;
`;

const QuantityInput = styled.input`
  width: 40px;
  height: 20px;
  border: 1px solid #ddd;
  margin: 0 8px;
`;

const PriceText = styled.span`
  color: #888;
  font-size: 12px;
`;

const DeleteButton = styled.button`
  height: 20px;
  width: 20px;
  color: #111;
  font-size: 10px;
  cursor: pointer;
  border: 1px solid #ddd;
`;
