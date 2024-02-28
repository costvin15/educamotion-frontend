import axios from 'axios';

import { getSession } from 'next-auth/react';

type Session = {
  accessToken: string;
}

axios.interceptors.request.use(async config => {
    config.baseURL = process.env.NEXT_PUBLIC_API_BASEURL;
    const data = await getSession();

    if (data && data.user.token) {
      config.headers.Authorization = `Bearer ${data.user.token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

export default axios;
