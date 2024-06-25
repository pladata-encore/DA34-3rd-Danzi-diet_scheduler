import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import styles from './styles_modify';  // 스타일 파일 가져오기
import CalendarStrip from 'react-native-calendar-strip';

const { width } = Dimensions.get('screen');

const FoodListModify = ({ route }) => {
  const { foodName, calories, carbohydrates, protein, fat, selectedFoodName } = route.params;
  const [caloriesInput, setCaloriesInput] = useState(calories);
  const [carbohydratesInput, setCarbohydratesInput] = useState(carbohydrates);
  const [proteinInput, setProteinInput] = useState(protein);
  const [fatInput, setFatInput] = useState(fat);
  const navigation = useNavigation();

  const handleSavePress = () => {
    // Save the modified values
    console.log("Modified values saved:", caloriesInput, carbohydratesInput, proteinInput, fatInput);
    navigation.goBack();
  };

  const handleCancelPress = () => {
    navigation.goBack();
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

      <View style={styles.foodNameBox}>
        <Text style={styles.foodName}>{selectedFoodName}</Text>
      </View>

      <View style={styles.foodDetailsContainer}>
        <View style={styles.foodDetails}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>칼로리</Text>
            <TextInput
              style={styles.input}
              value={caloriesInput.toString()}
              onChangeText={setCaloriesInput}
              keyboardType="numeric"
            />
            <Text style={styles.unitText}>kcal</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>탄수화물</Text>
            <TextInput
              style={styles.input}
              value={carbohydratesInput.toString()}
              onChangeText={setCarbohydratesInput}
              keyboardType="numeric"
            />
            <Text style={styles.unitText}>g</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>단백질</Text>
            <TextInput
              style={styles.input}
              value={proteinInput.toString()}
              onChangeText={setProteinInput}
              keyboardType="numeric"
            />
            <Text style={styles.unitText}>g</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>지방</Text>
            <TextInput
              style={styles.input}
              value={fatInput.toString()}
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
    </SafeAreaView>
  );
};

export default FoodListModify;
