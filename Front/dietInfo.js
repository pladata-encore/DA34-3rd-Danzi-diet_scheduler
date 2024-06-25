import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { DietInfostyles } from './styles/dietInfostyles';
import Slider from '@react-native-community/slider';

export default function DietInfo({ navigation }) {
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [targetWidth, setTargetWidth] = useState('');
    const [activity, setActivity ] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [nextPage, setnextPage] = useState(1);  //한 코드에서 2개의 페이지 구현하기 위해 
  
    const handleDietInfo = () => {
      console.log('신체정보 입력:', { height, width, targetWidth, activity, startDate, endDate });
    };

    const handleNextpage = () => {
      setnextPage(2);
    };

    const handlePreviousPage = () => {
      setnextPage(1);
    };

    const startDiet = () => {
        navigation.navigate('MainPage'); // MainPage로 이동
    };
    
    //평소 활동량 slider 선택했을 때 아래 문구 생성 
    const getActivityDescription = () => {
      if (activity === 0) {
        return '0(매우적음): 운동/스포츠를 거의 또는 전혀 하지 않음';
      } else if (activity === 25) {
        return '25(적음): 가벼운 운동/스포츠(1~3일/주)';
      } else if (activity === 50) {
        return '50(보통): 중간 정도의 운동/스포츠(3~5일/주)';
      } else if (activity === 75) {
        return '75(많음): 격렬한 운동/스포츠(6~7일/주)';
      } else if (activity === 100) {
        return '100(매우많음): 매우 힘든 운동/스포츠 및 육체노동';
      }
      return '';
    };

    return (
      <View style={DietInfostyles.container}>
          <View style={DietInfostyles.formContainer}>
              {nextPage === 1 ? (
                  <>
                      <Text style={DietInfostyles.title}>Start with On:ly</Text>
                      <View style={DietInfostyles.inputContainer}>
                          <Text style={DietInfostyles.label}>키</Text>
                          <TextInput
                              style={DietInfostyles.inputSignup}
                              placeholder="키를 입력하세요.(ex: 179.5)"
                              value={height}
                              onChangeText={setHeight}
                              autoCapitalize="none"
                          />
                      </View>

                      <View style={DietInfostyles.inputContainer}>
                          <Text style={DietInfostyles.label}>현재 체중</Text>
                          <TextInput
                              style={DietInfostyles.inputSignup}
                              placeholder="몸무게를 입력하세요.(ex: 77.7)"
                              value={width}
                              onChangeText={setWidth}
                              autoCapitalize="none"
                          />
                      </View>

                      <View style={DietInfostyles.inputContainer}>
                          <Text style={DietInfostyles.label}>목표 체중</Text>
                          <TextInput
                              style={DietInfostyles.inputSignup}
                              placeholder="목표 몸무게를 입력하세요.(ex: 44.4)"
                              value={targetWidth}
                              onChangeText={setTargetWidth}
                              autoCapitalize="none"
                          />
                      </View>

                      <View style={DietInfostyles.inputContainer}>
                          <Text style={DietInfostyles.label}>평소 활동량</Text>
                          <View style={DietInfostyles.sliderContainer}>
                              <View style={DietInfostyles.slidertextContainer}>
                                  <Text style={DietInfostyles.slidertext}>{getActivityDescription()}</Text>
                              </View>
                              <Slider
                                  style={DietInfostyles.slider}
                                  value={activity}
                                  onValueChange={setActivity}
                                  minimumValue={0}
                                  maximumValue={100}
                                  maximumTrackTintColor="gray"
                                  minimumTrackTintColor="#b103fc"
                                  step={25}
                              />
                          </View>
                      </View>

                      <TouchableOpacity style={DietInfostyles.inputButton} onPress={handleNextpage}>
                          <Text style={DietInfostyles.inputButtonText}>다음</Text>
                      </TouchableOpacity>
                  </>
              ) : (
                  <>
                      <TouchableOpacity style={DietInfostyles.inputButton} onPress={handlePreviousPage}>
                          <Text style={DietInfostyles.inputButtonText}>이전</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={DietInfostyles.inputButton}>
                          <Text style={DietInfostyles.inputButtonText}>다이어트 추천 기간 나오게 하기</Text>
                      </TouchableOpacity>

                      <View style={DietInfostyles.inputContainer}>
                          <Text style={DietInfostyles.label}>다이어트 시작일</Text>
                          <TextInput
                              style={DietInfostyles.inputSignup}
                              placeholder="Start day"
                              value={startDate}
                              onChangeText={setStartDate}
                              autoCapitalize="none"
                          />
                      </View>

                      <View style={DietInfostyles.inputContainer}>
                          <Text style={DietInfostyles.label}>다이어트 목표일</Text>
                          <TextInput
                              style={DietInfostyles.inputSignup}
                              placeholder="D-day"
                              value={endDate}
                              onChangeText={setEndDate}
                              autoCapitalize="none"
                          />
                      </View>

                      <TouchableOpacity style={DietInfostyles.inputButton} onPress={startDiet}>
                          <Text style={DietInfostyles.inputButtonText}>다이어트 시작!</Text>
                      </TouchableOpacity>
                  </>
              )}
          </View>
      </View>
  );
}