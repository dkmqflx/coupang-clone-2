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

type MutationFunction<
  TData = unknown,
  TError = unknown,
  TVariables = any,
  TContext = unknown
> = UseMutateAsyncFunction<TData, TError, TVariables, TContext>;

type MutationOptions<
  TData = unknown,
  TError = unknown,
  TVariables = any,
  TContext = unknown
> = UseMutationOptions<TData, TError, TVariables, TContext>;

export const useMutate = (
  mutationFn: MutationFunction,
  option?: MutationOptions
): any => {
  return useMutation(mutationFn, { ...option });
};
