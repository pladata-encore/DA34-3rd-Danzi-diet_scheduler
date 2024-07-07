import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LoadingScreen from './loading'; 
import Login_typing from './Login_typing'; 
import SignupForm from './SignupForm'; 
import DietInfo from './dietInfo';
import MainPage from './MainPage'; 
import MyPage from './MyPage'; 
import Modify from './ModifyPage';
import MyModify from './MyModifyPage';
import Insight from './Insight';
import CalendarScreen from './CalendarScreen'
import { FoodProvider } from './FoodContext'; // FoodProvider 임포트
import Cal from './Cal';
import Add_Text from './Add_Text';
import FoodList from './FoodList';
import FoodListModify from './FoodListModify';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000); // 5초 후에 로딩 화면을 종료
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <FoodProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Signup" component={SignupForm} />
          <Stack.Screen name="Login" component={Login_typing} />
          <Stack.Screen name="DietInfo" component={DietInfo} />
          <Stack.Screen name="MainPage" component={MainPage} />
          <Stack.Screen name="MyPage" component={MyPage} /> 
          <Stack.Screen name="Modify" component={Modify} /> 
          <Stack.Screen name="MyModify" component={MyModify} /> 
          <Stack.Screen name="Insight" component={Insight} /> 
          <Stack.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Cal"
                component={Cal}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddText"
                component={Add_Text}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="FoodList"
                component={FoodList}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="FoodListModify"
                component={FoodListModify}
                options={{ headerShown: false }}
              />
        </Stack.Navigator> 
      </NavigationContainer>
    </FoodProvider>
  );
}
