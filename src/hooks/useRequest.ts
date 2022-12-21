import { useQuery, useMutation } from 'react-query';

type requestOptionType = {
  refetchInterval?: number;
  enabled?: boolean;
  refetchOnMount?: boolean;
};

export const useRequest = <TData>(
  key: string | string[],
  request: () => TData | Promise<TData>,
  option?: requestOptionType
) => {
  return useQuery(key, request, { ...option });
};

type mutateOptionType<TData, TError, TVariables> = {
  onSuccess?: () => void;
  onError?: (
    error?: TError,
    variables?: TVariables,
    context?: { previousData: TData }
  ) => void;
  onMutate?: (variables: TVariables) => Promise<TData | void> | any | void;
};

export const useMutate = <TData, TError, TVariables = void>(
  mutationFn: (data: TVariables) => Promise<TData>,
  option?: mutateOptionType<TData, TError, TVariables>
) => {
  return useMutation(mutationFn, { ...option });
};
