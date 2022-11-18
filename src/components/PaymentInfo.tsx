import { useRouter } from 'next/router';
import { useState } from 'react';
import { getPaymentInfo } from '../utils';
import { productType, payMethodType, mobileCarrierType } from '../types/order';
import { usePayment } from '../quries/checkout';
import useAddress from '../hooks/useAddress';
import styled from '@emotion/styled';
import { Table, Tr } from '../styles/table';

const PaymentInfo = ({
  coupangCash,
  orderItems,
  addressId,
  coupayMoney,
}: {
  coupangCash: number;
  coupayMoney: number;
  addressId: number;
  orderItems: { quantity: number; product: productType }[];
}) => {
  const { mutate } = usePayment();
  const router = useRouter();
  const { totleShppingFee, totlePrice, totleSaveCash } =
    getPaymentInfo(orderItems);
  const [paymentMethod, setPaymentMethod] =
    useState<payMethodType>('coupaymoney');
  const [mobileCarrier, setMobileCarrier] = useState<mobileCarrierType>('skt');
  const { address } = useAddress();

  const handlePayment = () => {
    const paymentInfo = {
      ordersheetId: Number(router.query.id),
      addressId: address?.id ? address.id : addressId,
      usedCash: coupangCash,
    };

    if (paymentMethod === 'coupaymoney') {
      const result = {
        ...paymentInfo,
        payMethod: 'coupaymoney',
        usedCoupaymoney: coupayMoney,
      };
      mutate({ ...result });
    } else {
      const result = {
        ...paymentInfo,
        payMethod: 'mobile',
        mobileCarrier: mobileCarrier,
      };
      mutate({ ...result });
    }
  };

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
                  id='coupaymoney'
                  checked={paymentMethod === 'coupaymoney'}
                  onChange={(e) =>
                    setPaymentMethod(e.target.id as payMethodType)
                  }
                />
                <label htmlFor='coupaymoney'>쿠페이머니</label>
              </span>
              <span>
                <input
                  type='radio'
                  id='mobile'
                  checked={paymentMethod === 'mobile'}
                  onChange={(e) =>
                    setPaymentMethod(e.target.id as payMethodType)
                  }
                />
                <label htmlFor='mobile'>휴대폰</label>
              </span>
              {paymentMethod === 'coupaymoney' ? (
                <div>
                  <PaymentMethodWrapper>
                    <CoupayText>
                      <div>
                        <span>* 잔액</span>
                        <span>{coupayMoney.toLocaleString()} 원</span>
                      </div>
                      <p>* 잔액이 부족할 경우, 결제 진행 시에 충전됩니다.</p>
                    </CoupayText>
                  </PaymentMethodWrapper>
                  <input
                    type='checkbox'
                    id='defaultPayment'
                    defaultChecked={true}
                  />
                  <label htmlFor='defaultPayment'>
                    기본 결제 수단으로 사용
                  </label>
                </div>
              ) : (
                <div>
                  <PaymentMethodWrapper>
                    <CoupayText>
                      <label htmlFor='mobileCarrier'>* 통신사 종류</label>
                      <select
                        id='mobileCarrier'
                        value={mobileCarrier}
                        onChange={(e) =>
                          setMobileCarrier(e.target.value as mobileCarrierType)
                        }
                      >
                        <option value='skt'>SKT</option>
                        <option value='kt'>KT</option>
                        <option value='hello'>헬로모바일</option>
                        <option value='kct'>KCT</option>
                      </select>
                    </CoupayText>
                  </PaymentMethodWrapper>
                  <input
                    type='checkbox'
                    id='defaultPayment'
                    defaultChecked={true}
                  />
                  <label htmlFor='defaultPayment'>
                    선택한 결제수단 및 휴대폰번호로 향후 결제 이용에
                    동의합니다.(선택)
                  </label>
                </div>
              )}
            </td>
          </Tr>
        </tbody>
      </Table>
      <ButtonWrapper>
        <Button onClick={handlePayment}>결제하기</Button>
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

const PaymentMethodWrapper = styled.div`
  padding: 10px;
  border: 2px solid #c5c7cd;
  background-color: #f4f6fa;
  margin: 8px 0;
`;

const CoupayText = styled.div`
  color: #555;
  font-size: 12px;

  & > label {
    font-weight: bold;
    margin-right: 30px;
  }

  div {
    padding: 10px 0;
    border-bottom: 1px solid #e4e4e4;
  }

  span {
    font-weight: bold;
  }

  span + span {
    margin-left: 40px;
  }
`;
