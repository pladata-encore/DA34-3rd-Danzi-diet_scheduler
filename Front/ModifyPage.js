  import React, { useState, useEffect } from 'react';
  import { TextInput, View, Text, TouchableOpacity, Alert } from 'react-native';
  import { ModifyPagestyles } from './styles/ModifyPagestyles'; 
  import { SafeAreaView } from 'react-native-safe-area-context';
  import Slider from '@react-native-community/slider';
  import { mydietinfo, updateUser, submitDietInfo  } from './Api'; // 기존 정보 불러오기 및 업데이트 함수 임포트

  export default function ModifyPage({ navigation }) {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [goal_weight, setgoal_weight] = useState('');
    const [activity_level_seq, setactivity_level_seq] = useState(0);
    const [start_dt, setstart_dt] = useState('');
    const [goal_dt, setgoal_dt] = useState('');
    const [recommendedPeriod, setRecommendedPeriod] = useState('');
    const [nextPage, setNextPage] = useState(1); 

    // 시작일, 종료일 type: datetime 변경 -> 서버 전송 
    const combineDate = (date) => {
      const [year, month, day] = date.split('-');
      const formattedMonth = month.padStart(2, '0');
      const formattedDay = day.padStart(2, '0');
      return `${year}-${formattedMonth}-${formattedDay} 00:00:00`;
    };

    //user가 보는 viewer에서 yyyy-mm-dd 형식으로 보게 하기 
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더합니다.
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
  };

    // date type 유효성 검사 
    const validateDate = (date) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(date);
    };

    // activity 서버에 보낼 때 1~5로 변환하기 
    const convertActivity = (activity_level_seq) => {
      if (activity_level_seq === 0) { return 1; }
      else if (activity_level_seq === 25) { return 2; }
      else if (activity_level_seq === 50) { return 3; }
      else if (activity_level_seq === 75) { return 4; }
      else { return 5; }
    };

    useEffect(() => {
      // 사용자 정보를 불러오는 함수 호출
      const fetchUserInfo = async () => {
          try {
              const userInfo = await mydietinfo();
              setHeight(userInfo.height.toString());
              setWeight(userInfo.weight.toString());
              setgoal_weight(userInfo.goal_weight.toString());  //기존 값 문자열로 반환해서 가져오기 
              setstart_dt(formatDate(userInfo.start_dt));
              setgoal_dt(formatDate(userInfo.goal_dt));
          } catch (error) {
              console.error('Error fetching user info:', error);
          }
      };

      fetchUserInfo();
  }, []);


    const handleNextPage = async () => {
        try {
            const dietData = {
                height,
                weight,
                goal_weight,
                activity_level_seq: convertActivity(activity_level_seq),
            };
            const response = await submitDietInfo(dietData);
            setRecommendedPeriod(response.recommended_period);
            setNextPage(2);
        } catch (error) {
            Alert.alert('오류', '다이어트 정보를 전송하는 중 오류가 발생했습니다.', [
                { text: '확인' }
            ]);
        }
    };

    const handlePreviousPage = () => {
      setNextPage(1);
    };

    const startDiet = async () => {
      if (!validateDate(start_dt) || !validateDate(goal_dt)) {
          Alert.alert('잘못된 날짜 형식', '날짜는 YYYY-MM-DD 형식으로 입력해야 합니다.', [
              { text: '확인' }
          ]);
          return;
      }
      try {
          const formattedStartDate = combineDate(start_dt);
          const formattedEndDate = combineDate(goal_dt);
          const dietData = { 
              height, 
              weight,
              goal_weight,
              activity_level_seq: convertActivity(activity_level_seq),
              start_dt: formattedStartDate,
              goal_dt: formattedEndDate
          };
          const response = await submitDietInfo(dietData);
          console.log('Diet period data:', response);
          navigation.navigate('MyPage');
      } catch (error) {
          Alert.alert('오류', '다이어트 정보를 전송하는 중 오류가 발생했습니다.', [
              { text: '확인' }
          ]);
      }
  };


  const getActivityDescription = () => {
    if (activity_level_seq === 0) {
        return '0(매우적음): 운동/스포츠를 거의 또는 전혀 하지 않음';
    } else if (activity_level_seq === 25) {
        return '25(적음): 가벼운 운동/스포츠(1~3일/주)';
    } else if (activity_level_seq === 50) {
        return '50(보통): 중간 정도의 운동/스포츠(3~5일/주)';
    } else if (activity_level_seq === 75) {
        return '75(많음): 격렬한 운동/스포츠(6~7일/주)';
    } else if (activity_level_seq === 100) {
        return '100(매우많음): 매우 힘든 운동/스포츠 및 육체노동';
    }
    return '';
};


    return (
      <SafeAreaView style={ModifyPagestyles.container}>
      <View style={ModifyPagestyles.formContainer}>
        {nextPage === 1 ? (
          <>
            <Text style={ModifyPagestyles.title}>회원정보 수정</Text>
            <View style={ModifyPagestyles.inputContainer}>
              <Text style={ModifyPagestyles.label}>키</Text>
              <TextInput
                style={ModifyPagestyles.inputSignup}
                placeholder="키를 입력하세요.(ex: 179.5)"
                value={height}
                onChangeText={setHeight}
                autoCapitalize="none"
              />
            </View>

            <View style={ModifyPagestyles.inputContainer}>
              <Text style={ModifyPagestyles.label}>현재 체중</Text>
              <TextInput
                style={ModifyPagestyles.inputSignup}
                placeholder="몸무게를 입력하세요.(ex: 77.7)"
                value={weight}
                onChangeText={setWeight}
                autoCapitalize="none"
              />
            </View>

            <View style={ModifyPagestyles.inputContainer}>
              <Text style={ModifyPagestyles.label}>목표 체중</Text>
              <TextInput
                style={ModifyPagestyles.inputSignup}
                placeholder="목표 몸무게를 입력하세요.(ex: 44.4)"
                value={goal_weight}
                onChangeText={setgoal_weight}
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
                  value={activity_level_seq}
                  onValueChange={setactivity_level_seq}
                  minimumValue={0}
                  maximumValue={100}
                  maximumTrackTintColor="gray"
                  minimumTrackTintColor="#b103fc"
                  step={25}
                />
              </View>
            </View>

            <TouchableOpacity style={ModifyPagestyles.inputButton} onPress={handleNextPage}>
              <Text style={ModifyPagestyles.inputButtonText}>다음</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={ModifyPagestyles.inputButton} onPress={handlePreviousPage}>
              <Text style={ModifyPagestyles.inputButtonText}>이전</Text>
            </TouchableOpacity>

            <View style={ModifyPagestyles.recommendationContainer}>
              <Text style={ModifyPagestyles.recommendationText}>추천 다이어트 기간: {recommendedPeriod}</Text>
            </View>

            <View style={ModifyPagestyles.inputContainer}>
              <Text style={ModifyPagestyles.label}>다이어트 시작일</Text>
              <TextInput
                style={ModifyPagestyles.inputSignup}
                placeholder="시작일(ex: 2024-06-29)"
                value={start_dt}
                onChangeText={setstart_dt}
                autoCapitalize="none"
              />
            </View>

            <View style={ModifyPagestyles.inputContainer}>
              <Text style={ModifyPagestyles.label}>다이어트 목표일</Text>
              <TextInput
                style={ModifyPagestyles.inputSignup}
                placeholder="목표일(ex: 2024-07-10)"
                value={goal_dt}
                onChangeText={setgoal_dt}
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