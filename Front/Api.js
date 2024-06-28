import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DietInfo from './dietInfo';

// Django 서버 주소
const config = require('./config');
const BASE_URL = config.BASE_URL
console.log('URL:', BASE_URL);  // app 실행하면 url 기록 

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
});

// 요청 인터셉터 설정(token 가지고 다니는 설정)
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
    console.log('Login response:', response.data);  // 응답 데이터 로그 출력
    const { access, height } = response.data; 
    if (access) {
      await AsyncStorage.setItem('accessToken', access);
    }
    return { access, height };
  } catch (error) {
    handleError(error);
  }
};

// 로그아웃
export const logoutUser = async () => {
    try {
      const response = await apiClient.post('/user/logout/');
      await AsyncStorage.removeItem('accessToken');  // 로그아웃 시 토큰 삭제
      return response.data;
    } catch (error) {
      handleError(error);
    }
};

// 다이어트 정보 전송 + 다이어트 기간 추천 
export const submitDietInfo = async (dietData) => {
  try {
    const response = await apiClient.put('/user/diet_info/', dietData);
    const { recommended_period } = response.data;
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

//Mypage 회원 + 다이어트 정보 api 불러오기
export const mydietinfo = async () => {
  try {
    const memberResponse = await apiClient.get('/user/member/');
    console.log('MemberResponse:', memberResponse.data);

    const dietResponse = await apiClient.get('/user/diet_info/');
    console.log('DietResponse:', dietResponse.data);
 
    const userInfo = {
      user_nickname: memberResponse.data.user_nickname,
      user_gender: memberResponse.data.user_gender,
      user_birth: memberResponse.data.user_birth,
      height: memberResponse.data.height,
      weight: memberResponse.data.weight,  //회원정보api 가져오는 정보
      goal_weight: dietResponse.data.goal_weight,
      start_dt: dietResponse.data.start_dt,
      goal_dt: dietResponse.data.goal_dt,
      daily_kcal: dietResponse.data.daily_kcal, //다이어트api 가져오는 정보
    };

    return userInfo;
  } catch (error) {
    handleError(error);
  }
};


// 에러 핸들링 함수
const handleError = (error) => {
    console.error('API Error:', error);
    if (error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
};
