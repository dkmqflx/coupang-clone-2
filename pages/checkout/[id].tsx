import styled from '@emotion/styled';
import Order from '../../src/components/Order';

export default function CheckoutPage() {
  return (
    <Wrapper>
      <Order></Order>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 1020px;
  margin: 0 auto;
`;
