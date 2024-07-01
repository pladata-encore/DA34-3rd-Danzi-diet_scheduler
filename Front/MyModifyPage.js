import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, TouchableOpacity, Alert } from 'react-native';
import { MyModifyPagestyles } from './styles/MyModifyPagestyles'; 
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { mydietinfo, updateUser } from './Api'; // 기존 정보 불러오기 및 업데이트 함수 임포트

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', options);
};

export default function MyModify({ navigation }) {
    const [modID, setmodID] = useState('');
    const [current_password, setcurrent_password] = useState('');
    const [current_password_check, setcurrent_password_check] = useState('');
    const [new_nickname, setnew_nickname] = useState('');
    const [birth, setBirth] = useState(''); // 생년월일을 문자열로 저장
    const [gender, setGender] = useState(null);

    useEffect(() => {
        // 사용자 정보를 불러오는 함수 호출
        const fetchUserInfo = async () => {
            try {
                const userInfo = await mydietinfo();
                setmodID(userInfo.user_id);
                setnew_nickname(userInfo.user_nickname);
                setBirth(formatDate(userInfo.user_birth));
                setGender(userInfo.user_gender); // 여기서는 서버에서 받은 gender 값을 그대로 사용
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleUpdate = async () => {
        if (current_password !== current_password_check) {
            Alert.alert('오류', '비밀번호가 일치하지 않습니다.', [
                { text: '확인' }
            ]);
            return;
        }

        const userData = {
            current_password: current_password,
            current_password_check: current_password_check,
            new_nickname: new_nickname,
        };

        console.log('회원정보 수정 데이터:', userData); // 데이터 확인용 로그

        try {
            const response = await updateUser(userData);
            console.log('서버 응답:', response); // 서버 응답 로그
            Alert.alert('수정 성공', '회원정보가 성공적으로 수정되었습니다.', [
                { text: '확인', onPress: () => navigation.navigate('MyPage') }
            ]);
        } catch (error) {
            console.error('업데이트 중 오류 발생:', error);
            Alert.alert('수정 실패', '회원정보 수정 중 오류가 발생했습니다.', [
                { text: '확인' }
            ]);
        }
    };

    // 비활성화 영역 style 
    const disabledInputStyle = {
        backgroundColor: '#b6b8ba',
        color: '#e3e1e1',
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
                            style={MyModifyPagestyles.inputSignup}
                            placeholder="기존 비밀번호 입력하세요 (8-20자)"
                            value={current_password}
                            onChangeText={setcurrent_password}
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={MyModifyPagestyles.inputContainer}>
                        <Text style={MyModifyPagestyles.label}>비밀번호 재입력</Text>
                        <TextInput
                            style={MyModifyPagestyles.inputSignup}
                            placeholder="기존 비밀번호 재입력하세요"
                            value={current_password_check}
                            onChangeText={setcurrent_password_check}
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={MyModifyPagestyles.inputContainer}>
                        <Text style={MyModifyPagestyles.label}>별명</Text>
                        <TextInput
                            style={MyModifyPagestyles.inputSignup}
                            placeholder="새로운 별명을 입력해주세요"
                            value={new_nickname}
                            onChangeText={setnew_nickname}
                        />
                    </View>

                    <View style={MyModifyPagestyles.birthContainer}>
                        <Text style={MyModifyPagestyles.label}>생년월일</Text>
                        <View style={MyModifyPagestyles.birthInputContainer}>
                            <TextInput
                                style={[MyModifyPagestyles.inputBirth, disabledInputStyle]}
                                placeholder="생년월일"
                                value={birth}
                                onChangeText={setBirth}
                                keyboardType="default"
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
                                    gender === 'F' && MyModifyPagestyles.selectedGenderButton,
                                    { opacity: 0.5 }
                                ]}
                                onPress={() => setGender('F')}
                                disabled={true}
                            >
                                <Text style={MyModifyPagestyles.genderText}>Female</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    MyModifyPagestyles.genderButton,
                                    gender === 'M' && MyModifyPagestyles.selectedGenderButton,
                                    { opacity: 0.5 }
                                ]}
                                onPress={() => setGender('M')}
                                disabled={true}
                            >
                                <Text style={MyModifyPagestyles.genderText}>Male</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={MyModifyPagestyles.ButtonContainer} onPress={handleUpdate}>
                        <View style={MyModifyPagestyles.signupButton}>
                            <Text style={MyModifyPagestyles.signupButtonText}> 정보 수정 완료 </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
