import { GetServerSideProps } from 'next';
import { AuthService } from '../src/services';
import { EMAIL, PASSWORD } from '../src/constants/login';
import CartItems from '../src/components/CartItems';
import styled from '@emotion/styled';

export default function CartPage() {
  return (
    <Wrapper>
      <Section>
        <CartItems></CartItems>
      </Section>
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { access } = await AuthService.login(EMAIL, PASSWORD);
  context.res.setHeader('Set-Cookie', [`accessToken=${access}`]);
  return { props: {} };
};

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
