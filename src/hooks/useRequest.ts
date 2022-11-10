import {
  QueryKey,
  QueryFunction,
  UseQueryOptions,
  useQuery,
  useMutation,
  UseMutationOptions,
  UseMutateAsyncFunction,
} from 'react-query';

export const useRequest = (
  key: QueryKey,
  request: QueryFunction,
  option?: UseQueryOptions
): any => {
  return useQuery(key, request, { ...option });
};

export const useMutate = (
  mutationFn: UseMutateAsyncFunction,
  option?: UseMutationOptions
): any => {
  return useMutation(mutationFn, { ...option });
};
