import axios from 'axios';

class HttpService {
  private request;

  constructor() {
    this.request = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_HOST,
    });
  }

  get(url: string, accessToken?: string) {
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  post(url: string, data: any | null, accessToken?: string) {
    return this.request.post(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}

export default HttpService;
