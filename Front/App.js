import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from './CalendarScreen';
import Cal from './Cal';
import Add_Text from './Add_Text';
import FoodList from './FoodList';
import FoodListModify from './FoodListModify';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Calendar">
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
          {/* Add any additional screens here */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;