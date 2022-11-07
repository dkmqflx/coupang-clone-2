import styled from '@emotion/styled';
import NoItemCart from '../src/components/NoItemCart';

export default function CartPage() {
  return (
    <Wrapper>
      <Section>
        <NoItemCart></NoItemCart>
      </Section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #f0f0f0;
  height: 100vh;
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
