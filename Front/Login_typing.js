import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Loginstyles } from './styles/Login_typing_styles'; // styles.js에서 스타일 import

export default function Login_typing({ navigation }) {
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('ID:', ID);
    console.log('Password:', password);
    navigation.navigate('DietInfo');
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
