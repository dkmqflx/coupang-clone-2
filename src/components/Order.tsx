import styled from '@emotion/styled';
import React from 'react';

const Order = () => {
  return (
    <div>
      <TitleWrapper>
        <Title>주문/결제</Title>
        <OrderStep>
          <span>{`장바구니>`}</span>
          <span>{`주문결제>`}</span>
          <span>주문완료</span>
        </OrderStep>
      </TitleWrapper>

      <Table>
        <caption>구매자 정보</caption>

        <tbody>
          <Tr>
            <td>이름</td>
            <td>김넘블</td>
          </Tr>
          <Tr>
            <td>이메일</td>
            <td>test@numble.it</td>
          </Tr>
          <Tr>
            <td>휴대폰 번호</td>
            <td>
              <div>
                <input type='text' />
                <PhoneDescription>
                  쿠폰/티켓정보는 구매한 분의 번호로 전송됩니다.
                </PhoneDescription>
              </div>
              <p>
                * 인증 번호를 못 받았다면, 1577-7011 번호 차단 및 스팸 설정을
                확인해 주세요.
              </p>
            </td>
          </Tr>
        </tbody>
      </Table>

      <Table>
        <caption>
          <span>받는사람정보</span>
          <DeliveryButton>배송지변경</DeliveryButton>
        </caption>

        <tbody>
          <Tr>
            <td>이름</td>
            <td>김넘블</td>
          </Tr>
          <Tr>
            <td>배송주소</td>
            <td></td>
          </Tr>
          <Tr>
            <td>연락처</td>
            <td>010 - 1234 - 5678</td>
          </Tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Order;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid #777;
  padding-bottom: 28px;
  margin-top: 28px;
`;

const Title = styled.h3`
  font-size: 30px;
  color: #111;
  margin: 0;
`;

const OrderStep = styled.div`
  padding-right: 5px;
  margin-top: 20px;
  font-size: 15px;
  color: #bbb;
  font-weight: 700;

  & span:nth-child(2) {
    color: #346aff;
  }
`;

const Table = styled.table`
  border-top: 2px solid #cecece;
  border-collapse: collapse;
  width: 100%;
  margin-top: 28px;

  & caption {
    text-align: left;
    padding-left: 2px;
    margin-bottom: 8px;
    font-size: 20px;
    font-weight: 700;
    color: #333;
  }
`;

const Tr = styled.tr`
  font-size: 12px;
  color: #333;

  td:first-child {
    width: 104px;
    font-weight: 700;
    text-align: right;
    background: #f4f4f4;
    padding: 7px 10px 7px 15px;
    border: solid #e4e4e4;
    border-width: 0 1px 1px 0;
  }
  td:last-child {
    border-bottom: 1px solid #e4e4e4;
    padding: 10px 16px;
  }
`;

const PhoneDescription = styled.span`
  margin-left: 10px;
  color: #9a9a9a;
`;

const DeliveryButton = styled.button`
  padding: 4px 8px;
  border: 1px solid #999;
  color: #333;
  border-radius: 2px;
  box-shadow: 0 -2px 0 rgb(0 0 0 / 10%) inset;
  font-size: 11px;
  margin-left: 8px;
  background-color: #fff;
  cursor: pointer;

  vertical-align: middle;
`;
