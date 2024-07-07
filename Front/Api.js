import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// 응답 인터셉터 설정 (토큰 만료 처리)
apiClient.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await AsyncStorage.removeItem('accessToken');  // 토큰 삭제
      return Promise.reject(new Error('토큰이 만료되었습니다. 다시 로그인해주세요.'));
    }
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

//회원탈퇴
export const userdelete = async () => {
    try {
      const response = await apiClient.delete('/user/delete/');
      await AsyncStorage.removeItem('accessToken');
      return response.data;
    } catch (error) {
      handleError(error);
    }
};

//mainpage (user정보+현재까지 먹은 칼로리 정보)
export const mainInfo = async (date) => {
  try {
    token = await AsyncStorage.getItem('accessToken')

    const userInfoResponse = await apiClient.get('/user/diet_info/');
    console.log('UserInfoResponse:', userInfoResponse.data);
    // console.log('token:', token);  
    
    console.log('Request Date:', date);
    const mealInfoResponse = await apiClient.get('/diet/daily_meals/by-date/', { params: { date }}); 
    console.log('MealInfoResponse:', mealInfoResponse.data);
    // console.log('token:', token);  
    
    let kcal = 0;
    let carbo = 0;
    let protein = 0;
    let prov = 0;

    if (!mealInfoResponse.data.error) {
      kcal = mealInfoResponse.data.kcal || 0;
      carbo = mealInfoResponse.data.carbo || 0;
      protein = mealInfoResponse.data.protein || 0;
      prov = mealInfoResponse.data.prov || 0;
    }

    const mainuserInfo = {
      goal_dt: userInfoResponse.data.goal_dt,
      weight: userInfoResponse.data.weight,
      goal_weight: userInfoResponse.data.goal_weight,
      kcal,
      carbo,
      protein,
      prov,
      daily_kcal: userInfoResponse.data.daily_kcal,
      daily_carbo: userInfoResponse.data.daily_carbo,
      daily_protein: userInfoResponse.data.daily_protein,
      daily_prov: userInfoResponse.data.daily_prov,
    };

    

    return mainuserInfo;
  } catch (error) {
    if (error.response && error.response.data.error === "No daily_diets found for the specified date") {
      const userInfoResponse = await apiClient.get('/user/diet_info/');
      return {
        goal_dt: userInfoResponse.data.goal_dt,
        weight: userInfoResponse.data.weight,
        goal_weight: userInfoResponse.data.goal_weight,
        kcal: 0,
        carbo: 0,
        protein: 0,
        prov: 0,
        daily_kcal: userInfoResponse.data.daily_kcal,
        daily_carbo: userInfoResponse.data.daily_carbo,
        daily_protein: userInfoResponse.data.daily_protein,
        daily_prov: userInfoResponse.data.daily_prov,
      };
    } else {
      handleError(error);
    }
  }
};

// 사용자 정보 수정(MyModifyPage 수정하면 서버 업로드)
export const updateUser = async (userData) => {
  try {
    const response = await apiClient.put('/user/member/', userData);
    console.log('new_user:', userData)
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

//Mypage 회원 + 다이어트 정보 api 불러오기 + Modify 2page 수정 
export const mydietinfo = async () => {
  try {
    const memberResponse = await apiClient.get('/user/member/');
    console.log('MemberResponse:', memberResponse.data);

    const dietResponse = await apiClient.get('/user/diet_info/');
    console.log('DietResponse:', dietResponse.data);
 
    const userInfo = {
      user_id: memberResponse.data.user_id,
      user_nickname: memberResponse.data.user_nickname,
      user_gender: memberResponse.data.user_gender,
      user_birth: memberResponse.data.user_birth,
      height: memberResponse.data.height,
      weight: memberResponse.data.weight,  
      activity: memberResponse.data.activity,  //회원정보api 가져오는 정보
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

//Insight-pie chart
export const insightpie = async () => {
  try {
    const totalResponse = await apiClient.get('/user/diet_info/');
    console.log('total_kcal:', totalResponse.data.total_kcal);
    const kcalsumResponse = await apiClient.get('/diet/progress/');
    console.log('kcal_difference_sum:', kcalsumResponse.data.kcal_difference_sum);

    const kcalInfo = {
      total_kcal: totalResponse.data.total_kcal,
      kcal_difference_sum: kcalsumResponse.data.kcal_difference_sum,
    };

    return kcalInfo;
  } catch (error) {
    handleError(error)
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