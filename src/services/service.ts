import cookies from 'js-cookie';

interface GetTokenImpl {
  getAccessToken(): string | undefined;
  getRefreshToken(): string | undefined;
}

interface SetTokenImpl {
  setAccessToken(accessToken: string, expires: number): void;
  setRefreshToken(refreshToken: string, expires: number): void;
}

class Service implements GetTokenImpl, SetTokenImpl {
  getAccessToken(): string | undefined {
    return cookies.get('accessToken');
  }

  getRefreshToken(): string | undefined {
    return cookies.get('refreshToken');
  }

  setAccessToken(accessToken: string, expires: number = 1) {
    cookies.set('accessToken', accessToken, { expires });
  }

  setRefreshToken(refreshToken: string, expires: number = 7) {
    cookies.set('refreshToken', refreshToken, { expires });
  }
}

export default Service;
