import { buyerType } from '../types/order';
import { dashToPhoneNumber } from '../utils';
import styled from '@emotion/styled';
import { Title, Table, Tr } from '../styles/table';

const Order = ({ buyer }: { buyer: buyerType }) => {
  const { name, email, phoneNumber } = buyer;

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
            <th>이름</th>
            <td>{name}</td>
          </Tr>
          <Tr>
            <th>이메일</th>
            <td>{email}</td>
          </Tr>
          <Tr>
            <th>휴대폰 번호</th>
            <td>
              <div>
                <input
                  type='text'
                  defaultValue={dashToPhoneNumber(phoneNumber)}
                />
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
            <th>이름</th>
            <td>김넘블</td>
          </Tr>
          <Tr>
            <th>배송주소</th>
            <td></td>
          </Tr>
          <Tr>
            <th>연락처</th>
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
