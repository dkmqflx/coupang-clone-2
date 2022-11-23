import { useQuery, useMutation } from 'react-query';

type queryOptionType = {
  refetchInterval?: number;
  enabled?: boolean;
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
};

export const useMutate = (
  mutationFn: (data: any) => Promise<any>,
  option?: mutateOptionType
): any => {
  return useMutation(mutationFn, { ...option });
};
