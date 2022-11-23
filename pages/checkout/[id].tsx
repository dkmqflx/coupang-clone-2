import { GetServerSideProps } from 'next';
import { AuthService, CheckoutService } from '../../src/services';
import Order from '../../src/components/Order';
import PaymentInfo from '../../src/components/PaymentInfo';
import { orderSheetType } from '../../src/types/order';
import { EMAIL, PASSWORD } from '../../src/constants/login';
import styled from '@emotion/styled';

export default function CheckoutPage({
  orderSheet,
}: {
  orderSheet: orderSheetType;
}) {
  const { buyer, coupangCash, orderItems, address, coupayMoney } = orderSheet;
  return (
    <Wrapper>
      <Order buyer={buyer} address={address}></Order>
      <PaymentInfo
        coupangCash={coupangCash}
        orderItems={orderItems}
        coupayMoney={coupayMoney}
        addressId={address.id}
      ></PaymentInfo>
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { access } = await AuthService.login(EMAIL, PASSWORD);
  context.res.setHeader('Set-Cookie', [`accessToken=${access}`]);

  const { id } = context.query;
  const data = await CheckoutService.getOrderSheet(id as string, access);

  return { props: { orderSheet: data } };
};

const Wrapper = styled.div`
  width: 1020px;
  margin: 0 auto;
`;
