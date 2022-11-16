import { useState } from 'react';
import { getPaymentInfo } from '../utils';
import { productType } from '../types/order';
import { Table, Tr } from '../styles/table';
import styled from '@emotion/styled';

const PaymentInfo = ({
  coupangCash,
  orderItems,
}: {
  coupangCash: number;
  orderItems: { quantity: number; product: productType }[];
}) => {
  const { totleShppingFee, totlePrice, totleSaveCash } =
    getPaymentInfo(orderItems);

  const [check, setCheck] = useState('coupay');

  return (
    <div>
      <Table>
        <caption>결제정보</caption>
        <tbody>
          <Tr>
            <th>총상품가격</th>
            <td>
              <strong>{totlePrice.toLocaleString()}</strong>
              <span>원</span>
            </td>
          </Tr>
          <Tr>
            <th>할인쿠폰</th>
            <Td>
              <DiscountText>
                <strong>0</strong>
                <span>원</span>
              </DiscountText>
              <SubInfoText>적용 가능한 할인쿠폰이 없습니다.</SubInfoText>
            </Td>
          </Tr>
          <Tr>
            <th>배송비</th>
            <td>
              <strong>{totleShppingFee.toLocaleString()}</strong>
              <span>원</span>
            </td>
          </Tr>
          <Tr>
            <th>쿠팡캐시</th>
            <Td>
              <strong>0</strong>
              <span>원</span>
              <SubInfoText>
                <span>보유 : </span>
                <strong>{coupangCash.toLocaleString()}</strong>
                <span>원</span>
              </SubInfoText>
            </Td>
          </Tr>
          <Tr>
            <th>총결제금액</th>
            <Td>
              <strong>{totlePrice.toLocaleString()}</strong>
              <span>원</span>

              <SubInfoText>
                <span>캐시적립 예정 : </span>
                <strong>{totleSaveCash.toLocaleString()}</strong>
                <span>원</span>
              </SubInfoText>
            </Td>
          </Tr>
          <Tr>
            <th>결제방법</th>
            <td>
              <span>
                <input
                  type='radio'
                  id='coupay'
                  checked={check === 'coupay'}
                  onChange={(e) => setCheck(e.target.id)}
                />
                <label htmlFor='coupay'>쿠페이머니</label>
              </span>
              <span>
                <input
                  type='radio'
                  id='phone'
                  checked={check === 'phone'}
                  onChange={(e) => setCheck(e.target.id)}
                />
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

const Td = styled.td`
  position: relative;
`;

const DiscountText = styled.span`
  font-size: 12px;
  color: #ff0025;
`;

const SubInfoText = styled.span`
  display: inline-block;
  position: absolute;
  left: 180px;
`;
