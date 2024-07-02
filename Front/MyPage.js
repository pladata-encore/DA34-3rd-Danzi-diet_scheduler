import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MyPagestyles } from './styles/Mypagestyles'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { mydietinfo, logoutUser, userdelete } from './Api';

// 성별 변환 함수
const getGenderLabel = (gender) => {
  switch (gender) {
    case 'F':
      return 'Female';
    case 'M':
      return 'Male';
    default:
      return 'Unknown';
  }
};

// 생년월일 포맷팅 함수
const formatBirthdate = (birthdate) => {
  const date = new Date(birthdate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

// 시작일, 목표일 포맷팅 함수
const formatStartDate = (start_dt) => {
  const date = new Date(start_dt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

const formatGoalDate = (goal_dt) => {
  const date = new Date(goal_dt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

export default function MyPage({ navigation }) {
  const [userInfo, setUserInfo] = useState({
    user_nickname: '',
    user_gender: '',
    user_birth: '',
    height: '',
    weight: '',  //회원정보api 가져오는 정보
    goal_weight: '',
    start_dt: '',
    goal_dt: '',
    daily_kcal: '', //다이어트api 가져오는 정보 
  });


  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const data = await mydietinfo();
        setUserInfo(data);
      };
      fetchData();
    }, [])
  );


  // 로그아웃 버튼 누르면 로그인 화면으로 이동
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('오류', '로그아웃 중 오류가 발생했습니다.', [
        { text: '확인' }
      ]);
    }
  };

  // 회원탈퇴 버튼 누르면 확인 후 회원탈퇴 처리
  const handleDeleteAccount = async () => {
    Alert.alert(
      '회원탈퇴',
      '정말로 회원탈퇴 하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: async () => {
            try {
              await userdelete();
              navigation.navigate('Login');
            } catch (error) {
              Alert.alert('오류', '회원탈퇴 중 오류가 발생했습니다.', [
                { text: '확인' }
              ]);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={MyPagestyles.container}>
      <Text style={MyPagestyles.title}>마이페이지</Text>
      <View style={MyPagestyles.header}>
        <Text style={MyPagestyles.subtitle}>"{userInfo.user_nickname}"님의 회원정보</Text>
      </View>

      <View style={MyPagestyles.infoSection}>
        <View style={MyPagestyles.infoGrid}>
          <View style={MyPagestyles.infoBox}>
            <Text style={MyPagestyles.label}>성별</Text>
            <Text style={MyPagestyles.value}>{getGenderLabel(userInfo.user_gender)}</Text>
          </View>
          <View style={MyPagestyles.infoBox}>
            <Text style={MyPagestyles.label}>생년월일</Text>
            <Text style={MyPagestyles.value}>{formatBirthdate(userInfo.user_birth)}</Text>
          </View>
          <View style={MyPagestyles.infoBox}>
            <Text style={MyPagestyles.label}>키</Text>
            <Text style={MyPagestyles.value}>{userInfo.height}</Text>
          </View>
          <View style={MyPagestyles.infoBox}>
            <Text style={MyPagestyles.label}>몸무게</Text>
            <Text style={MyPagestyles.value}>{userInfo.weight}</Text>
          </View>
        </View>
      </View>

      <View style={MyPagestyles.header}>
        <Text style={MyPagestyles.subtitle}>다이어트 정보</Text>
      </View>

      <View style={MyPagestyles.infoSection}>
        <View style={MyPagestyles.infoGrid}>
          <View style={MyPagestyles.dietBox}>
            <Text style={MyPagestyles.label}>목표체중</Text>
            <Text style={MyPagestyles.value}>{userInfo.goal_weight}</Text>
            <Text></Text>
            <Text style={MyPagestyles.label}>다이어트 시작일</Text>
            <Text style={MyPagestyles.value}>{formatStartDate(userInfo.start_dt)}</Text>
            <Text></Text>
            <Text style={MyPagestyles.label}>다이어트 목표일</Text>
            <Text style={MyPagestyles.value}>{formatGoalDate(userInfo.goal_dt)}</Text>
            <Text></Text>
            <Text style={MyPagestyles.label}>하루 권장 섭취 칼로리</Text>
            <Text style={MyPagestyles.value}>{userInfo.daily_kcal}</Text>
          </View>
        </View>
      </View>

      <View style={MyPagestyles.appSettings}>
        <TouchableOpacity style={MyPagestyles.button} onPress={handleLogout}>
          <Text style={MyPagestyles.buttonText}>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity style={MyPagestyles.button} onPress={handleDeleteAccount}>
          <Text style={MyPagestyles.buttonText}>회원탈퇴</Text>
        </TouchableOpacity>
      </View>

      <View style={MyPagestyles.Mymodify}>
        <TouchableOpacity onPress={() => navigation.navigate('MyModify')}>
          <Image source={require('./assets/modify.png')} style={MyPagestyles.icon} />
        </TouchableOpacity>
      </View>

      <View style={MyPagestyles.dietmodify}>
        <TouchableOpacity onPress={() => navigation.navigate('Modify')}>
          <Image source={require('./assets/modify.png')} style={MyPagestyles.icon} />
        </TouchableOpacity>
      </View>


      <View style={MyPagestyles.navigation}>
        <TouchableOpacity style={MyPagestyles.navButton} onPress={() => navigation.navigate('MainPage')}>
          <Image source={require('./assets/home.png')} style={MyPagestyles.navButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={MyPagestyles.navButton} onPress={() => navigation.navigate('Calendar')}>
          <Image source={require('./assets/calendar.png')} style={MyPagestyles.navButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={MyPagestyles.navButton} onPress={() => navigation.navigate('Insight')}>
          <Image source={require('./assets/insight.png')} style={MyPagestyles.navButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={MyPagestyles.navButton} onPress={() => navigation.navigate('MyPage')}>
          <Image source={require('./assets/profile.png')} style={MyPagestyles.navButtonImage} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  
  );
}