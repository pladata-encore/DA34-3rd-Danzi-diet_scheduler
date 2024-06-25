import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import styles from './styles_text';

const Add_Text = () => {
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [weight, setWeight] = useState('');
  const [carbohydrates, setCarbohydrates] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.navigate('FoodList', {
      foodName,
      calories,
      weight,
      carbohydrates,
      protein,
      fat,
    });
  };

  const goHome = () => {
    navigation.navigate('Home'); // Assuming there's a 'Home' screen
  };

  const viewCalendar = () => {
    navigation.navigate('Calendar'); // Navigate to CalendarScreen
  };

  const viewStats = () => {
    navigation.navigate('Stats'); // Assuming there's a 'Stats' screen
  };

  const viewProfile = () => {
    navigation.navigate('Profile'); // Assuming there's a 'Profile' screen
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
              <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
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