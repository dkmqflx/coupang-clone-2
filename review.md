- 4회차 과제에 대한 간단한 회고 입니다.

- 프로젝트를 진행하기전에 Next js에 대해서 기본적인 학습을 했지만 막상 프로젝트를 진행하다보니 SSG와 SSR의 개념과 어떠한 상황에서 `getStaticProps`, `getServerSideProps` 함수를 사용해야 되는지 헷갈리는 부분이 있었다.

### Suspense

- 이번 과제를 하면서 가장 애를 먹었언 부분은 Suspense를 적용하는 것이었다.

- 그 동안은 Loading, Error 상황을 처리하는 UI를 한 컴포넌트에서 처리했지만 이번에 처음 Suspnse를 사용하게 되었다

- 처음에는 react query로 data fetching 하는 `ProductList` 컴포넌트를 Suspense로 감싸주어도 fallback에 전달된 컴포넌트가 화면에 나타나지 않았다.

- 이러한 부분을 해결하기 위해 next.js의 `dynamic`을 사용했다

- `ssr:false` 옵션을 주어서 client에서 rendering 하는 방식으로 처리했고, fallback 에 전달된 컴포넌트 또한 화면에 나타났다.

- 다만, 해당 방법 이외의 다른 방법으로 Suspense 처리를 할 수 있는지 추가적인 학습이 더 필요할 것 같다

### Pagination

- 12개씩 보기에서 24개씩 보기로 변경하는 경우, 그리고 그 반대의 경우를 처리하는 부분에 어려움이 있었다

- 쿠팡 홈페이지에서 확인해보니, 더 많은 데이터 또는 더 적은 데이터 보기를 선택하더라도 내가 선택한 pagination은 변경되지 않는 것을 확인했고 그 부분에 맞게 구현하였다

- 다만 아쉬운 점은 시간적인 부분 때문에 Pagination 처리하는 부분을 총 데이터 개수에 맞게 구현했다

- 현재는 38개의 상품 데이터를 불러오는데, 더 많은 데이터를 불러올 때도 적용할 수 있도록 추가적으로 수정할 필요가 있다.

- 추가적으로 비동기 처리시 ErrorBoundary를 사용해서 실패한 경우를 외부에서 처리할 수 있도록 했으면 좋았을 것 같다.