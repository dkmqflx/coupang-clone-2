## NUMBLE - 가장 실무에 가까운 쿠팡 클론코딩 4회차

<img width="752" alt="(220531)메인이미지_쿠팡클론코딩챌린지 (1)" src="https://user-images.githubusercontent.com/103182032/174029124-6e64d0c2-fc52-48c9-bd73-b91546682242.png" style="width:100%">

[챌린지 페이지](https://www.numble.it/84b74183-c72e-4502-91c9-e41fbf0aa7aa)

이번 챌린지에서는 쿠팡 서비스의 상품 목록 페이지를 만들어볼게요!

React Suspense를 사용하며 선언적인 구조에 대해 생각해보아요.

API 상태를 history API와 적절히 연동할 수 있는 방식도 고민해보아요.

---

- 배포 URL
  - [https://benevolent-klepon-5f1da1.netlify.app/products?offset=0&limit=12&sorter=bestAsc](https://benevolent-klepon-5f1da1.netlify.app/products?offset=0&limit=12&sorter=bestAsc)

---

## Suspense

- 과제를 구현할 때 Next.js의 Static Generation을 위한 함수가 아니라 Server Side Rendering을 위한 `getServerSideProps` 함수를 사용했습니다.

- 그 이유는 Static Generation 함수에 사용되는 `getStaticProps`는 build 타임에만 실행이되고 `getStaticPaths` 함수의 경우에는 initial request이후의 요청은 cach된 데이터를 반환하기 때문입니다.

- 그리고 incremental static regeneration의 `revalidate`를 설정하더라도 딜레이가 생기기 때문에 사용자에게 최신의 정보를 보여줄 수 없다는 단점이 있습니다.

- 따라서 사용자의 선택에 따라 URL이 바뀌고, 해당 URL에 따라 최신 정보를 불러와야 하기 때문에 SSR의 `getServerSideProps` 함수를 사용했습니다.

<br/>

- ProductList를 보여주는 ProductList 컴포넌트 같은 경우 `Dynamic import`를 사용해서 처리해주었습니다.

- 그 이유는 SSR에서는 `Suspense`를 사용할 수 없는데, 이 때 `Dynamic import`을 통해서 `Suspense`를 사용할 수 있기 때문입니다.

- 그리고 `ssr:false` 옵션을 설정해 주었는데 그 이유는 URL에 있는 정보에 따라 Client Side에서 React Query로 데이터를 불러오기 때문에 `ssr`을 `false`로 설정해주었습니다.

```jsx
// pages/products.tsx

const ProductList = dynamic(() => import('../src/components/ProductList'), {
  ssr: false,
});

export default function ProductListPage({
  offset: defaultOffset,
  limit: defaultLimit,
  sorter: defaultSorter,
}: queryType) {
  const route = useRouter();

  const {
    offset = defaultOffset,
    limit = defaultLimit,
    sorter = defaultSorter,
  } = route.query;

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!Object.keys(context.query).length) {
    return {
      redirect: {
        permanent: true,
        destination: DEFAULT_URL,
      },
      props: {},
    };
  }

  const {
    query: { offset, limit, sorter },
  } = context;

  return {
    props: {
      offset,
      limit,
      sorter,
    },
  };
};
```

---

## Pagination

- router 관련 기능들이 각 컴포넌트들에 있다면 분포되어있어서 결합도가 높다는 단점이 생깁니다.

- 따라서 router 관련 코드들을 모아서 응집도를 높이고 결합도를 낮추기 위해서 page 이동을 위한 Custom hook을 정의해주었습니다

```jsx
// hooks/usePageRoute

import { useRouter } from 'next/router';
import { queryType } from '../types/product.types';

const usePageRoute = () => {
  const router = useRouter();

  const updatePage = ({ offset, limit, sorter }: queryType) => {
    router.push(
      `/products?offset=${offset}&limit=${limit}&sorter=${sorter}`,
      undefined,
      { shallow: true }
    );
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
