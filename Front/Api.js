import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Django 서버 주소
const config = require('./config');
const BASE_URL = config.BASE_URL
console.log('URL:', BASE_URL);

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
});

// 요청 인터셉터 설정
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 사용자 등록
export const registerUser = async (userData) => {
    try {
      const response = await apiClient.post('/user/member/', userData);
      return response.data;
    } catch (error) {
      handleError(error);
    }
};

// ID 중복 체크
export const checkUserID = async (userId) => {
    try {
      const response = await apiClient.get(`/user/member/${userId}/`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
};

// 로그인 
export const loginUser = async (loginData) => {
    try {
      const response = await apiClient.post('/user/login/', loginData);
      // 로그인 성공 시 토큰을 AsyncStorage에 저장
      await AsyncStorage.setItem('accessToken', response.data.access);
      return response.data;
    } catch (error) {
      handleError(error);
    }
};

// 로그아웃
export const logoutUser = async () => {
    try {
      const response = await apiClient.post('/user/logout/');
      // 로그아웃 시 토큰 삭제
      await AsyncStorage.removeItem('accessToken');
      return response.data;
    } catch (error) {
      handleError(error);
    }
};

// 에러 핸들링 함수
const handleError = (error) => {
    if (error.response) {
        throw error.response.data;
    } else {
        throw error;
    }
};
