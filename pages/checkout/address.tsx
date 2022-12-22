import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetAddress } from '../../src/quries/checkout';
import { addressType } from '../../src/types/order';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import DeliveryType from '../../src/components/DeliveryType';
import useAddress from '../../src/hooks/useAddress';

const AddressPopUp = () => {
  const { data } = useGetAddress();
  const { isReady, query } = useRouter();
  const [selectedId, setSelectedId] = useState<string | string[] | undefined>();

  useEffect(() => {
    setSelectedId(query.id);
  }, [isReady]);

  const { postMessage } = useAddress();

  const onChangeAddress = (selectedId: number) => {
    setSelectedId(`${selectedId}`);
    const selectedAddress = data.find(
      ({ id }: { id: number }) => id === selectedId
    );
    postMessage(selectedAddress);
    window.close();
  };

  return (
    <AddressWrapper>
      <Header>배송지 선택</Header>
      {data?.map(
        ({
          id,
          receiver,
          phoneNumber,
          base,
          detail,
          isFreshAvailable,
          isWowAAvailable,
        }: addressType) => (
          <Address key={id} checked={selectedId === `${id}`}>
            <div>{receiver}</div>
            <div>
              {query.id === `${id}` && <DeliveryType />}
              {isFreshAvailable && <DeliveryType type='fresh' />}
              {isWowAAvailable && <DeliveryType type='wow' />}
            </div>
            <div>{`${base} ${detail}`}</div>
            <div>{phoneNumber}</div>
            <ButtonWapper>
              <button onClick={() => onChangeAddress(id)}>선택</button>
            </ButtonWapper>
          </Address>
        )
      )}
    </AddressWrapper>
  );
};

export default AddressPopUp;

const Header = styled.h1`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  color: #111;
  font-size: 16px;
  text-align: center;
  border: 1px solid #ccc;
  margin: 0;
  padding: 10px 0;
  height: 40px;
`;

const AddressWrapper = styled.div`
  min-width: 300px;
  max-width: 460px;
  margin: 0 auto;
  margin-top: 40px;
  padding-top: 10px;
`;

const Address = styled.div<{ checked: boolean }>`
  padding: 16px;
  border: 1px solid #ccc;
  font-size: 15px;
  color: #111;

  & + & {
    border-top: none;
  }

  & div {
    margin-top: 8px;
  }

  ${({ checked }) =>
    checked &&
    css`
      border: 2px solid #0073e9;
    `}
`;

const ButtonWapper = styled.div`
  display: flex;
  justify-content: flex-end;

  & button {
    cursor: pointer;
    background-color: #0073e9;
    color: #fff;
    font-weight: bold;
    border: none;
    outline: none;
    padding: 8px 18px;
    border-radius: 2px;
  }
`;
