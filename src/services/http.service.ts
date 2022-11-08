import axios, { AxiosPromise } from 'axios';
import cookies from 'js-cookie';

export interface httpImpl {
  get(url: string): AxiosPromise;
}

class HttpService implements httpImpl {
  private request;
  private accessToken = cookies.get('accessToken');

  constructor() {
    this.request = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_HOST,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  get(url: string) {
    return this.request({
      method: 'get',
      url,
    });
  }
}

export default new HttpService();
