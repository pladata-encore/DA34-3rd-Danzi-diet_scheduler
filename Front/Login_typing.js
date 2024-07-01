import React, { useState } from 'react';
import { TextInput, Text, TouchableOpacity, Alert  } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Loginstyles } from './styles/Login_typing_styles'; // styles.js에서 스타일 import
import { loginUser } from './Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login_typing({ navigation }) {
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const loginData = {
        user_id: ID,
        password: password,
      };
      
      const response = await loginUser(loginData);
      
      if (response && response.access) {
        await AsyncStorage.setItem('accessToken', response.access);  
        console.log('height:', response.height);

        // height 값이 0 또는 null인 경우 DietInfo로, 그렇지 않은 경우 MainPage로 이동
        if (response.height === 0 || response.height === null) {
          navigation.navigate('DietInfo');
        } else {
          navigation.navigate('MainPage');
        }
        // Alert.alert('로그인 성공', '로그인이 성공적으로 완료되었습니다.');
      } else {
        Alert.alert('로그인 실패', '아이디 또는 비밀번호가 잘못되었습니다.', [
          { text: '확인' }
        ]);
      } 
    } catch (error) {
      console.error(error);
      Alert.alert('로그인 실패', '로그인 중 오류가 발생했습니다.', [
        { text: '확인' }
      ]);
    }
  };

  const onShowSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={Loginstyles.container}>
        <Text style={Loginstyles.title}>On:ly</Text>
        <TextInput
          style={Loginstyles.input}
          placeholder="ID"
          value={ID}
          onChangeText={setID}
          autoCapitalize="none"
        />
        
        <TextInput
          style={Loginstyles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity style={Loginstyles.inputButton} onPress={handleLogin}>
          <Text style={Loginstyles.inputButtonText}>로그인</Text>
        </TouchableOpacity>
        <Text style={Loginstyles.additionalText}>On:ly가 처음이신가요? </Text>
        <TouchableOpacity style={Loginstyles.inputButton} onPress={onShowSignup}>
          <Text style={Loginstyles.inputButtonText}>회원가입</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
