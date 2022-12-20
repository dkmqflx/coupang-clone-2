import { useQuery } from 'react-query';

type requestOptionType = {
  refetchInterval?: number;
  enabled?: boolean;
};

export const useRequest = <TData>(
  key: string | string[],
  request: () => TData | Promise<TData>,
  option?: requestOptionType
) => {
  return useQuery(key, request, { ...option });
};
