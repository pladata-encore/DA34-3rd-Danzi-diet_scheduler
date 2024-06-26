import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MyPagestyles } from './styles/Mypagestyles'; 
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyPage({ navigation }) {
  const [userInfo, setUserInfo] = useState({
    gender: '',
    birthdate: '',
    height: '',
    weight: '',
    targetWeight: '',
    dietStartDate: '',
    dietTargetDate: '',
    dailyCalories: '',
  });

  useEffect(() => {
    const fetchData = async() => {
      const data = {
        gender: 'Female',
        birthdate: '2001.12.01',
        height: '177cm',
        weight: '66kg',
        targetWeight: '55kg',
        dietStartDate: '2024.06.22',
        dietTargetDate: '2024.07.10',
        dailyCalories: '1200kcal',
      };
      setUserInfo(data);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    navigation.navigate('Login'); 
  };

  return (
    <SafeAreaView style={MyPagestyles.container}>
      <Text style={MyPagestyles.title}>마이페이지</Text>
      <View style={MyPagestyles.header}>
        <Text style={MyPagestyles.subtitle}>"다이어트하는 고양이"님의 회원정보</Text>
      </View>

      <View style={MyPagestyles.infoSection}>
        <View style={MyPagestyles.infoGrid}>
          <View style={MyPagestyles.infoBox}>
            <Text style={MyPagestyles.label}>성별</Text>
            <Text style={MyPagestyles.value}>{userInfo.gender}</Text>
          </View>
          <View style={MyPagestyles.infoBox}>
            <Text style={MyPagestyles.label}>생년월일</Text>
            <Text style={MyPagestyles.value}>{userInfo.birthdate}</Text>
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
            <Text style={MyPagestyles.value}>{userInfo.targetWeight}</Text>
            <Text style={MyPagestyles.label}>다이어트 시작일</Text>
            <Text style={MyPagestyles.value}>{userInfo.dietStartDate}</Text>
            <Text style={MyPagestyles.label}>다이어트 목표일</Text>
            <Text style={MyPagestyles.value}>{userInfo.dietTargetDate}</Text>
            <Text style={MyPagestyles.label}>하루 권장 섭취 칼로리</Text>
            <Text style={MyPagestyles.value}>{userInfo.dailyCalories}</Text>
          </View>
        </View>
      </View>

      <View style={MyPagestyles.header}>
        <Text style={MyPagestyles.subtitle}>앱설정</Text>
      </View>

      <View style={MyPagestyles.appSettings}>
        <TouchableOpacity style={MyPagestyles.button} onPress={handleLogout}>
          <Text style={MyPagestyles.buttonText}>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity style={MyPagestyles.button}>
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


      <View style={MyPagestyles.menuBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('./assets/home.png')} style={MyPagestyles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
          <Image source={require('./assets/calendar.png')} style={MyPagestyles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Insight')}>
          <Image source={require('./assets/insight.png')} style={MyPagestyles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
          <Image source={require('./assets/profile.png')} style={MyPagestyles.icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  
  );
}
