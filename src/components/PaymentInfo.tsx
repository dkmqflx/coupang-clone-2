import { Table, Tr } from '../styles/table';
import styled from '@emotion/styled';

const PaymentInfo = () => {
  return (
    <div>
      <Table>
        <caption>결제정보</caption>
        <tbody>
          <Tr>
            <th>총상품가격</th>
            <td>100000</td>
          </Tr>
          <Tr>
            <th>할인쿠폰</th>
            <td>0원</td>
          </Tr>
          <Tr>
            <th>배송비</th>
            <td>0원</td>
          </Tr>
          <Tr>
            <th>쿠팡캐시</th>
            <td>0원</td>
          </Tr>
          <Tr>
            <th>총결제금액</th>
            <td>0원</td>
          </Tr>
          <Tr>
            <th>결제방법</th>
            <td>
              <span>
                <input type='radio' id='coupay' defaultChecked />
                <label htmlFor='coupay'>쿠페이머니</label>
              </span>
              <span>
                <input type='radio' id='phone' />
                <label htmlFor='phone'>휴대폰</label>
              </span>
            </td>
          </Tr>
        </tbody>
      </Table>
      <ButtonWrapper>
        <Button>결제하기</Button>
      </ButtonWrapper>
    </div>
  );
};

export default PaymentInfo;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 18px 0;
`;

const Button = styled.button`
  background-color: #0074e9;
  color: #fff;
  padding: 16px 17px;
  font-size: 17px;
  line-height: 20px;
  border: none;
  cursor: pointer;
  width: 240px;
  border-radius: 4px;
`;
