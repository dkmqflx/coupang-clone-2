import axios, { AxiosPromise } from 'axios';
import cookies from 'js-cookie';

export interface httpImpl {
  get(url: string): AxiosPromise;
  post(url: string): AxiosPromise;
  delete(url: string): AxiosPromise;
  patch(url: string, data: number): AxiosPromise;
}

class HttpService implements httpImpl {
  private request;
  private accessToken = cookies.get('accessToken');

  constructor() {
    this.request = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_HOST,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': `application/json`,
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

  delete(url: string) {
    return this.request({
      method: 'delete',
      url,
    });
  }

  patch(url: string, data: number) {
    return this.request({
      method: 'patch',
      url,
      data: {
        quantity: data,
      },
    });
  }
}

export default new HttpService();
