import axios from 'axios';
import { useAuth } from './AuthContext';

const useAxios = () => {
  const { authToken, userRole } = useAuth();  

  const instance = axios.create({
    baseURL: 'http://localhost:8080',
  });


  instance.interceptors.request.use(
    (config) => {
      if (authToken) {  
        config.headers['Authorization'] = `Bearer ${authToken}`;
      }
  
      if (userRole) {
        config.headers['X-User-Role'] = userRole;
      }
      
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

export default useAxios;
