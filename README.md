## 배포

[배포 URL](https://iridescent-tarsier-a2f6fa.netlify.app/checkout/1)

<br/>

## 구현 과제

- 이번 챌린지에서는 아래 스크린샷에서 붉게 표시된 영역을 구현해볼거에요.

- 아래 주의사항을 참고하며 구현해보아요.

  - 구매자정보의 휴대폰 번호 변경 기능은 존재하지 않는다고 생각해주세요.

  - 받는사람정보의 배송요청사항 정보는 존재하지 않는다고 생각해주세요.

  - 배송지 선택 팝업은 수정, 삭제를 할 수 없고 선택만 할 수 있다고 생각해주세요.

  - 적용 가능한 할인 쿠폰은 항상 없다고 생각해주세요.

  - 결제정보의 결제방법은 쿠페이 머니, 휴대폰만 구현해주세요.

  - 주문서페이지는 보안이 중요합니다. 서버사이드렌더링을 통해 조회API를 클라이언트 사이드에서 호출하지 않도록 구현해주세요.

<img src='images/image1.png'>

<br/>

<img src='images/image3.png'>

<br/>

아래는 배송지 선택 팝업 입니다.

배송지 목록 팝업은 BroadcastChannel, postMessage를 이용해서 구현해주세요.

<img src='images/image2.png'>

<br/>

### API 목록

1. 주문서 조회

   - 해당 id의 주문서를 반환합니다. id는 임의의 numeric string을 넣어주면됩니다.

   - 경로: /api/ordersheet/[id]

   - HTTP METHOD: GET

   - Bearer Token 필요

2. 배송지 목록

   - 배송지 선택 팝업에서 사용해주시면 됩니다. 보유중인 배송지 데이터를 배열로 반환합니다.

   - 경로: /api/address

   - HTTP METHOD: GET

   - Bearer Token 필요

3. 주문 완료

   - 주문서 페이지에서 설정한 정보들을 통해 적절히 호출해보세요

   - 경로: /api/order/complete

   - HTTP METHOD: POST

   - Bearer Token 필요

   - request body
     ```tsx
     {
     	ordersheetId: number;
     	addressId: number;
     	usedCash: number;
     	payMethod: 'mobile' | 'coupaymoney';
     	/** 'mobile' 결제에서 필수입니다. */
     	mobileCarrier?: 'skt' | 'kt' | 'hello' | 'kct';
     	/** 'coupaymoney' 결제에서 필수입니다. */
     	usedCoupaymoney?: number;
     }
     ```

---

<br/>

## 구현 결과

### 배송지 목록 팝업

- 배송지변경 버튼을 누르면 배송지 목록을 볼 수 있는 새로운 창이 생성되고 해당 페이지에서 배송지를 선택할 수 있습니다.

- 따라서 기존의 페이지와 새로 생긴 페이지 사이의 통신에 사용할 있도록 BroadcastChannel, postMessage를 사용해서 배송지 목록을 변경하는 기능을 구현했습니다.

- 아래처럼 custom hook을 정의하고, 현재 선택된 배송지 데이터가 사용되는 컴포넌트와 배송지 목록을 보여주는 `address` 페이지에서 각각 hook을 불러와서 사용했습니다

```ts
// hooks/useAddress.ts

import { useEffect, useRef, useState } from 'react';
import { addressType } from '../types/order';

const ADDRESS = 'address';

const useAddress = () => {
  const channel = useRef<BroadcastChannel>();
  const [address, setAddress] = useState<addressType>();

  // 배송지 변경하기 위한 함수
  const postMessage = (message: any) => {
    channel.current?.postMessage(message);
  };

  // 새로운 창 여는 함수
  const onPopUpAddress = (id: number) => {
    window.open(`address?id=${id}`);
  };

  useEffect(() => {
    channel.current = new BroadcastChannel(ADDRESS);

    // 메시지가 변경될 때 마다 선택한 주소 변경되도록 이벤트 등록
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

- address 페이지는 배송지변경 버튼을 클릭했을 때 새로운 창에서 생성되는 페이지 입니다.

- 이 페이지에서는 배송지 목록을 볼 수 있고 선택한 배송지 정보를 `postMessage` 함수를 통해서 전달할 수 있습니다.

- 그리고 이렇게 전달된 배송지 정보를 useAddress hook으로 불러와서 사용할 수 있습니다.

```tsx
// pages/address.tsx

const AddressPopUp = () => {

  const { data } = useGetAddress(); // 배송지 목록 데이터

  ...

  // 배송지 선택하기 위한 함수
  const { postMessage } = useAddress();

  // 변겯된 배송지를 postMessage로 전달해준다.
  const onChangeAddress = (selectedId: number) => {
    setSelectedId(`${selectedId}`);
    const selectedAddress = data.find(
      ({ id }: { id: number }) => id === selectedId
    );
    postMessage(selectedAddress);
    window.close();
  };

...


}

```

<br/>

- `Order` 컴포넌트에서는 위에서 정의한 useAddress hook을 사용합니다.

- `onPopUpAddress` 함수를 통해 배송지변경 버튼을 누르면 배송지 목록을 볼 수 있는 위의 address 페이지가 새로운 창에서 열리고 배송지를 변경할 수 있습니다.

- 이렇게 변경된 배송지 정보(`selectedAddress`)를 가져와서 사용자에게 보여줍니다.

- 만약 `selectedAddress` 값이 없는 경우에는 아직 주소를 변경하지 않은 상태이기 때문에 처음 받아온 데이터(address)를 사용해서 배송지 정보를 보여줍니다.

```tsx
// src/components/Order.tsx

const Order = ({
  buyer,
  address,
}: {
  buyer: buyerType;
  address: addressType;
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
      ...
      <Table>
        <caption>
          <span>받는사람정보</span>
          <DeliveryButton
            onClick={() =>
              onPopUpAddress(selectedAddress ? selectedAddress.id : id)
            }
          >
            배송지변경
          </DeliveryButton>
        </caption>
        ...
      </Table>
    </div>
  );
};

export default Order;
```
