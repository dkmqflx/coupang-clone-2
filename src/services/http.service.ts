import axios, { AxiosPromise } from 'axios';
import cookies from 'js-cookie';

export interface httpImpl {
  get(url: string): AxiosPromise;
  post(url: string): AxiosPromise;
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

  post(url: string) {
    return this.request({
      method: 'post',
      url,
    });
  }
}

export default new HttpService();
