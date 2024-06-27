  import React, { useState } from 'react';
  import { TextInput, View, Text, TouchableOpacity } from 'react-native';
  import { ModifyPagestyles } from './styles/ModifyPagestyles'; 
  import { SafeAreaView } from 'react-native-safe-area-context';
  import Slider from '@react-native-community/slider';

  export default function ModifyPage({ navigation }) {
    const [modheight, setmodheight] = useState('');
    const [modwidth, setmodwidth] = useState('');
    const [modtargetWidth, setmodtargetWidth] = useState('');
    const [modactivity, setmodactivity ] = useState('');
    const [modstartDate, setmodstartDate] = useState('');
    const [modendDate, setmodendDate] = useState('');
    const [modnextPage, setmodnextPage] = useState(1);  
  
    const handleDietInfo = () => {
      console.log('수정 신체정보 입력:', { modheight, modwidth, modtargetWidth, modactivity, modstartDate, modendDate });
    };

    const handleNextpage = () => {
      setmodnextPage(2);
    };

    const handlePreviousPage = () => {
      setmodnextPage(1);
    };

    const startDiet = () => {
      navigation.navigate('MyPage'); // MainPage로 이동
    };
    const getActivityDescription = () => {
      if (modactivity === 0) {
        return '0(매우적음): 운동/스포츠를 거의 또는 전혀 하지 않음';
      } else if (modactivity === 25) {
        return '25(적음): 가벼운 운동/스포츠(1~3일/주)';
      } else if (modactivity === 50) {
        return '50(보통): 중간 정도의 운동/스포츠(3~5일/주)';
      } else if (modactivity === 75) {
        return '75(많음): 격렬한 운동/스포츠(6~7일/주)';
      } else if (modactivity === 100) {
        return '100(매우많음): 매우 힘든 운동/스포츠 및 육체노동';
      }
      return '';
    };
    return (
      <SafeAreaView style={ModifyPagestyles.container}>
      <View style={ModifyPagestyles.formContainer}>
        {modnextPage === 1 ? (
          <>
            <Text style={ModifyPagestyles.title}>회원정보 수정</Text>
            <View style={ModifyPagestyles.inputContainer}>
              <Text style={ModifyPagestyles.label}>키</Text>
              <TextInput
                style={ModifyPagestyles.inputSignup}
                placeholder="키를 입력하세요.(ex: 179.5)"
                value={modheight}
                onChangeText={setmodheight}
                autoCapitalize="none"
              />
            </View>

            <View style={ModifyPagestyles.inputContainer}>
              <Text style={ModifyPagestyles.label}>현재 체중</Text>
              <TextInput
                style={ModifyPagestyles.inputSignup}
                placeholder="몸무게를 입력하세요.(ex: 77.7)"
                value={modwidth}
                onChangeText={setmodwidth}
                autoCapitalize="none"
              />
            </View>

            <View style={ModifyPagestyles.inputContainer}>
              <Text style={ModifyPagestyles.label}>목표 체중</Text>
              <TextInput
                style={ModifyPagestyles.inputSignup}
                placeholder="목표 몸무게를 입력하세요.(ex: 44.4)"
                value={modtargetWidth}
                onChangeText={setmodtargetWidth}
                autoCapitalize="none"
              />
            </View>

            <View style={ModifyPagestyles.inputContainer}>
              <Text style={ModifyPagestyles.label}>평소 활동량</Text>
              <View style={ModifyPagestyles.sliderContainer}>
                <View style={ModifyPagestyles.slidertextContainer}>
                  <Text style={ModifyPagestyles.slidertext}>{getActivityDescription()}</Text>
                </View>
                
                <Slider
                  style={ModifyPagestyles.slider}
                  value={modactivity}
                  onValueChange={setmodactivity}
                  minimumValue={0}
                  maximumValue={100}
                  maximumTrackTintColor="gray"
                  minimumTrackTintColor="#b103fc"
                  step={25}
                />
              </View>
            </View>

            <TouchableOpacity style={ModifyPagestyles.inputButton} onPress={handleNextpage}>
              <Text style={ModifyPagestyles.inputButtonText}>다음</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={ModifyPagestyles.inputButton} onPress={handlePreviousPage}>
              <Text style={ModifyPagestyles.inputButtonText}>이전</Text>
            </TouchableOpacity>

            <View style={ModifyPagestyles.inputContainer}>
              <Text style={ModifyPagestyles.label}>다이어트 시작일</Text>
              <TextInput
                style={ModifyPagestyles.inputSignup}
                placeholder="Start day"
                value={modstartDate}
                onChangeText={setmodstartDate}
                autoCapitalize="none"
              />
            </View>

            <View style={ModifyPagestyles.inputContainer}>
              <Text style={ModifyPagestyles.label}>다이어트 목표일</Text>
              <TextInput
                style={ModifyPagestyles.inputSignup}
                placeholder="D-day"
                value={modendDate}
                onChangeText={setmodendDate}
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity style={ModifyPagestyles.inputButton} onPress={startDiet}>
              <Text style={ModifyPagestyles.inputButtonText}>수정 완료</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}