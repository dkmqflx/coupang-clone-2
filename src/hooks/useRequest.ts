import { useQuery, useMutation } from 'react-query';

type requestOptionType = {
  refetchInterval?: number;
  enabled?: boolean;
};

export const useRequest = <TData>(
  key: string | string[],
  request: () => Promise<TData>,
  option?: requestOptionType
) => {
  return useQuery(key, request, { ...option });
};

type mutateOptionType = {
  onSuccess?: () => void;
};

export const useMutate = <TData, TVariables>(
  mutationFn: (data: TVariables) => Promise<TData>,
  option?: mutateOptionType
): any => {
  return useMutation(mutationFn, { ...option });
};
