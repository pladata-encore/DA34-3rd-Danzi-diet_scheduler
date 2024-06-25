import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { SignupFormstyles } from './styles/SignupFormstyles'; 
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function SignupForm({ navigation }) {
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setName] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [gender, setGender] = useState(null);

  const handleSignup = () => {
    console.log('회원가입 정보:', { ID, password, confirmPassword, nickname, year, month, day, gender });
    navigation.navigate('Login');
  };

  return (
    <SafeAreaProvider>
      <View style={SignupFormstyles.container}>
        <View style={SignupFormstyles.formContainer}>
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
            <TouchableOpacity style={SignupFormstyles.checkButtonContainer}>
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
        </View>
      </View>
    </SafeAreaProvider>
  );
}