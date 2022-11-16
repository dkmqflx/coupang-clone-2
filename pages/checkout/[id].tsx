import { GetServerSideProps } from 'next';
import { AuthService, CheckoutService } from '../../src/services';
import Order from '../../src/components/Order';
import PaymentInfo from '../../src/components/PaymentInfo';
import { orderSheetType } from '../../src/types/order';
import { EMAIL, PASSWORD } from '../../src/constants/login';
import styled from '@emotion/styled';
import { parseCookie } from '../../src/utils';

export default function CheckoutPage({
  orderSheet,
}: {
  orderSheet: orderSheetType;
}) {
  const { buyer, coupangCash, orderItems } = orderSheet;

  return (
    <Wrapper>
      <Order buyer={buyer}></Order>
      <PaymentInfo
        coupangCash={coupangCash}
        orderItems={orderItems}
      ></PaymentInfo>
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let token = parseCookie(context.req.headers.cookie, 'accessToken');

  if (!token) {
    const { access } = await AuthService.login(EMAIL, PASSWORD);
    context.res.setHeader('Set-Cookie', [`accessToken=${access}`]);
    token = access;
  }

  const { id } = context.query;
  const data = await CheckoutService.getOrderSheet(id as string, token);

  return { props: { orderSheet: data } };
};

const Wrapper = styled.div`
  width: 1020px;
  margin: 0 auto;
`;
