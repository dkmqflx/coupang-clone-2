import { useRequest } from './useRequest';
import { UserService } from '../services';

export const useGetMeData = () =>
  useRequest({
    key: 'me',
    fetcher: UserService.me,
    option: {
      refetchInterval: 500,
    },
  });
