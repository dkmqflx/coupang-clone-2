import { useQuery, useMutation } from 'react-query';

type queryOptionType = {
  refetchInterval?: number;
  enabled?: boolean;
  refetchOnMount?: boolean;
};

export const useRequest = (
  key: string | string[],
  request: () => Promise<any>,
  option?: queryOptionType
) => {
  return useQuery(key, request, { ...option });
};

type mutateOptionType = {
  onSuccess?: () => void;
  onError?: (
    error: unknown,
    variables: unknown,
    context: unknown | undefined
  ) => Promise<unknown> | void;
  onMutate?: (variables: any) => Promise<any | void> | any | void;
};

export const useMutate = (
  mutationFn: (data: any) => Promise<any>,
  option?: mutateOptionType
): any => {
  return useMutation(mutationFn, { ...option });
};
