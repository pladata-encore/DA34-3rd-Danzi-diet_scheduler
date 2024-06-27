import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { MyModifyPagestyles } from './styles/MyModifyPagestyles'; 
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function MyModify({ navigation }) {
    const [modID, setmodID] = useState('');
    const [modpassword, setmodpassword] = useState('');
    const [modconfirmPassword, setmodconfirmPassword] = useState('');
    const [modnickname, setmodnickname] = useState('');
    const [modyear, setmodyear] = useState('');
    const [modmonth, setmodmonth] = useState('');
    const [modday, setmodday] = useState('');
    const [modgender, setmodgender] = useState(null);
  
    const handleSignup = () => {
      console.log('회원가입 정보:', { modID, modpassword, modconfirmPassword, modnickname, modyear, modmonth, modday, modgender });
      navigation.navigate('Login');
    };
    // 비활성화 영역 style 
    const disabledInputStyle = {
      backgroundColor: '#b6b8ba',
      color: '#e3e1e1',
  };
    const startDiet = () => {
      navigation.navigate('MyPage'); // MainPage로 이동
};

    return (
      <SafeAreaProvider>
        <SafeAreaView style={MyModifyPagestyles.container}>
          <View style={MyModifyPagestyles.formContainer}>
            <Text style={MyModifyPagestyles.title}>회원정보 수정</Text>
            <View style={MyModifyPagestyles.inputContainer}>
              <Text style={MyModifyPagestyles.label}>ID</Text>
              <TextInput
                style={[MyModifyPagestyles.inputSignup, disabledInputStyle]}
                placeholder="아이디 입력 (6-20자)"
                value={modID}
                onChangeText={setmodID}
                autoCapitalize="none"
                editable={false}
              />
            </View>
  
            <View style={MyModifyPagestyles.inputContainer}>
              <Text style={MyModifyPagestyles.label}>비밀번호</Text>
              <TextInput
                style={[MyModifyPagestyles.inputSignup]}
                placeholder="비밀번호 입력 (8-20자)"
                value={modpassword}
                onChangeText={setmodpassword}
                secureTextEntry={true}
              />
            </View>
  
            <View style={MyModifyPagestyles.inputContainer}>
              <Text style={MyModifyPagestyles.label}>비밀번호 재입력</Text>
              <TextInput
                style={MyModifyPagestyles.inputSignup}
                placeholder="비밀번호 재입력"
                value={modconfirmPassword}
                onChangeText={setmodconfirmPassword}
                secureTextEntry={true}
              />
            </View>
  
            <View style={MyModifyPagestyles.inputContainer}>
              <Text style={MyModifyPagestyles.label}>별명</Text>
              <TextInput
                style={MyModifyPagestyles.inputSignup}
                placeholder="별명을 입력해주세요"
                value={modnickname}
                onChangeText={setmodnickname}
              />
            </View>
  
            <View style={MyModifyPagestyles.birthContainer}>
              <Text style={MyModifyPagestyles.label}>생년월일</Text>
              <View style={MyModifyPagestyles.birthInputContainer}>
                <TextInput
                  style={[MyModifyPagestyles.inputBirth, disabledInputStyle]}
                  placeholder="년도"
                  value={modyear}
                  onChangeText={setmodyear}
                  keyboardType="numeric"
                  editable={false}
                />
                <TextInput
                  style={[MyModifyPagestyles.inputBirth, disabledInputStyle]}
                  placeholder="월"
                  value={modmonth}
                  onChangeText={setmodmonth}
                  keyboardType="numeric"
                  editable={false}
                />
                <TextInput
                  style={[MyModifyPagestyles.inputBirth, disabledInputStyle]}
                  placeholder="일"
                  value={modday}
                  onChangeText={setmodday}
                  keyboardType="numeric"
                  editable={false}
                />
              </View>
            </View>
  
            <View style={MyModifyPagestyles.genderContainer}>
              <Text style={MyModifyPagestyles.label}>성별</Text>
              <View style={MyModifyPagestyles.genderInputContainer}>
                <TouchableOpacity
                  style={[
                    MyModifyPagestyles.genderButton,
                    modgender === 'Female' && MyModifyPagestyles.selectedGenderButton,
                    {opacity: 0.5}
                  ]}
                  onPress={() => setmodgender('Female')}
                  disabled={true}
                >
                  <Text style={MyModifyPagestyles.genderText}>Female</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    MyModifyPagestyles.genderButton,
                    modgender === 'Male' && MyModifyPagestyles.selectedGenderButton,
                    {opacity: 0.5}
                  ]}
                  onPress={() => setmodgender('Male')}
                  disabled={true}
                >
                  <Text style={MyModifyPagestyles.genderText}>Male</Text>
                </TouchableOpacity>
              </View>
            </View>
  
            <TouchableOpacity style={MyModifyPagestyles.ButtonContainer} onPress={startDiet}>
                <View style={MyModifyPagestyles.signupButton}>
                  <Text style={MyModifyPagestyles.signupButtonText}> 정보 수정 완료 </Text>
                </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }