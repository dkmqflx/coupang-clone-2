import axios from 'axios';

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_HOST });

export const http = ({ ...options }) => {
  return instance(options);
};
