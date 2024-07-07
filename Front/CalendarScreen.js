import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles_calendar';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalendarScreen = () => {
  const navigation = useNavigation();
  const today = moment().format('YYYY-MM-DD');
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    
    const fetchDietData = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Token not found');
    }

        const response = await axios.get('http://ec2-43-203-68-109.ap-northeast-2.compute.amazonaws.com:8000/diet/daily_meals/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          const newMarkedDates = {};

          data.forEach((item) => {
            const date = moment(item.date).format('YYYY-MM-DD');
            newMarkedDates[date] = {
              marked: true,
              dotColor: item.success_yn === 'Y' ? 'green' : 'red',
              customStyles: {
                container: {
                  backgroundColor: item.success_yn === 'Y' ? 'green' : 'red',
                },
                text: {
                  color: 'white',
                  fontWeight: 'bold',
                },
              },
            };
          });

          setMarkedDates(newMarkedDates);
        } else {
          Alert.alert('Error', '데이터를 불러오는 도중 문제가 발생했습니다.');
        }
      } catch (error) {
        // Alert.alert('Error', '서버와 통신하는 도중 오류가 발생했습니다.');
      }
    };

    fetchDietData();
  }, []);

  const handleDayPress = async (day) => {
    const date = day.dateString;
    if (moment(date).isAfter(today)) {
      return; // 오늘 이후 날짜는 터치해도 아무 동작하지 않음
    }

    try {
      const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Token not found');
    }

      const response = await axios.get('http://ec2-43-203-68-109.ap-northeast-2.compute.amazonaws.com:8000/diet/meals/by-date/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        params: {
          date: `${date}T00:00:00Z`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        if (data.length > 0) {
          navigation.navigate('FoodList', { date, data });
        } else {
          navigation.navigate('Cal', { date });
        }
      } else {
        Alert.alert('Error', '데이터를 불러오는 도중 문제가 발생했습니다.');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        navigation.navigate('Cal', { date });
      } else if (error.response && error.response.data && error.response.data.error) {
        Alert.alert('Error', error.response.data.error);
      } else {
        Alert.alert('Error', '서버와 통신하는 도중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>식단 기록</Text>
      <Calendar
        style={styles.calendar}
        onDayPress={handleDayPress}
        monthFormat={'yyyy MM'}
        hideArrows={false}
        hideExtraDays={false}
        disableMonthChange={false}
        firstDay={0}
        showWeekNumbers={false}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        enableSwipeMonths={true}
        markedDates={markedDates}
        dayComponent={({ date, state }) => (
          <TouchableOpacity
            onPress={() => handleDayPress(date)}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            disabled={moment(date.dateString).isAfter(today)} // 오늘 이후 날짜 비활성화
          >
            <Text style={{ textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black' }}>{date.day}</Text>
            {markedDates[date.dateString] && (
              <Image
                source={
                  markedDates[date.dateString].dotColor === 'green'
                    ? require('./assets/heart_cat.png')
                    : require('./assets/angry_cat.png')
                }
                style={{ width: 20, height: 20, marginTop: 5 }}
              />
            )}
          </TouchableOpacity>
        )}
        theme={{
          textSectionTitleColor: '#b6c1cd',
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'red',
          disabledArrowColor: '#d9e1e8',
          monthTextColor: 'black',
          indicatorColor: 'blue',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 18,
          textMonthFontSize: 24,
          textDayHeaderFontSize: 16,
          'stylesheet.calendar.main': {
            week: {
              marginTop: 6,
              marginBottom: 6,
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
            dayContainer: {
              width: 38,
              height: 38,
              alignItems: 'center',
              justifyContent: 'flex-end',
            },
            dayTextAtIndex0: {
              marginBottom: 10,
            },
            dayTextAtIndex1: {
              marginBottom: 10,
            },
            dayTextAtIndex2: {
              marginBottom: 10,
            },
            dayTextAtIndex3: {
              marginBottom: 10,
            },
            dayTextAtIndex4: {
              marginBottom: 10,
            },
            dayTextAtIndex5: {
              marginBottom: 10,
            },
            dayTextAtIndex6: {
              marginBottom: 10,
            },
          },
        }}
      />
      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('MainPage')}>
          <Image source={require('./assets/home.png')} style={styles.navButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Calendar')}>
          <Image source={require('./assets/calendar.png')} style={styles.navButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Insight')}>
          <Image source={require('./assets/insight.png')} style={styles.navButtonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('MyPage')}>
          <Image source={require('./assets/profile.png')} style={styles.navButtonImage} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;
