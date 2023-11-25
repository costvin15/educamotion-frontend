import axios from 'axios';
import paths from '@/client/paths';

const timeout = 3000;

const axiosInstance = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
    timeout,
  });
}

type AuthenticationResponse = {
  access_token: string;
  refresh_token: string;
};

export const get = async (url: string) => {
  await axiosInstance().get(url, {

  });
};

export const authenticate = async (credential: string) => {
  const { data } : { data : AuthenticationResponse } = await axiosInstance().post(paths.SOCIAL_AUTHENTICATION, {
    credential,
  });

  return data;
};