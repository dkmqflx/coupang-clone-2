import { http } from '../utils/http';
import Service from './service';

type SignupAgreements = {
  privacy: boolean;
  ad:
    | {
        email: boolean;
        sms: boolean;
        app: boolean;
      }
    | false;
};

class AuthService extends Service {
  /** refreshToken을 이용해 새로운 토큰을 발급받습니다. */
  constructor() {
    super();
  }
  async refresh() {
    const refreshToken = super.getRefreshToken();

    if (!refreshToken) {
      return;
    }

    const { data } = await http({
      url: '/auth/refresh',
      method: 'get',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    super.setAccessToken(data.access);
    super.setRefreshToken(data.refresh);
  }

  /** 새로운 계정을 생성하고 토큰을 발급받습니다. */
  async signup(email: string, password: string, name: string, phoneNumber: string, agreements: SignupAgreements) {
    const { data } = await http({
      url: '/auth/signup',
      method: 'post',
      data: {
        email,
        password,
        name,
        phoneNumber,
        agreements,
      },
    });

    super.setAccessToken(data.access);
    super.setRefreshToken(data.refresh);
  }

  /** 이미 생성된 계정의 토큰을 발급받습니다. */
  async login(email: string, password: string) {
    const { data } = await http({
      url: '/auth/login',
      method: 'post',
      data: {
        email,
        password,
      },
    });

    super.setAccessToken(data.access);
    super.setRefreshToken(data.refresh);
  }
}

export default new AuthService();
