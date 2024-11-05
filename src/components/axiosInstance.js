// axiosInstance.js
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const useAxios = () => {
  const { auth } = useContext(AuthContext);

  const instance = axios.create({
    baseURL: 'http://localhost:8080',
  });

  instance.interceptors.request.use(
    (config) => {
      if (auth && auth.token) {
        config.headers['Authorization'] = `Basic ${auth.token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

export default useAxios;
