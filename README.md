# NUMBLE - 가장 실무에 가까운 쿠팡 클론코딩 4회차

- [4회차 : 상품 목록 페이지 - API 통신 ‘잘' 하기](https://thoughtful-arch-8c2.notion.site/7cade58694b54c6fbee7262128ebb2c1)

- [배포 URL](https://coupang-clone-stage4.netlify.app/products?offset=0&limit=12&sorter=bestAsc)

---

## Suspense

- 상품 목록을 보여주는 ProductList 컴포넌트 같은 경우 Suspense를 적용하기 위해서 next.js의 [`Dynamic import`](https://nextjs.org/docs/advanced-features/dynamic-import)를 사용했습니다.

- 그리고 Client Side에서 컴포넌트를 불러오기 때문에 `ssr:false` 옵션을 설정해 주었습니다.

```jsx
// pages/products.tsx

...

const ProductList = dynamic(() => import('../src/components/ProductList'), {
  ssr: false,
});

export default function ProductListPage() {
  const route = useRouter();

  const { offset = '0', limit = '12', sorter = 'bestAsc' } = route.query;

  return (
    <Wrapper>
      <ProductMenu offset={offset} limit={limit} sorter={sorter} />
      <Suspense fallback={<Spinner />}>
        <ProductList offset={offset} limit={limit} sorter={sorter} />
      </Suspense>
      <ProductPagination offset={offset} limit={limit} sorter={sorter} />
    </Wrapper>
  );
}

```

---

<br/>

## Pagination

- router 관련 기능들이 각 컴포넌트들에 있다면 분포되어있어서 결합도가 높다는 단점이 생깁니다.

- 따라서 페이지 이동을 위한 router 관련 코드들을 모아서 응집도를 높이고 결합도를 낮추기 위해서 page 이동을 위한 Custom hook을 정의해주었습니다

```jsx
// hooks/usePageRoute

import { useRouter } from 'next/router';
import { queryType } from '../types/product.types';

const usePageRoute = () => {
  const router = useRouter();

  const updatePage = ({ offset, limit, sorter }: queryType) => {
    router.push(`/products?offset=${offset}&limit=${limit}&sorter=${sorter}`);
  };

  return {
    updatePage,
  };
};

export default usePageRoute;
```

<br/>

- 이렇게 정의한 Custom hook을 page를 이동해서 URL을 변경해야 하는 컴포넌트에서 사용했습니다.

```jsx
// components/ProductPagination

...

const ProductPagination = ({ offset, limit, sorter }: queryType) => {
  const { updatePage } = usePageRoute();

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
