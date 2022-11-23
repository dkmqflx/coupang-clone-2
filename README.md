- [챌린지 페이지](https://thoughtful-arch-8c2.notion.site/b5037b8c2e1d4c81a42f48f2a00adba6)

- [배포 URL](https://iridescent-tarsier-a2f6fa.netlify.app/checkout/1)

---

<br/>

## 배송지 목록 팝업

- 배송지변경 버튼을 누르면 배송지목록을 선택하는 새로운 창이 열리고 이 때 새로운 창에서 데이터를 선택해서 배송지를 변경해주어야 했기 때문에 페이지와 새로 생긴 창 사이의 통신에 사용할 수 있는 BroadcastChannel, postMessage를 이용해서 배송지 목록을 변경하는 기능을 구현했습니다.

- 아래처럼 custom hook을 만든다음, 현재 선택된 배송지 데이터를 보여주는 `Order` 컴포넌트와 배송지 목록을 보여주는 `AddressPopUp` 페이지에서 각각 hook을 불러와서 사용했습니다

```jsx
import { useEffect, useRef, useState } from 'react';
import { addressType } from '../types/order';

const ADDRESS = 'address';

const useAddress = () => {
  const channel = useRef<BroadcastChannel>();
  const [address, setAddress] = useState<addressType>();

  const postMessage = (message: any) => {
    channel.current?.postMessage(message);
  };

  const onPopUpAddress = (id: number) => {
    window.open(`address?id=${id}`);
  };

  useEffect(() => {
    channel.current = new BroadcastChannel(ADDRESS);

    if (channel.current) {
      channel.current.addEventListener('message', (event) => {
        setAddress(event.data);
      });
    }

    return () => {
      channel.current?.removeEventListener('message', (event) => {
        setAddress(event.data);
      });
    };
  }, []);

  return { postMessage, address, onPopUpAddress };
};

export default useAddress;
```

<br/>

- 아래처럼 `Order` 컴포넌트에서는 onPopUpAddress 함수를 통해 배송지변경 버튼을 누르면 배송지 목록을 볼 수 있는 새로운 창이 열립니다.

- 위에서 정의한 hook을 통해 주소(selectedAddress)가 내려오지 않는 경우에는 처음 받아온 데이터(address)를 사용해서 배송지 정보를 보여주도록 했습니다.

```jsx
// src/components/Order.tsx

const Order = ({
  buyer,
  address,
}: {
  buyer: buyerType,
  address: addressType,
}) => {
  const { name, email, phoneNumber } = buyer;
  const {
    receiver,
    phoneNumber: addressPhoneNumber,
    base,
    detail,
    id,
  } = address;

  const { address: selectedAddress, onPopUpAddress } = useAddress();

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
        <caption>
          <span>받는사람정보</span>
          <DeliveryButton onClick={() => onPopUpAddress(id)}>
            배송지변경
          </DeliveryButton>
        </caption>

        <tbody>
          <Tr>
            <th>이름</th>
            <td>{selectedAddress ? selectedAddress.receiver : receiver}</td>
          </Tr>
          <Tr>
            <th>배송주소</th>
            <td>
              {selectedAddress
                ? `${selectedAddress.base} ${selectedAddress.detail}`
                : `${base} ${detail}`}
            </td>
          </Tr>
          <Tr>
            <th>연락처</th>
            <td>
              {selectedAddress
                ? selectedAddress.phoneNumber
                : addressPhoneNumber}
            </td>
          </Tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Order;
```

<br/>

- 배송지변경 버튼을 클릭해서 새롭게 열린 창에서는 배송지를 선택할 수 있고 새롭게 선택한 배송지 정보를 postMessage 함수를 통해서 `Order` 컴포넌트로 전달할 수 있습니다.

```jsx
// pages/addressPopUp

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

```
