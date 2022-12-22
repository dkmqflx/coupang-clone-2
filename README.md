## 배포

[배포 URL](https://coupang-clone-2-stage4.netlify.app/products?offset=0&limit=12&sorter=bestAsc)

<br/>

## 구현 과제

<img src='./images/image.png'>

- 이번 챌린지에서는 위 스크린샷에서 붉게 표시된 영역을 구현해볼거에요.

- 나머지 영역은 이번 미션의 주제와 무관하거나 동일한 방식으로 대응할 수 있기 때문에 구현하지 않습니다.

- 아래 주의사항을 참고하며 구현해보아요.

  - 정렬/페이지크기를 변경이 URL에 반영되어야합니다.

  - initial render시에 정렬/페이지크기가 변경된 상태의 URL을 읽어 적절히 반영해야합니다.

  - 페이지크기는 ‘12개씩 보기', ‘24개씩 보기' 두 가지를 선택할 수 있게끔 구현해주세요.

  - 상품 리스트의 데이터 비동기 처리에 React Suspense를 이용해보아요.

  - 아래 패키지를 사용해 나만의 fallback 컴포넌트를 구현해주세요.

    - [React Spinners](https://www.davidhu.io/react-spinners/)

---

### API 소개

- 경로 : /products?offset=[offset]&limit=[limit]&sorter=[sorter]

- offset,limit 페이지네이션을 지원하며, sorter 파라미터를 통해 데이터를 정렬할 수 있습니다.

- sorter 쿼리 파라미터에는 다음 값들이 들어갈 수 있습니다.

  - bestAsc: ‘쿠팡 랭킹순'

  - salePriceAsc: ‘낮은가격순'

  - salePriceDesc: ‘높은가격순'

  - saleCountDesc: ‘판매량순'

  - latestAsc: ‘최신순'

---

<br/>

## 구현 결과

### Suspense

- 상품 목록을 보여주는 ProductList 컴포넌트 같은 경우 Suspense를 적용하기 위해서 next.js의 [`Dynamic import`](https://nextjs.org/docs/advanced-features/dynamic-import)를 사용했습니다.

- 그리고 Client Side에서 컴포넌트를 불러오기 때문에 `ssr:false` 옵션을 설정해 주었습니다.

```jsx
// pages/products.tsx

...

const ProductList = dynamic(() => import('../src/components/ProductList'), {
  ssr: false,
});

export default function ProductListPage() {
  return (
    <Wrapper>
      <ProductMenu />
      <Suspense fallback={<Spinner />}>
        <ProductList />
      </Suspense>
      <ProductPagination />
    </Wrapper>
  );
}

```

---

<br/>

### usePageRoute

- 구현 해야하는 주요 기능 중 하나는 사용자가 선택한 기준에 따라 상품이 정렬되도록 하는 것으로 크게 아래와 같은 케이스로 나눌 수 있습니다.

  - ‘쿠팡 랭킹순', ‘낮은가격순', ‘높은가격순', ‘판매량순', ‘최신순'

  - 12개씩 보기, 24개씩 보기

  - Pagination

- 사용자가 정렬 기준을 선택할 때 마다 url이 변경되고, 변경된 query 값을 이용해서 데이터를 새롭게 불러와서 정렬해주는 방식으로 처리해주었습니다.

- 따라서 아래처럼 페이지 이동과 관련된 Custom hook을 정의해준 다음 url을 변경해야 하는 컴포넌트에서 사용했습니다.

```jsx
// hooks/usePageRoute

import { useRouter } from 'next/router';
import { queryType } from '../types/product.types';

const usePageRoute = () => {
  const router = useRouter();
  const { offset = '0', limit = '12', sorter = 'bestAsc' } = router.query;

  const updatePage = ({ offset, limit, sorter }: queryType) => {
    router.push(`/products?offset=${offset}&limit=${limit}&sorter=${sorter}`);
  };

  return {
    updatePage,
    offset,
    limit,
    sorter,
  };
};

export default usePageRoute;
```

<br/>

- 아래는 Pagination을 위한 컴포넌트로 사용자가 선택한 페이지에 따라 변경된 offset을 전달해서 url을 변경해 주었습니다.

```jsx
// components/ProductPagination

...

const ProductPagination = () => {
  const { updatePage, offset, limit, sorter } = usePageRoute();

  const handleChangeOffset = (pagination: number) => {
    const offset = `${pagination === 1 ? 0 : (pagination - 1) * Number(limit)}`;
    updatePage({ offset, limit, sorter });
  };

  const getCurrentPage = () => {
    if (Number(limit) === SHOW_TWENTY_FOUR) {
      return Number(offset) === 0 ? 1 : 2;
    } else {
      return Number(offset) === 0 ? 1 : Number(offset) / Number(limit) + 1;
    }
  };

  return (
    <Pagination
      current={getCurrentPage()}
      pageSize={Number(limit)}
      total={DEFAULT_TOTAL}
      showSizeChanger={false}
      onChange={(pagination) => handleChangeOffset(pagination)}
    />
  );
};

export default ProductPagination;
```
