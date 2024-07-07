import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { MainPagestyles } from './styles/MainPagestyles'; 
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { mainInfo } from './Api';

export default function MainPage({ navigation }) {
  const [Dday, setDday] = useState('');               
  const [weight, setWeight] = useState('');           // 현재, 목표 체중은 값 불러오기 
  const [goal_weight, setGoalWeight] = useState('');
  
  const [kcal, setKcal] = useState('');               // 칼로리, 탄수화물, 단백질, 지방: user가 섭취한 값 
  const [carbo, setcarbo] = useState('');
  const [protein, setprotein] = useState('');
  const [prov, setprov] = useState('');

  const [daily_kcal, setDailyKcal] = useState('');      //칼로리, 탄수화물, 단백질, 지방: user 목표 기준값 
  const [daily_carbo, setDailyCarbo] = useState('');
  const [daily_protein, setDailyProtein] = useState('');
  const [daily_prov, setDailyProv] = useState('');

  useFocusEffect(
    useCallback(() => {
    const fetchMainInfo = async () => {
      try {
        const today = new Date().toISOString().split('T')[0]; // 오늘 날짜를 ISO 형식으로
        const data = await mainInfo(today);
        setWeight(data.weight);
        setGoalWeight(data.goal_weight);
        setKcal(data.kcal);
        setcarbo(data.carbo);
        setprotein(data.protein);
        setprov(data.prov);
        setDailyKcal(data.daily_kcal);
        setDailyCarbo(data.daily_carbo);
        setDailyProtein(data.daily_protein);
        setDailyProv(data.daily_prov);
        
        // D-day 계산
        const goalDate = new Date(data.goal_dt);
        const todayDate = new Date();

        if (isNaN(goalDate.getTime())) {
          console.log('Invalid goalDate:', data.goal_dt);
          setDday('Invalid date');
          return;
        }

        const diffTime = Math.abs(goalDate - todayDate);
        console.log('goalDate:', goalDate);
        console.log('todayDate:', todayDate);
        console.log('diffTime:', diffTime);

        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        setDday(diffDays);
        console.log('D-day:', diffDays);
        
      } catch (error) {
        console.error('Error fetching main info:', error);
        Alert.alert('오류', '데이터를 불러오는 중 오류가 발생했습니다.', [
          { text: '확인' }
        ]);
      }
    };

    fetchMainInfo();
  }, [])
);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={MainPagestyles.container}>
        <View style={MainPagestyles.header}>
          <Text style={MainPagestyles.dday}>D-{Dday}일</Text>
        </View>

        <View style={MainPagestyles.circle}>
          <Text style={MainPagestyles.goalweight}>{goal_weight}kg(목표)</Text>
          <Text style={MainPagestyles.nowweight}>{weight}kg(현재)</Text>
        </View>

        <View style={MainPagestyles.progressContainer}>
          <View style={MainPagestyles.progressBar}>
          <ScrollView>
            <Text style={MainPagestyles.progressLabel}>섭취 칼로리</Text>
            <View style={MainPagestyles.progressBarBackground}>
              <View style={{...MainPagestyles.progress, width: `${(kcal / daily_kcal) * 100}%`}} />
            </View>
            <Text style={MainPagestyles.progressValue}>{kcal}/{daily_kcal}kcal</Text>

            <Text style={MainPagestyles.progressLabel}>섭취 탄수화물</Text>
            <View style={MainPagestyles.progressBarBackground}>
              <View style={{...MainPagestyles.progress, width: `${(carbo / daily_carbo) * 100}%`}} />
            </View>
            <Text style={MainPagestyles.progressValue}>{carbo}/{daily_carbo}g</Text>

            <Text style={MainPagestyles.progressLabel}>섭취 단백질</Text>
            <View style={MainPagestyles.progressBarBackground}>
              <View style={{...MainPagestyles.progress, width: `${(protein / daily_protein) * 100}%`}} />
            </View>
            <Text style={MainPagestyles.progressValue}>{protein}/{daily_protein}g</Text>

            <Text style={MainPagestyles.progressLabel}>섭취 지방</Text>
            <View style={MainPagestyles.progressBarBackground}>
              <View style={{...MainPagestyles.progress, width: `${(prov / daily_prov) * 100}%`}} />
            </View>
            <Text style={MainPagestyles.progressValue}>{prov}/{daily_prov}g</Text>
            </ScrollView>
          </View>
        </View>

        <View style={MainPagestyles.navigation}>
        <TouchableOpacity style={MainPagestyles.navButton} onPress={() => navigation.navigate('MainPage')}>
          <Image source={require('./assets/home.png')} style={MainPagestyles.navButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={MainPagestyles.navButton} onPress={() => navigation.navigate('Calendar')}>
          <Image source={require('./assets/calendar.png')} style={MainPagestyles.navButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={MainPagestyles.navButton} onPress={() => navigation.navigate('Insight')}>
          <Image source={require('./assets/insight.png')} style={MainPagestyles.navButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={MainPagestyles.navButton} onPress={() => navigation.navigate('MyPage')}>
          <Image source={require('./assets/profile.png')} style={MainPagestyles.navButtonImage} />
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
