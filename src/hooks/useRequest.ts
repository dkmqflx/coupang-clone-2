import { useQuery, QueryKey, QueryFunction, UseQueryOptions } from 'react-query';

type requestPropsType = {
  key: QueryKey;
  fetcher: QueryFunction;
  option?: UseQueryOptions;
};

export const useRequest = ({ key, fetcher, option }: requestPropsType) => useQuery(key, () => fetcher(), option);
