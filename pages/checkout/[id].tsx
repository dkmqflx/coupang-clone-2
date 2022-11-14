import Order from '../../src/components/Order';
import PaymentInfo from '../../src/components/PaymentInfo';
import styled from '@emotion/styled';

export default function CheckoutPage() {
  return (
    <Wrapper>
      <Order></Order>
      <PaymentInfo></PaymentInfo>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 1020px;
  margin: 0 auto;
`;
