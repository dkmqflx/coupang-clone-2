import CartItems from '../src/components/CartItems';
import NoItemCart from '../src/components/NoItemCart';
import useLogin from '../src/hooks/useLogin';
import styled from '@emotion/styled';

export default function CartPage() {
  const { token, setAccessToken } = useLogin();

  if (token === null) return null;

  return (
    <Wrapper>
      <Section>
        {token ? (
          <CartItems></CartItems>
        ) : (
          <NoItemCart setAccessToken={setAccessToken}></NoItemCart>
        )}
      </Section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #f0f0f0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Section = styled.section`
  width: 900px;
  border: 1px solid #e0e0e0;
  margin: 0 auto 70px;
  padding: 40px 39px;
  background: #fff;
`;
