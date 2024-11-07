import axios, * as others from 'axios';
import { useAuth } from './AuthContext';

const useAxios = () => {
  const { authToken } = useAuth();  

  const instance = axios.create({
    baseURL: 'http://localhost:8080',
  });

  
  instance.interceptors.request.use(
    (config) => {
      if (authToken) {  
        config.headers['Authorization'] = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

export default useAxios;
