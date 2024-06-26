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
      </Stack.Navigator> 
    </NavigationContainer>
  );
}
