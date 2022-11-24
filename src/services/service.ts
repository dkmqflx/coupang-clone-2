import HttpService from './http.service';

class Service extends HttpService {
  get(url: string, accessToken?: string) {
    return super.get(url, accessToken);
  }

  post(url: string, data: any | null, accessToken: string) {
    return super.post(url, data, accessToken);
  }

  patch(url: string, data: any | null, accessToken: string) {
    return super.patch(url, data, accessToken);
  }

  delete(url: string, accessToken: string) {
    return super.delete(url, accessToken);
  }
}

export default Service;
