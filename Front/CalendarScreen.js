import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles_calendar';
import { useNavigation } from '@react-navigation/native';

const CalendarScreen = () => {
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(false);

  const handleDayPress = (day) => {
    console.log('selected day', day);
    navigation.navigate('Cal', { date: day.dateString });
  };

  const viewCalendar = () => {
    // Trigger re-render by toggling the refresh state
    setRefresh(!refresh);
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

function goHome() {
  alert('홈으로 이동');
}

function viewStats() {
  alert('통계 보기');
}

function viewProfile() {
  alert('프로필 보기');
}

export default CalendarScreen;
