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

type mutateOptionType<TData, TVariables> = {
  onSuccess?: (data: TData, varialbes: TVariables) => void;
  onError?: () => void;
};

export const useMutate = <TData, TVariables = void>(
  mutationFn: (data: TVariables) => Promise<TData>,
  option?: mutateOptionType<TData, TVariables>
) => {
  return useMutation(mutationFn, { ...option });
};
