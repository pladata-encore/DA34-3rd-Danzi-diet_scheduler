import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { FoodContext } from './FoodContext'; // 생성한 FoodContext 임포트
import styles from './styles_text';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add_Text = () => {
  const { addFoodItem } = useContext(FoodContext);
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [weight, setWeight] = useState('');
  const [carbohydrates, setCarbohydrates] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused(); // 현재 화면이 포커스되었는지 확인

  const date = route.params?.date || new Date().toISOString().split('T')[0]; // 기본값 설정

  useEffect(() => {
    if (isFocused) {
      // 화면이 포커스될 때 상태 초기화 또는 경로에서 받은 값으로 설정
      setFoodName(route.params?.foodName ? route.params.foodName.toString() : '');
      setCalories(route.params?.calories ? route.params.calories.toString() : '');
      setWeight(route.params?.weight ? route.params.weight.toString() : '');
      setCarbohydrates(route.params?.carbohydrates ? route.params.carbohydrates.toString() : '');
      setProtein(route.params?.protein ? route.params.protein.toString() : '');
      setFat(route.params?.fat ? route.params.fat.toString() : '');
    }
  }, [isFocused, route.params]);

  const handleSubmit = async () => {
    const foodItem = { date, foodName, calories, weight, carbohydrates, protein, fat };
    addFoodItem(date, foodItem); // 날짜와 함께 컨텍스트에 음식 정보 추가

    // API 요청 보내기
    try {
      const body = {
        name: foodName,
        quantity: parseInt(weight),
        kcal: parseInt(calories),
        carbo: parseInt(carbohydrates),
        protein: parseInt(protein),
        prov: parseInt(fat),
        date: new Date(date).toISOString(),
      };

      const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Token not found');
    }

      const response = await fetch('http://ec2-43-203-68-109.ap-northeast-2.compute.amazonaws.com:8000/diet/meals/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // 여기에 토큰을 직접 입력해 주세요
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('응답 오류:', response.status, errorText);
        throw new Error(`네트워크 응답이 올바르지 않습니다. 상태 코드: ${response.status}, 오류 메시지: ${errorText}`);
      }

      const data = await response.json();
      Alert.alert('성공', '다이어트 기록이 성공적으로 추가되었습니다.');
      navigation.navigate('FoodList', { date, diet_seq: data.diet_seq }); // FoodList 화면으로 이동
    } catch (error) {
      console.error('오류 발생:', error);
      Alert.alert('오류', '다이어트 기록을 추가하는 도중 오류가 발생했습니다.');
    }
  };

  const goHome = () => {
    navigation.navigate('Home'); // Assuming there's a 'Home' screen
  };

  const viewCalendar = () => {
    navigation.navigate('Calendar'); // Navigate to CalendarScreen
  };

  const viewStats = () => {
    navigation.navigate('Insight'); // Assuming there's a 'Stats' screen
  };

  const viewProfile = () => {
    navigation.navigate('Profile'); // Assuming there's a 'Profile' screen
  };

  const isFormValid = () => {
    return foodName && calories && weight && carbohydrates && protein && fat;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>식단 기록</Text>
            {['음식명', '칼로리', '무게', '탄수화물', '단백질', '지방'].map((label, index) => {
              const stateSetters = [setFoodName, setCalories, setWeight, setCarbohydrates, setProtein, setFat];
              const stateValues = [foodName, calories, weight, carbohydrates, protein, fat];
              const placeholders = ['음식명을 입력하세요', '칼로리를 입력하세요', '무게를 입력하세요', '탄수화물을 입력하세요', '단백질을 입력하세요', '지방을 입력하세요'];
              const units = ['', 'kcal', 'g', 'g', 'g', 'g'];
              const keyboards = ['default', 'numeric', 'numeric', 'numeric', 'numeric', 'numeric'];

              return (
                <View key={index} style={styles.inputContainer}>
                  <Text style={styles.label}>{label}</Text>
                  <View style={styles.inputBox}>
                    <TextInput
                      style={styles.input}
                      placeholder={placeholders[index]}
                      value={stateValues[index]}
                      onChangeText={stateSetters[index]}
                      keyboardType={keyboards[index]}
                    />
                    {units[index] && <Text style={styles.unitText}>{units[index]}</Text>}
                  </View>
                </View>
              );
            })}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: isFormValid() ? '#00adf5' : '#d3d3d3' }]} //모든 값들이 다 들어가 있어야 완료 버튼 눌러짐
                onPress={handleSubmit}
                disabled={!isFormValid()}
              >
                <Text style={styles.saveButtonText}>완료</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navButton} onPress={goHome}>
          <Image source={require('./assets/home.png')} style={styles.navButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={viewCalendar}>
          <Image source={require('./assets/calendar.png')} style={styles.navButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={viewStats}>
          <Image source={require('./assets/insight.png')} style={styles.navButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={viewProfile}>
          <Image source={require('./assets/profile.png')} style={styles.navButtonImage} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Add_Text;
