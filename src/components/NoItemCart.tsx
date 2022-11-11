import { useRouter } from 'next/router';
import cookies from 'js-cookie';
import { AuthService } from '../services';
import { EMAIL, PASSWORD } from '../constants/login';
import styled from '@emotion/styled';
import { Table, Tr, Th } from './Common/Table';

const NoItemCart = () => {
  const router = useRouter();
  const haneldLogin = async () => {
    await AuthService.login(EMAIL, PASSWORD);
    router.reload();
  };

  return (
    <>
      <Table>
        <colgroup>
          <col width='50' />
          <col width='80' />
          <col width='*' />
          <col width='80' />
          <col width='90' />
        </colgroup>
        <thead>
          <Tr>
            <Th></Th>
            <Th colSpan={2}>상품정보</Th>
            <Th>상품금액</Th>
            <Th>배송비</Th>
          </Tr>
        </thead>
      </Table>
      <TextContainer>
        <NoItemText>장바구니에 담은 상품이 없습니다.</NoItemText>
        {!cookies.get('accessToken') && (
          <div>
            <NoItemLoginText>
              로그인을 하시면, 장바구니에 보관된 상품을 확인하실 수 있습니다.
            </NoItemLoginText>
            <LoginButton onClick={haneldLogin}>로그인하기</LoginButton>
          </div>
        )}
      </TextContainer>
    </>
  );
};

export default NoItemCart;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoItemLoginText = styled.p`
  margin-top: 20px;
  font-size: 12px;
  display: inline-block;
  color: #111111;
`;

const LoginButton = styled.button`
  width: 80px;
  height: 23px;
  margin-left: 5px;
  cursor: pointer;
  color: #777881;
  border: 1px solid #777881;
  border-radius: 2px;
  font-size: 12px;
`;

export const NoItemText = styled.p`
  font-weight: 700;
  font-size: 14px;
  color: #55575f;
  margin-top: 20px;
  margin-bottom: 0;
  text-align: center;
`;
