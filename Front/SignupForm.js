import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SignupFormstyles } from './styles/SignupFormstyles'; 
import { registerUser, checkUserID } from './Api';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage'; //storage에 user정보 저장 (MyModify에 데이터 불러와야해서)

export default function SignupForm({ navigation }) {
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setName] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [gender, setGender] = useState(null);
  const [isIDAvailable, setisIDAvailable] = useState(null);

  //생년월일(year,month,day) => type 변경 
  const combineDate = (year, month, day) => {
    const formattedMonth = month.padStart(2, '0');
    const formattedDay = day.padStart(2, '0');
    return `${year}-${formattedMonth}-${formattedDay} 00:00:00`;
  
  };

  const handleSignup = async () => {
    if (isIDAvailable === false) {
      Alert.alert('회원가입 실패', '아이디가 이미 사용 중입니다.', [
        { text: '확인' }
      ]);
      return;
    }

    const birthdate = combineDate(year, month, day);
    const userData = {
      user_id: ID,
      password: password,
      password_check: confirmPassword,
      user_nickname: nickname,
      user_birth: birthdate,
      user_gender: convertGender(gender),
    };  
 
    try {
      const response = await registerUser(userData);
      console.log(response);

      // 사용자 정보를 AsyncStorage에 저장
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
      
      Alert.alert('회원가입 성공', '회원가입이 성공적으로 완료되었습니다.', [
        { text: '확인', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('회원가입 실패', '회원가입 중 오류가 발생했습니다.', [
        { text: '확인' }
      ]);
    }
  };
 
  const handleCheckID = async () => {
    try {
      const response = await checkUserID(ID);
      if (response.exists) {
        setisIDAvailable(false);
        Alert.alert('아이디 중복', '아이디가 이미 사용 중입니다.', [
          { text: '확인' }
        ]);
      } else {
        setisIDAvailable(true);
        Alert.alert('아이디 사용 가능', '사용 가능한 아이디입니다.', [
          { text: '확인' }
        ]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '아이디 중복 체크 중 오류가 발생했습니다.', [
        { text: '확인' }
      ]);
    }
  };

  const convertGender = (gender) => { 
    if (gender === 'Female') { return 'F'; } 
    else if (gender === 'Male') { return 'M'; } 
    else { return gender; }
  };


  return (
    <SafeAreaProvider>
      <SafeAreaView style={SignupFormstyles.container}>
        <View style={SignupFormstyles.formContainer}>
        <ScrollView>
          <Text style={SignupFormstyles.title}>회원가입</Text>
          <Text style={SignupFormstyles.subtitle}>On:ly 회원이 되어 다양한 혜택을 경험해 보세요!</Text>

          <View style={SignupFormstyles.inputContainer}>
            <Text style={SignupFormstyles.label}>ID</Text>
            <TextInput
              style={SignupFormstyles.inputSignup}
              placeholder="아이디 입력 (6-20자)"
              value={ID}
              onChangeText={setID}
              autoCapitalize="none"
            />
            <TouchableOpacity style={SignupFormstyles.checkButtonContainer} onPress={handleCheckID}>
              <View style={SignupFormstyles.checkButton}>
                <Text style={SignupFormstyles.checkButtonText}>중복 확인</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={SignupFormstyles.inputContainer}>
            <Text style={SignupFormstyles.label}>비밀번호</Text>
            <TextInput
              style={SignupFormstyles.inputSignup}
              placeholder="비밀번호 입력 (8-20자)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>

          <View style={SignupFormstyles.inputContainer}>
            <Text style={SignupFormstyles.label}>비밀번호 재입력</Text>
            <TextInput
              style={SignupFormstyles.inputSignup}
              placeholder="비밀번호 재입력"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
            />
          </View>

          <View style={SignupFormstyles.inputContainer}>
            <Text style={SignupFormstyles.label}>별명</Text>
            <TextInput
              style={SignupFormstyles.inputSignup}
              placeholder="별명을 입력해주세요"
              value={nickname}
              onChangeText={setName}
            />
          </View>

          <View style={SignupFormstyles.birthContainer}>
            <Text style={SignupFormstyles.label}>생년월일</Text>
            <View style={SignupFormstyles.birthInputContainer}>
              <TextInput
                style={SignupFormstyles.inputBirth}
                placeholder="년도"
                value={year}
                onChangeText={setYear}
                keyboardType="numeric"
              />
              <TextInput
                style={SignupFormstyles.inputBirth}
                placeholder="월"
                value={month}
                onChangeText={setMonth}
                keyboardType="numeric"
              />
              <TextInput
                style={SignupFormstyles.inputBirth}
                placeholder="일"
                value={day}
                onChangeText={setDay}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={SignupFormstyles.genderContainer}>
            <Text style={SignupFormstyles.label}>성별</Text>
            <View style={SignupFormstyles.genderInputContainer}>
              <TouchableOpacity
                style={[
                  SignupFormstyles.genderButton,
                  gender === 'Female' && SignupFormstyles.selectedGenderButton
                ]}
                onPress={() => setGender('Female')}
              >
                <Text style={SignupFormstyles.genderText}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  SignupFormstyles.genderButton,
                  gender === 'Male' && SignupFormstyles.selectedGenderButton
                ]}
                onPress={() => setGender('Male')}
              >
                <Text style={SignupFormstyles.genderText}>Male</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={SignupFormstyles.ButtonContainer} onPress={handleSignup}>
              <View style={SignupFormstyles.signupButton}>
                <Text style={SignupFormstyles.signupButtonText}> 회원 가입 완료 </Text>
                
              </View>
          </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
  }