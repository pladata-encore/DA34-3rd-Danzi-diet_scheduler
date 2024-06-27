import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MainPagestyles } from './styles/MainPagestyles'; 
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function MainPage({ navigation }) {
  const [Dday, setDday] = useState('40');
  const [Successday, setSuccessday] = useState('33');
  const [Goalweight, setGoalweight] = useState('55');
  const [Nowweight, setNowweight] = useState('66');
  const [kcal, setkcal] = useState('1500');
  const [tan, settan] = useState('20');
  const [dan, setdan] = useState('20');
  const [gi, setgi] = useState('20');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={MainPagestyles.container}>
        <View style={MainPagestyles.header}>
          <Text style={MainPagestyles.dday}>D-{Dday}</Text>
          <Text style={MainPagestyles.successday}>D-{Successday} (예상 성공일)</Text>
        </View>

        <View style={MainPagestyles.circle}>
          <Text style={MainPagestyles.goalweight}>{Goalweight}kg(목표)</Text>
          <Text style={MainPagestyles.nowweight}>{Nowweight}kg(현재)</Text>
        </View>

        <View style={MainPagestyles.progressContainer}>
          <View style={MainPagestyles.progressBar}>
            <Text style={MainPagestyles.progressLabel}>섭취 칼로리</Text>
            <View style={MainPagestyles.progressBarBackground}>
              <View style={{...MainPagestyles.progress, width: `${(kcal / 2500) * 100}%`}} />
            </View>
            <Text style={MainPagestyles.progressValue}>{kcal}/2500kcal</Text>

            <Text style={MainPagestyles.progressLabel}>섭취 탄수화물</Text>
            <View style={MainPagestyles.progressBarBackground}>
              <View style={{...MainPagestyles.progress, width: `${(tan / 56) * 100}%`}} />
            </View>
            <Text style={MainPagestyles.progressValue}>{tan}/56g</Text>

            <Text style={MainPagestyles.progressLabel}>섭취 단백질</Text>
            <View style={MainPagestyles.progressBarBackground}>
              <View style={{...MainPagestyles.progress, width: `${(dan / 56) * 100}%`}} />
            </View>
            <Text style={MainPagestyles.progressValue}>{dan}/56g</Text>

            <Text style={MainPagestyles.progressLabel}>섭취 지방</Text>
            <View style={MainPagestyles.progressBarBackground}>
              <View style={{...MainPagestyles.progress, width: `${(gi / 56) * 100}%`}} />
            </View>
            <Text style={MainPagestyles.progressValue}>{gi}/56g</Text>
          </View>
        </View>

        <View style={MainPagestyles.menuBar}>
          <TouchableOpacity onPress={() => navigation.navigate('MainPage')}>
            <Image source={require('./assets/home.png')} style={MainPagestyles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
            <Image source={require('./assets/calendar.png')} style={MainPagestyles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Insight')}>
            <Image source={require('./assets/insight.png')} style={MainPagestyles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
            <Image source={require('./assets/profile.png')} style={MainPagestyles.icon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
