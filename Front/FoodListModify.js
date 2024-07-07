import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import styles from './styles_modify';  // 스타일 파일 가져오기
import CalendarStrip from 'react-native-calendar-strip';
import { FoodContext } from './FoodContext'; // FoodContext 임포트
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('screen');

const FoodListModify = ({ route }) => {
  const { date, foodName, calories = 0, carbohydrates = 0, protein = 0, fat = 0, dietSeq } = route.params; // dietSeq 추가
  const { setFoodItems } = useContext(FoodContext);
  const [caloriesInput, setCaloriesInput] = useState(calories.toString());
  const [carbohydratesInput, setCarbohydratesInput] = useState(carbohydrates.toString());
  const [proteinInput, setProteinInput] = useState(protein.toString());
  const [fatInput, setFatInput] = useState(fat.toString());
  const navigation = useNavigation();

  const handleSavePress = async () => {
    try {
      const body = {
        name: foodName,
        kcal: parseInt(caloriesInput),
        carbo: parseInt(carbohydratesInput),
        protein: parseInt(proteinInput),
        prov: parseInt(fatInput),
        date: new Date(date).toISOString(),
      };

      const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Token not found');
    }

      const response = await fetch(`http://ec2-43-203-68-109.ap-northeast-2.compute.amazonaws.com:8000/diet/meals/${dietSeq}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('응답 오류:', response.status, errorText);
        throw new Error(`네트워크 응답이 올바르지 않습니다. 상태 코드: ${response.status}, 오류 메시지: ${errorText}`);
      }

      // const data = await response.json();
      Alert.alert('성공', '다이어트 기록이 성공적으로 업데이트되었습니다.');

    

      // 업데이트된 데이터를 다시 불러옴
      const updatedResponse = await fetch(`http://ec2-43-203-68-109.ap-northeast-2.compute.amazonaws.com:8000/diet/meals/by-date/?date=${date}T00:00:00Z`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (updatedResponse.ok) {
        const updatedData = await updatedResponse.json();
        setFoodItems(prevItems => ({ ...prevItems, [date]: updatedData }));
        navigation.navigate('FoodList', { date });
      } else {
        Alert.alert('오류', '업데이트된 데이터를 불러오는 도중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('오류 발생:', error);
      Alert.alert('오류', '다이어트 기록을 업데이트하는 도중 오류가 발생했습니다.');
    }
  };

  const handleCancelPress = () => {
    navigation.goBack();
  };

  const goHome = () => {
    navigation.navigate('MainPage'); // Assuming there's a 'Home' screen
  };

  const viewCalendar = () => {
    navigation.navigate('Calendar'); // Navigate to CalendarScreen
  };

  const viewStats = () => {
    navigation.navigate('Insight'); // Assuming there's a 'Stats' screen
  };

  const viewProfile = () => {
    navigation.navigate('MyPage'); // Assuming there's a 'Profile' screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <CalendarStrip
          style={styles.calendar}
          calendarColor={'#ffffff'}
          calendarHeaderStyle={{ color: '#000000' }}
          dateNumberStyle={{ color: '#000000' }}
          dateNameStyle={{ color: '#000000' }}
          highlightDateNumberStyle={{ color: '#ff6347' }}
          highlightDateNameStyle={{ color: '#ff6347' }}
          disabledDateNameStyle={{ color: 'grey' }}
          disabledDateNumberStyle={{ color: 'grey' }}
        />
        <Image source={require('./assets/default_food.png')} style={styles.foodImage} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.foodNameBox}>
            <Text style={styles.foodName}>{foodName}</Text>
          </View>

          <View style={styles.foodDetailsContainer}>
            <View style={styles.foodDetails}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>칼로리</Text>
                <TextInput
                  style={styles.input}
                  value={caloriesInput}
                  onChangeText={setCaloriesInput}
                  keyboardType="numeric"
                />
                <Text style={styles.unitText}>kcal</Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>탄수화물</Text>
                <TextInput
                  style={styles.input}
                  value={carbohydratesInput}
                  onChangeText={setCarbohydratesInput}
                  keyboardType="numeric"
                />
                <Text style={styles.unitText}>g</Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>단백질</Text>
                <TextInput
                  style={styles.input}
                  value={proteinInput}
                  onChangeText={setProteinInput}
                  keyboardType="numeric"
                />
                <Text style={styles.unitText}>g</Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>지방</Text>
                <TextInput
                  style={styles.input}
                  value={fatInput}
                  onChangeText={setFatInput}
                  keyboardType="numeric"
                />
                <Text style={styles.unitText}>g</Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
              <Text style={styles.saveButtonText}>완료</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelPress}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.navigation}>
          {/* Navigation buttons */}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FoodListModify;
