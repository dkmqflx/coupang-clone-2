import { useGetCartItems } from '../quries/cart';
import CartItem from './CartItem';
import { Table, Tr, Th } from './Common/Table';

const CartItems = () => {
  const { data, isLoading } = useGetCartItems();

  if (isLoading) return null;

  console.log(data);

  return (
    <div>
      <Table>
        <colgroup>
          <col width='50' />
          <col width='80' />
          <col width='*' />
          <col width='80' />
          <col width='90' />
        </colgroup>
        <thead>
          <Tr>
            <Th></Th>
            <Th colSpan={2}>상품정보</Th>
            <Th>상품금액</Th>
            <Th>배송비</Th>
          </Tr>
        </thead>
      </Table>
      <CartItem></CartItem>
    </div>
  );
};

export default CartItems;
