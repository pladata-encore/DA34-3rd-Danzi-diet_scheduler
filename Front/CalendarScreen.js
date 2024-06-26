import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles_calendar';
import { useNavigation } from '@react-navigation/native';
import { FoodContext } from './FoodContext';
import moment from 'moment';

const CalendarScreen = () => {
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(false);
  const { foodItems } = useContext(FoodContext);
  const [markedDates, setMarkedDates] = useState({});
  const today = moment().format('YYYY-MM-DD');

  useEffect(() => {
    const newMarkedDates = {};
    Object.keys(foodItems).forEach(date => {
      newMarkedDates[date] = {
        marked: true,
        customStyles: {
          container: {
            backgroundColor: 'transparent'
          },
          text: {
            color: 'transparent'
          }
        }
      };
    });
    setMarkedDates(newMarkedDates);
  }, [foodItems]);

  const handleDayPress = (day) => {
    const date = day.dateString;
    if (moment(date).isAfter(today)) {
      return; // 오늘 이후 날짜는 터치해도 아무 동작하지 않음
    }
    if (foodItems[date] && foodItems[date].length > 0) {
      navigation.navigate('FoodList', { date });
    } else {
      navigation.navigate('Cal', { date });
    }
  };

  const renderCustomMarking = (date) => {
    const hasData = foodItems[date];
    if (moment(date).isSameOrBefore(today)) {
      return (
        <Image
          source={hasData ? require('./assets/heart_cat.png') : require('./assets/angry_cat.png')}
          style={{ width: 20, height: 20, alignSelf: 'center', marginTop: 5 }}
        />
      );
    }
    return null;
  };

  const viewCalendar = () => {
    setRefresh(!refresh);
  };

  const goHome = () => {
    navigation.navigate('Home');
  };

  const viewStats = () => {
    navigation.navigate('Stats');
  };

  const viewProfile = () => {
    navigation.navigate('Profile');
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
        markingType={'custom'}
        markedDates={markedDates}
        dayComponent={({ date, state, marking }) => (
          <TouchableOpacity
            onPress={() => handleDayPress(date)}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            disabled={moment(date.dateString).isAfter(today)} // 오늘 이후 날짜 비활성화
          >
            <Text style={{ textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black' }}>{date.day}</Text>
            {renderCustomMarking(date.dateString)}
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

export default CalendarScreen;