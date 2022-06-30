import { http } from '../utils/http';
import Service from './service';

class UserService extends Service {
  constructor() {
    super();
  }

  async me() {
    const accessToken = super.getAccessToken();

    if (!accessToken) {
      return;
    }

    const { data } = await http({
      url: '/users/me',
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  }

  async read(id: number) {
    const { data } = await http({ url: `/users/me/${id}`, method: 'get' });

    return data;
  }
}

export default new UserService();
